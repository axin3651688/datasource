import request from '@u/http';
import {
  TOKEN_INFO
} from '@u/mutation-types';
import {
  CONTEXT_SETTING
} from '@/config/projectSetting';

/**
 * 登录接口
 */
export function login (loginUser, context = CONTEXT_SETTING.DESIGN) {
  console.log('调用登录接口');
  console.log(loginUser);

  return request({
    url: context + '/auth/login',
    method: 'post',
    params: {
      account: loginUser.usename,
      password: loginUser.password
    }

  });
}


/**
 * 登出接口git
 */
export function LOGOUT (params, context = CONTEXT_SETTING.DESIGN) {
  console.log('调用登出接口');
  return request({
    headers: {
      Authorization: params
    },
    url: context + '/auth/logout',
    method: 'get'
  });
}

/**
 * 用户登陆获取Token
 * @param parameter
 * @returns {*}
 */
export function GET_TOKEN (parameter, context = CONTEXT_SETTING.DESIGN) {
  parameter['client_id'] = 'browser';
  parameter['grant_type'] = 'password';
  parameter['auth_type'] = '';
  return request({
    url: context + '/uaa/oauth/token',
    method: 'post',
    params: parameter
  });
}
/**
 * 用户登出
 * @param parameter
 * @returns {*}
 */
export function DEL_TOKEN (parameter, context = CONTEXT_SETTING.DESIGN) {
  parameter['client_id'] = 'browser';
  return request({
    url: context + '/uaa/oauth/token',
    method: 'delete',
    params: parameter
  });
}

/**
 * 更新token
 * @returns {*}
 */
export function REFRESH_TOKEN (context = CONTEXT_SETTING.DESIGN) {
  const params = {};
  params.grant_type = 'refresh_token';
  params.client_id = 'browser';
  params.refresh_token = JSON.parse(localStorage.getItem(TOKEN_INFO)).refresh_token;
  return request({
    url: context + '/uaa/oauth/token',
    method: 'post',
    params: params
  });
}

/**
 * 获取用户信息
 */
export function GET_USER_INFO (context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/org/base_service/user_combo/find_cur_user_info',
    method: 'get'
  });
}

/**
 * 获取用户数据源信息
 */
export function FIND_INIT_INFO( context = CONTEXT_SETTING.DESIGN) {
  console.log('FIND_INIT_INFO');
  return request({
    url: context + '/datas/data_source/find_init_info',
    method: 'get'
  });
}

/**
 * POST /find_warn_msg_list 查询预警消息 李宁
 */
export function FIND_WARN_MSG_LIST (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/find_warn_msg_list',
    method: 'POST',
    data: data
  });
}

/**
 * GET /find_warn_unread_count 查询预警未读消息数量 李宁
 */
export function FIND_WARN_UNREAD_COUNT (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/find_warn_unread_count',
    method: 'GET',
    params: params
  });
}
/**
 *   /datas/update_cube_json_field  按字段更新数据集
 *   /datas/update_resource_json_field
 *   /datas/update_resource_json_field
 * * author: gjx
 * date: 2019-07-16
 * 按字段更新【数据集，资源，集表盘】三个接口统一
 */
export function UPDATE_DESIGN_SOURCE_BY_FIELD (data, module, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/update_' + module + '_json_field',
    method: 'PUT',
    data: data
  });
}
/**
 * author: gjx
 * date: 2019-07-16
 * 更新【数据集，资源，集表盘】，三个接口统一
 * cube /datas/data_design_json/update  ===> /datas/cube_portal/update_cube_json
 *     /datas/source_portal/update_resource_json
 *    /datas/dash_portal/update_dash_json
 */
export function UPDATE_DESIGN_SOURCE (data, module, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/update_' + module + '_json',
    method: 'PUT',
    data: data
  });
}

/**
 *  author: gjx
 *  date: 2019-07-16
 *   按Id或code统一查询数据集，资源，仪表盘统一格式 ：/find_design_${module}/${id} 按Id或code统一查询数据集，资源，仪表盘
 *   统一格式 ：/find_design_${module}/${id}
 */
export function FIND_DESIGN_SOURCE_BY_ID (id, module, debug, context = CONTEXT_SETTING.DESIGN) {
  let url = debug ? context + '/' + module + '-test/' + id + '.json' : context + '/datas/find_design_' + module + '/' + id;
  return request({
    url: url, // 生产环境地址
    method: 'get'
  });
}

/**
 * 保存 数据集，资源，仪表盘统一格式
 */
export function SAVE_DESIGN_SOURCE (data, module, context = CONTEXT_SETTING.DESIGN) {
  let url = context + '/datas/save_design_' + module; // /save_design_cube
  return request({
    url: url,
    method: 'post',
    data: data
  });
}

/**
 * 删除资源 数据集，资源，仪表盘统一格式
 */
export function DELETE_SOURCE_BY_ID (id, module, context = CONTEXT_SETTING.DESIGN) {
  let url = context + '/datas/delete_design_' + module + '/' + id;
  return request({
    url: url,
    method: 'delete'
  });
}

/**
 * 重命名 数据集，资源，仪表盘统一格式
 */
export function RENAME_SOURCE (data, module, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + `/datas/${module}_portal/rename`,
    method: 'put',
    data: data
  });
}

/**
 * 通过数据源code或者id查询函数列表
 * @param params
 * @constructor
 */
export function FIND_FUNLIST_BY_DATASOURCE (datasource, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/query_funapi_by_datasource',
    method: 'get',
    params: {
      'datasource': datasource
    }
  });
}
