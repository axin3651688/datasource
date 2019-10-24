import Vue from 'vue';
import Router from 'vue-router';
import * as store from '@u/user';
import {
  ACCESS_TOKEN,
  setToken
} from '@u/mutation-types';
import {
  TIME_SETTING
} from '@/config/projectSetting';
import textmodel from './textmodel';
import reportManage from './report-manage';
import { buildChildren } from '@babel/types';
// 本页面只包含通用路由和路由守卫
Vue.use(Router);
const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...textmodel,
    ...reportManage,
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录'
      },
      component: () => import('@v/login/login')
    },
    
    // {
    //   path: '/source', // 龚佳新的测试页面
    //   meta: {
    //     title: '资源'
    //   },
    //   component: () => import('@/classes/source')
    // },
    {
      path: '/test', // 测试页面
      component: () => import('@v/test/test')
    },

    {
      path: '*',
      name: '/404',
      component: () => import('@c/404')
    }
  ]
});

/**
 * 根据路由设置网页标题
 */
function _setTitle(to, from, next) {
  let siteTitle = '文字报告';
  let routerTitle = to.meta.title;
  if (routerTitle) {
    siteTitle += '-' + routerTitle;
  }
  window.document.title = siteTitle;
}
/**
 * 路由守卫,路由发生改变前
 */
router.beforeEach((to, from, next) => {
  _setTitle(to, from, next); // 根据路由设置网页标题
  if (to.query.access_token && to.query.token_info) {
    setToken(to.query.access_token, to.query.token_info);
  }
  let token = localStorage.getItem(ACCESS_TOKEN);
  if (to.path === '/login') {
    clearInterval(window.login_timer);
    next();
    return;
  }
  if (token) {
    // 设置一个刷新token的定时器
    if (!window.login_timer) {
      window.login_timer = setInterval(function () {
        store.Refresh().then(function () {
          console.log('刷新成功');
        });
      }, TIME_SETTING.refreshTokenInterval);
    }
    if (localStorage.database == undefined) {
      // TODO 设置登陆后该有的数据，因为现在只有用户，所以上面判断的是用户，记得改一下
      store.GetInfo().then(function () {
        next();
      });
    } else {
      next();
    }
  } else {
    next('/login');
  }
});

export default router;
