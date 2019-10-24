import axios from 'axios';
import {
  Message,
  Loading
} from 'element-ui';
import packageConfig from './../../package.json';
import {
  ACCESS_TOKEN
} from '@u/mutation-types';
import * as store from '@u/user';
let loading;
axios.defaults.timeout = 1000 * 30; // 超时时间 30s
// 是否正在刷新的标记
let isRefreshing = false;
// 重试队列，每一项将是一个待执行的函数形式
const requests = [];
/**
 * 开始加载动画
 */
function _startLoading () {
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0,0,0,0)'
  });
}
/**
 * 结束 加载动画
 * 结束加载动画后要将 fullscreenLoading 设置为默认的 true
 */
function _endLoading () {
  if (loading) loading.close();
}

// 请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  config.headers.version = packageConfig.version;
  _startLoading();
  if (localStorage.getItem(ACCESS_TOKEN)) {
    config.headers.Authorization = localStorage.getItem(ACCESS_TOKEN);
  }
  return config;
}, error => {
  if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) { // 判断请求异常信息中是否含有超时timeout字符串
    console.log('错误回调', error);
    Message.error('网络请求超时');
  }
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use(
  response => {
    const { code, msg } = response.data;
    // 这里把后台操作失败的信息统一提示出来,主要信息有,删除资源失败(资源被占用),新建资源名字重复等等  mj  2019/9/25
    // 后台有一个返回的是字符串200
    let flag = code != 200 && code != 401;
    if (flag) {
      Message({
        type: 'error',
        message: msg || response.msg,
        showClose: true
      });
      console.log('返回来的是空数据报错', response);
    }
    // 结束加载动画
    _endLoading();
    // 不强等于因为后台有一个返回的是字符串401
    if (code == 401) {
      const config = response.config;
      if (!isRefreshing) {
        isRefreshing = true;
        store.Refresh().then(function (token) {
          requests.forEach(cb => cb(token));
          return axios(config);
        }).finally(function () {
          isRefreshing = false;
        });
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push((token) => {
            config.headers['Authorization'] = token;
            resolve(axios(config))
          });
        });
      }
    }
    return response.data;
  },
  error => {
    // 错误提醒
    _endLoading();

    Message({
      type: 'error',
      message: (error.response.data && error.response.data.msg) || error.response.msg
    });
    console.log(error, '请求失败!!');
    // // 获取错误状态码
    // const {
    //   status
    // } = error.response;
    // console.log(status, '获取错误状态码');
    return Promise.reject(error);
  });

export default axios;
