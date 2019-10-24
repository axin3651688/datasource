import {
  shallowMount,
  createLocalVue
} from '@vue/test-utils';
import VueRouter from 'vue-router';

import leftSide from '@c/left-side/left-side.vue';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();
const $route = {
  path: '/source-add'
};
shallowMount(leftSide, {
  localVue,
  router
});
describe('测试数据源侧边栏1', () => {
  it('测试路由跳转 ', () => {

  });
});
