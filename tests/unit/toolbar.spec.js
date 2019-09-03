import { mount, shallowMount } from '@vue/test-utils';
import Toolbar from '@/components/Toolbar.vue';

describe('Toolbar', () => {
  test('should match the snapshot', () => {
    const wrapper = mount(Toolbar);
    expect(wrapper.element).toMatchSnapshot();
  });
  test('should emit proper services', () => {
    const wrapper = shallowMount(Toolbar, {});

    wrapper.find('[data-test=filter-bags]').element.click();
    let services = { bags: true, checkin: false, seats: false };
    expect(wrapper.emitted('service-filter')[0][0]).toEqual(services);

    wrapper.find('[data-test=filter-checkin]').element.click();
    services = { bags: true, checkin: true, seats: false };
    expect(wrapper.emitted('service-filter')[1][0]).toEqual(services);

    wrapper.find('[data-test=filter-seats]').element.click();
    services = { bags: true, checkin: true, seats: true };
    expect(wrapper.emitted('service-filter')[2][0]).toEqual(services);
  });
  test('should emit proper search filter', () => {
    const wrapper = shallowMount(Toolbar, {});
    wrapper.find('[data-test=filter-input]').setValue('1234');
    expect(wrapper.emitted('filter')[0][0]).toEqual('1234');
  });
});
