import { mount } from '@vue/test-utils';
import AirlineListItemServices from '@/components/AirlineListItemServices.vue';

describe('AirlineListItemServices', () => {
  test('should match the snapshot', () => {
    const wrapper = mount(AirlineListItemServices, { propsData: { services: [{ name: 'bags' }, { name: 'checkin' }, { name: 'seats' }] } });
    expect(wrapper.element).toMatchSnapshot();
  });
  test('should return error icon if service name is not correct', () => {
    const wrapper = mount(AirlineListItemServices, { propsData: { services: [{ name: 'not_bags' }] } });
    expect(wrapper.element).toMatchSnapshot();
  });
});
