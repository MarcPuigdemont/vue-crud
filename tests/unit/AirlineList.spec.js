import { mount, shallowMount } from '@vue/test-utils';
import AirlineList from '@/components/AirlineList.vue';
import * as filterService from '@/services/filterService.jsx';

const propsData = {
  airlines: [
    {
      iata: 'BX',
      name: 'Airline name',
      primary_color: '#ffffff',
      secondary_color: '#000000',
      services: { bags: true, checkin: false, seats: true },
    },
    {
      iata: 'AX',
      name: 'Airline name 2',
      primary_color: '#ffaaff',
      secondary_color: '#00aa00',
      services: { bags: false, checkin: true, seats: true },
    },
  ],
  filter: '',
  serviceFilter: [],
};

describe('AirlineList', () => {
  test('should match the snapshot', () => {
    const wrapper = mount(AirlineList, {
      propsData,
      stubs: {
        AirlineListItem: '<div class="airline-grid-item"></div>',
      },
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  test('should emit the same airline as it gets from edit signal', () => {
    filterService.filterByStringAndServices = jest.fn();

    const wrapper = shallowMount(AirlineList, {
      propsData,
    });

    wrapper.vm.edit(propsData.airlines[0]);
    expect(wrapper.emitted('edit')[0][0]).toEqual(propsData.airlines[0]);
    expect(filterService.filterByStringAndServices).toBeCalledWith(propsData.airlines, propsData.filter, propsData.serviceFilter);
  });
});
