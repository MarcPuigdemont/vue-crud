import { filterByStringAndServices } from '@/services/filterService.jsx';

describe('FilterService', () => {
  describe('filterByStringAndServices', () => {
    test('it should filter airlines with iata or name matching text', () => {
      const airlines = [{ iata: 'abcd', name: 'cdef' }, { iata: 'default', name: 'name' }];
      expect(filterByStringAndServices(airlines, 'bcd').length).toEqual(1);
      expect(filterByStringAndServices(airlines, 'name').length).toEqual(1);
      expect(filterByStringAndServices(airlines, 'def').length).toEqual(2);
    });
    test('it should filter airlines only by services if no text given', () => {
      const airlines = [
        { iata: 'abcd', name: 'cdef', services: { bags: true, checkin: false, seats: true } },
        { iata: 'default', name: 'name', services: { bags: false, checkin: false, seats: true } },
      ];
      expect(filterByStringAndServices(airlines, '', ['seats']).length).toEqual(2);
      expect(filterByStringAndServices(airlines, '', ['seats', 'bags']).length).toEqual(1);
      expect(filterByStringAndServices(airlines, '', ['checkin']).length).toEqual(0);
    });
    test('it should filter airlines by text and services', () => {
      const airlines = [
        { iata: 'abcd', name: 'cdef', services: { bags: true, checkin: false, seats: true } },
        { iata: 'default', name: 'name', services: { bags: false, checkin: false, seats: true } },
      ];
      expect(filterByStringAndServices(airlines, 'bcd', ['seats']).length).toEqual(1);
      expect(filterByStringAndServices(airlines, 'def', ['seats']).length).toEqual(2);
      expect(filterByStringAndServices(airlines, 'def', ['seats', 'bags']).length).toEqual(1);
      expect(filterByStringAndServices(airlines, '', ['checkin']).length).toEqual(0);
    });
  });
});
