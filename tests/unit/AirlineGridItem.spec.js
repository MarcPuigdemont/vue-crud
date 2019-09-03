import { mount } from '@vue/test-utils';
import AirlineGridItem from '@/components/AirlineGridItem.vue';

describe('AirlineGridItem', () => {
  test('should match the snapshot', () => {
    const propsData = {
      airline: {
        iata: 'BX',
        name: 'Airline name',
        primary_color: '#ffffff',
        secondary_color: '#000000',
        services: { bags: true, checkin: false, seats: true },
      },
    };
    const wrapper = mount(AirlineGridItem, {
      propsData,
      stubs: {
        AirlineListItemServices: '<div class="airline-list-item-services"></div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
    const expectedServicesList = [{ name: 'bags', available: true }, { name: 'checkin', available: false }, { name: 'seats', available: true }];
    expect(wrapper.vm.servicesList).toEqual(expectedServicesList);
  });
});
