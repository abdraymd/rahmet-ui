import { shallowMount } from '@vue/test-utils';
import RahmetButton from './RahmetButton.vue';

describe('RahmetButton.vue', () => {
  let wrapper = null;

  const createWrapper = (props, slots) => {
    const defaultProps = {
      theme: 'primary',
      block: true,
      size: 'large',
      ...props
    };

    wrapper = shallowMount(RahmetButton, {
      propsData: defaultProps,
      slots
    });
  };

  afterEach(() => {
    wrapper.unmount();
    wrapper = null;
  });

  it('contains the theme class', () => {
    createWrapper();
    expect(wrapper.classes()).toContain('rahmet-btn--primary');
  });

  it('contains block behavior', () => {
    createWrapper();
    expect(wrapper.classes()).toContain('rahmet-btn--block');
  });

  it('checks the size class', () => {
    createWrapper();
    expect(wrapper.classes()).toContain('rahmet-btn--large');
  });

  it('displays loader properly', () => {
    createWrapper({ loading: true });

    const btnContent = wrapper.find('.rahmet-btn__content');
    const loader = wrapper.find('.rahmet-btn__loader');

    expect(wrapper.classes()).toContain('rahmet-btn--loading');
    expect(btnContent.isVisible()).toBe(false);
    expect(loader.exists()).toBe(true);
  });

  it('displays loading slot properly', () => {
    createWrapper({ loading: true }, { loading: '...' });

    const loader = wrapper.find('.rahmet-btn__loader');
    const loaderSpinner = wrapper.findComponent({ name: 'RahmetSpinner' });

    expect(loader.html()).toContain('...');
    expect(loaderSpinner.exists()).toBe(false);
  });
});
