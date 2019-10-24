import { GET_TOKEN, GET_USER_INFO, DEL_TOKEN, REFRESH_TOKEN, FIND_INIT_INFO } from '@p/interface.js';
import { ACCESS_TOKEN, TOKEN_INFO, setToken } from '@u/mutation-types';
import { Message } from 'element-ui';
import { TIME_SETTING } from '@/config/projectSetting';
/*
 *本模块是用户登录时拿到登录的所有信息
 */

export function Login (userInfo) {
  return new Promise(async (resolve, reject) => {
    try {debugger
      let res = await GET_TOKEN(userInfo);
      setToken(res['token_type'] + ' ' + res['access_token'], JSON.stringify(res));
      if (res.expires_in < TIME_SETTING.reLoginTime) {
        this.Refresh();
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
export function Logout () {
  return new Promise(async (resolve, reject) => {
    const tokenInfo = JSON.parse(localStorage.getItem(TOKEN_INFO));
    try {
      await DEL_TOKEN({ access_token: tokenInfo['access_token'] });
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(TOKEN_INFO);
      localStorage.removeItem('user');
      localStorage.removeItem('database');
      clearInterval(window.login_timer);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
export function Refresh () {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await REFRESH_TOKEN();
      if (res.code === '200') {
        // 设置token
        setToken(res['token_type'] + ' ' + res['access_token'], JSON.stringify(res));
        resolve(res['access_token']);
      } else {
        // 刷新失败让其重新登陆
        Message.error('获取授权失败，请重新登陆！');
        if (localStorage.getItem(ACCESS_TOKEN)) {
          await this.Logout();
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        }
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
}
export function GetInfo () {
  return new Promise(async (resolve, reject) => {
    try {
      // 右上角的个人图标啥的
      const resUser = await GET_USER_INFO();
      localStorage.user = JSON.stringify({ cubeInfo: resUser.data });
      const resInitInfo = await FIND_INIT_INFO();
      if (resInitInfo.code === 200) {
        localStorage.database = JSON.stringify({ cubeInfo: resInitInfo.data });
      }
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

