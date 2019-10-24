import Vue from 'vue';
import App from './App.vue';
import axios from '@u/http.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';
import router from './router';
import '@/styles/index.scss';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';

import Bus from '@u/bus.js'; // 注册一个全局自定义指令 `v-clickoutside` by：jhb
Vue.component(CollapseTransition.name, CollapseTransition);

Vue.use(Bus);
Vue.use(window.AVUE);
// Vue.use(AVUE);
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
