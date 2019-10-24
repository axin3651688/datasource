import Vue from 'vue';
import {
  shallowMount
} from '@vue/test-utils';
import HelloWorld from './HelloWorld.vue';
const wrapper = shallowMount(HelloWorld);
describe('HelloWorld.vue', () => {
  it('测试查看功能', () => {
    expect(wrapper.vm.todos.length).toBe(2);
  });

  it('测试增加功能', () => {
    wrapper.setData({
      newTodo: 'test'
    });
    wrapper.find('button').trigger('click');
    expect(wrapper.vm.todos[2].text).toBe('test');
  });

  it('测试删除功能', () => {
    const wrapper = shallowMount(HelloWorld); // 如果不考虑之前的因素,需要重新取wrapper
    const delbtn = wrapper.find('.delete');
    delbtn.trigger('click');
    expect(wrapper.vm.todos.length).toBe(1);
  });

  it('渲染新的props', () => {
    const msg = 'new message';
    const wrapper = shallowMount(HelloWorld, {
      propsData: {
        msg
      }
    });
    expect(wrapper.text()).toMatch(msg);
  });

  it('拥有created函数', () => {
    expect(typeof HelloWorld.created).toBe('function');
  });

  it('评估原始组件选项中的函数的结果', () => {
    expect(typeof HelloWorld.data).toBe('function');
    const defaultData = HelloWorld.data();
    expect(defaultData.message).toBe('hello!');
  });

  it('检查 mount 中的组件实例', () => {
    const vm = new Vue(HelloWorld).$mount();
    expect(vm.message).toBe('bye!');
  });
});
