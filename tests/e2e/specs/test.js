// https://docs.cypress.io/api/introduction/api.html

describe('CRUD tests', () => {
  beforeEach(() => {
    cy.task('resetDB');
  });
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[data-test=title]').contains('Airline List');
    // There should be 5 airlines
    cy.get('[data-test=list-row]').should('have.length', 5);
    // Switch to grid
    cy.get('[data-test=grid-view]').click();
    // There should still be 5 airlines
    cy.get('[data-test=airline-card]').should('have.length', 5);
  });

  it('Filters by iata/name and services', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=filter-bags]').click();
    cy.get('[data-test=list-row]').should('have.length', 2);
    cy.get('[data-test=filter-bags]').click();
    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=filter-checkin]').click();
    cy.get('[data-test=list-row]').should('have.length', 3);
    cy.get('[data-test=filter-seats]').click();
    cy.get('[data-test=list-row]').should('have.length', 2);

    cy.get('[data-test=filter-seats]').click();
    cy.get('[data-test=filter-checkin]').click();
    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=filter-input]').type('air');
    cy.get('[data-test=list-row]').should('have.length', 3);
    cy.get('[data-test=filter-checkin]').click();
    cy.get('[data-test=list-row]').should('have.length', 2);
    cy.get('[data-test=filter-seats]').click();
    cy.get('[data-test=list-row]').should('have.length', 1);
    cy.get('[data-test=filter-bags]').click();
    cy.get('[data-test=list-row]').should('have.length', 0);
  });

  it('Creates an airline', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[data-test=list-row]').should('have.length', 5);
    cy.get('[data-test=new-airline-button]').click();
    cy.get('[data-test=form-iata-input]').type('KA');
    cy.get('[data-test=form-name-input]').type('Dragonair');
    cy.get('[data-test=form-bags-checkbox]').click();
    cy.get('[data-test=form-seats-checkbox]').click();
    cy.get('[data-test=button-create]').click();

    cy.get('[data-test=list-row]').should('have.length', 6);
    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-iata]')
      .contains('KA');
    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-name]')
      .contains('Dragonair');

    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-service-bags]')
      .should('not.have.attr', 'disabled');

    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-service-checkin]')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-service-seats]')
      .should('not.have.attr', 'disabled');

    cy.get('[data-test=alert]').contains('A new Airline has been created');
  });

  it('Fails to create an airline because iata and name matches another airline', () => {
    cy.visit('http://localhost:8080/');
    cy.get('[data-test=list-row]').should('have.length', 5);
    cy.get('[data-test=new-airline-button]').click();
    cy.get('[data-test=form-iata-input]').type('AA');
    cy.get('[data-test=form-name-input]').type('american airlines');

    cy.get('[data-test=button-create]').click();

    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=alert]').contains('Error creating the airline. Check that no other airline with same iata/name combination exists');
  });

  it('Updates an airline', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=list-row-name]')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('[data-test=form-bags-checkbox]').click();
    cy.get('[data-test=form-checkin-checkbox]').click();
    cy.get('[data-test=form-seats-checkbox]').click();

    cy.get('[data-test=button-create]').click();

    cy.get('[data-test=list-row]').should('have.length', 5);
    cy.get('[data-test=list-row-iata]').contains('VY');
    cy.get('[data-test=list-row-name]').contains('Vueling');

    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-service-bags]')
      .should('not.have.attr', 'disabled');

    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-service-checkin]')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('[data-test=list-row]')
      .last()
      .find('[data-test=list-row-service-seats]')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('[data-test=alert]').contains('An Airline has been updated');
  });

  it('Updates an airline name', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=list-row-name]')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('[data-test=form-name-input]').type(' 2');

    cy.get('[data-test=button-create]').click();

    cy.get('[data-test=list-row]').should('have.length', 5);
    cy.get('[data-test=list-row-iata]').contains('VY');
    cy.get('[data-test=list-row-name]').contains('Vueling 2');

    cy.get('[data-test=alert]').contains('An Airline has been updated');
  });

  it('Fails to updates an airline iata/name because already exists', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=list-row-name]')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('[data-test=form-iata-input]')
      .clear()
      .type('AA');
    cy.get('[data-test=form-name-input]')
      .clear()
      .type('American Airlines');

    cy.get('[data-test=button-create]').click();

    cy.get('[data-test=list-row]').should('have.length', 5);
    cy.get('[data-test=list-row-iata]').contains('VY');
    cy.get('[data-test=list-row-name]').contains('Vueling');

    cy.get('[data-test=alert]').contains('Error updating the airline. Check that no other airline with same iata/name combination exists');
  });

  it('Deletes an airline', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-test=list-row]').should('have.length', 5);

    cy.get('[data-test=list-row-name]')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('[data-test=button-delete]').click();

    cy.get('[data-test=list-row]').should('have.length', 4);

    cy.get('[data-test=alert]').contains('An Airline has been removed');
  });
});
