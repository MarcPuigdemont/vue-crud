import { mount } from '@vue/test-utils';
import AirlineForm from '@/components/AirlineForm.vue';

describe('AirlineForm', () => {
  test('should match the snapshot on create', () => {
    const propsData = {
      action: 'create',
    };
    const wrapper = mount(AirlineForm, {
      propsData,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
  test('should match the snapshot on update', () => {
    const propsData = {
      action: 'upadte',
      entity: {
        iata: 'BX',
        name: 'Airline name',
        primary_color: '#ffffff',
        secondary_color: '#000000',
        services: { bags: true, checkin: false, seats: true },
      },
    };
    const wrapper = mount(AirlineForm, {
      propsData,
    });
    expect(wrapper.element).toMatchSnapshot();
  });
});
