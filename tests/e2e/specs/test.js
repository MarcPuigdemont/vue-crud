// https://docs.cypress.io/api/introduction/api.html

describe('CRUD tests', () => {
  beforeEach(() => {
    cy.task('resetDB');
  });
  it('Visits the app root url', () => {
    cy.visit('http://localhost:8080/');
    cy.contains('h1', 'Airline List');
    // There should be 5 airlines
    cy.get('.list-group-item > .row').should('have.length', 5);
    // Switch to grid
    cy.contains('.display_button', 'view_module').click();
    // There should still be 5 airlines
    cy.get('.airline-card').should('have.length', 5);
  });

  it('Filters by iata/name and services', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.d-flex i')
      .contains('work')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 2);
    cy.get('.d-flex i')
      .contains('work')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.d-flex i')
      .contains('where_to_vote')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 3);
    cy.get('.d-flex i')
      .contains('airline_seat_recline_normal')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 2);

    cy.get('.d-flex i')
      .contains('airline_seat_recline_normal')
      .click();
    cy.get('.d-flex i')
      .contains('where_to_vote')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.filter-form-search').type('air');
    cy.get('.list-group-item > .row').should('have.length', 3);
    cy.get('.d-flex i')
      .contains('where_to_vote')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 2);
    cy.get('.d-flex i')
      .contains('airline_seat_recline_normal')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 1);
    cy.get('.d-flex i')
      .contains('work')
      .click();
    cy.get('.list-group-item > .row').should('have.length', 0);
  });

  it('Creates an airline', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.list-group-item > .row').should('have.length', 5);
    cy.get('.add_button').click();
    cy.get('#input-1').type('KA');
    cy.get('#input-2').type('Dragonair');
    cy.get('#checkboxes-1 i')
      .contains('work')
      .click();
    cy.get('#checkboxes-1 i')
      .contains('airline_seat_recline_normal')
      .click();
    cy.get('button')
      .contains('Create')
      .click();

    cy.get('.list-group-item > .row').should('have.length', 6);
    cy.get('.list-group-item > .row .col').contains('KA');
    cy.get('.list-group-item > .row .col').contains('Dragonair');

    cy.get('.list-group-item')
      .contains('Dragonair')
      .parent()
      .contains('work')
      .should('not.have.attr', 'disabled');

    cy.get('.list-group-item')
      .contains('Dragonair')
      .parent()
      .contains('where_to_vote')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('.list-group-item')
      .contains('Dragonair')
      .parent()
      .contains('airline_seat_recline_normal')
      .should('not.have.attr', 'disabled');

    cy.get('.alert').contains('A new Airline has been created');
  });

  it('Fails to create an airline because iata and name matches another airline', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.list-group-item > .row').should('have.length', 5);
    cy.get('.add_button').click();
    cy.get('#input-1').type('AA');
    cy.get('#input-2').type('american airlines');

    cy.get('button')
      .contains('Create')
      .click();

    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.alert').contains('Error creating the airline. Check that no other airline with same iata/name combination exists');
  });

  it('Updates an airline', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.list-group-item')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('#checkboxes-1 i')
      .contains('work')
      .click();
    cy.get('#checkboxes-1 i')
      .contains('where_to_vote')
      .click();
    cy.get('#checkboxes-1 i')
      .contains('airline_seat_recline_normal')
      .click();

    cy.get('button')
      .contains('Edit')
      .click();

    cy.get('.list-group-item > .row').should('have.length', 5);
    cy.get('.list-group-item > .row .col').contains('VY');
    cy.get('.list-group-item > .row .col').contains('Vueling');

    cy.get('.list-group-item')
      .contains('Vueling')
      .parent()
      .contains('work')
      .should('not.have.attr', 'disabled');

    cy.get('.list-group-item')
      .contains('Vueling')
      .parent()
      .contains('where_to_vote')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('.list-group-item')
      .contains('Vueling')
      .parent()
      .contains('airline_seat_recline_normal')
      .should('have.attr', 'disabled', 'disabled');

    cy.get('.alert').contains('An Airline has been updated');
  });

  it('Updates an airline name', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.list-group-item')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('#input-2').type(' 2');

    cy.get('button')
      .contains('Edit')
      .click();

    cy.get('.list-group-item > .row').should('have.length', 5);
    cy.get('.list-group-item > .row .col').contains('VY');
    cy.get('.list-group-item > .row .col').contains('Vueling 2');

    cy.get('.alert').contains('An Airline has been updated');
  });

  it('Fails to updates an airline iata/name because already exists', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.list-group-item')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('#input-1')
      .clear()
      .type('AA');
    cy.get('#input-2')
      .clear()
      .type('American Airlines');

    cy.get('button')
      .contains('Edit')
      .click();

    cy.get('.list-group-item > .row').should('have.length', 5);
    cy.get('.list-group-item > .row .col').contains('VY');
    cy.get('.list-group-item > .row .col').contains('Vueling');

    cy.get('.alert').contains('Error updating the airline. Check that no other airline with same iata/name combination exists');
  });

  it('Deletes an airline', () => {
    cy.visit('http://localhost:8080/');

    cy.get('.list-group-item > .row').should('have.length', 5);

    cy.get('.list-group-item')
      .contains('Vueling')
      .parent()
      .click();

    cy.get('button')
      .contains('Delete')
      .click();

    cy.get('.list-group-item > .row').should('have.length', 4);

    cy.get('.alert').contains('An Airline has been removed');
  });
});
