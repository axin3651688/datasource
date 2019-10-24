import request from '@u/http';
import {
  CONTEXT_SETTING
} from '@/config/projectSetting';

/**
 * 数据字典接口  包括创建数据源列表
 */
export function FIND_CHILD_CODE (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/common/dict/find_all_child/' + params,
    method: 'get'
  });
}

/**
 * 数据源侧边栏  cxy  2019-04-10
 * data_source / find_datasource_left_bar 李宁
 */
export function FIND_CODE_DICT (context = CONTEXT_SETTING.DESIGN) {
  // console.log('查看最外层文件夹列表');
  return request({
    url: context + '/datas/data_source/find_datasource_left_bar',
    method: 'get'
  });
}
/**
 * 根据侧边type栏查询右边数据源表
 */
export function DATA_SOURCE_FIND_PAGE (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_source/find_page',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
    
  });
}

/**
 * GET /data_param/find_company_param/ 查询公司参数集合
 * 数据源参数控制器 : Data Param Controller
 * jhb 2019-03-12 添加
 */
export function GET_COMPANY_PARAM (context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_param/find_company_param/',
    method: 'get'
  });
}

/**
 * GET /data_param/find_id/{id} 通过主键查找公司参数
 * 数据源参数控制器 : Data Param Controller
 * jhb 2019-03-12 添加
 */
export function GET_SQL_PARAMS_BY_SQL_ID (sqlId, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_param/find_id/' + sqlId,
    method: 'get'
  });
}

/**
 * /search_by_code_keyword根据code和关键词搜索字典  // /common/dict/search_by_code_keyword 
 * @param params
 * @constructor
 */
// export function SEARCH_BY_CODE_KEYWORD (params, context = CONTEXT_SETTING.DESIGN) {
//   return request({
//     // url: context + '/datas/search_by_code_keyword',
//     url: context + '/datas/common/dict/search_by_code_keyword ',
//     method: 'get',
//     params: params
//   });
// }

export function SEARCH_BY_CODE_KEYWORD (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/common/dict/search_by_code_keyword',
    // url:'/common/dict/search_by_code_keyword ',
    method: 'get',
    params: params
  });
}

/**
 * POST /data_sql/save 添加公司SQL 李宁
 * 数据源SQL控制器 : Data Sql Controller
 * jhb 2019-03-13 添加
 */
export function POST_SQL_SAVE (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_sql/save',
    method: 'post',
    data: data
    // dataE: { // 示例数据
    //   type: 1, // sql类型 1-查询,2-新增,3-修改,4-删除
    //   source: 'select * from db2', // sql语句
    //   text: 'jhb-sql-test2' // 给这条sql的自定义命名
    // }
  });
}

/**
 * PUT / data_sql / update 修改公司SQL 李宁
 * 数据源SQL控制器 : Data Sql Controller
 * cxy 2019-04-29 添加
 */
export function PUI_DATA_SQL_UPDATE (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_sql/update',
    method: 'put',
    data: data
  });
}

/**
 * POST /data_sql/find_page 分页查询公司SQL 李宁
 * 数据源SQL控制器 : Data Sql Controller
 * jhb 2019-03-13 添加
 */
export function POST_SQL_PAGE_FIND (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_sql/find_page',
    method: 'post',
    data: data
    // dataE: { // 示例数据
    //   dataSourceId: 1, // sql语句保存后的id
    //   page: 1, // 第几页
    //   size: 10 // 每页多少条
    // }
  });
}

/**
 * POST /data_param/save 添加公司sql参数 李宁
 * 数据源参数控制器 : Data Param Controller
 * jhb 2019-03-12 添加
 */
export function POST_ADD_SQL_PARAMS (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_param/save',
    method: 'post',
    data: data
  });
}

/**
 * excel表格的上传
 */
export function EXCEL_DOWNLOAD (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/excel/conv_excel2json',
    method: 'post',
    data: data,
    responseType: 'json'
  });
}

// csv格式接口
export function IMPORT_CSV (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/csv/conv_csv2json',
    method: 'post',
    data: data
  });
}
// 校验公司下是否存在过该主题的数据集 CHECK_IS_EXIST_CUBE4_COMPANY 丁威  GET /excel/check_is_exist_cube4_company
// export function CHECK_IS_EXIST_CUBE4_COMPANY(params) {
//   return request({
//     url: '/DW/excel/check_is_exist_cube4_company',
//     method: 'get',
//     params: params
//   });
// }
export function CHECK_IS_EXIST_CUBE4_COMPANY (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/excel/check_is_exist_cube4_company',
    method: 'get',
    params: params
  });
}
// POST /excel/is_exist_same_fact_data   判断是否存在相同维度的事实数据 IS_EXIST_SAME_FACT_DATA 丁威
// export function IS_EXIST_SAME_FACT_DATA(data) {
//   return request({
//     url: '/DW/excel/is_exist_same_fact_data',
//     method: 'post',
//     data: data
//   });
// }
export function IS_EXIST_SAME_FACT_DATA (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/excel/is_exist_same_fact_data',
    method: 'post',
    data: data
  });
}
// 测试李宁数据集保存的接口
export function add (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_design/save',
    method: 'post',
    data: data
  });
}

export function DELETE_DATA_PARAM (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_source/delete/' + data,
    method: 'DELETE'
    // data: data
  });
}

/**
 * DELETE / data_param / delete  SQL 删除数据源列表 李宁
 * CXY 2019-03-14 删除
 */
export function DELETE_DATA_SQL_PARAM (data, context = CONTEXT_SETTING.DESIGN) {
  console.log('删除数据源列表');
  return request({
    url: context + '/datas/data_param/delete/' + data,
    method: 'DELETE'
    // data: data
  });
}

/**
 * DELETEdata_param / update 数据源列表 李宁
 * ht 2019-03-14 修改
 */
export function UPDATE_DATA_PARAM (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_param/update/',
    method: 'put',
    data: data
  });
}

/**
 * DELETE / data_param / delete 关闭数据源连接 涛涛
 ht 2019 - 03 - 13 添加
 */
export function GET_CLOSE_CONNECT (datasource, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data/close_connect',
    method: 'get',
    params: {
      datasource: datasource
    }
  });
}

/**
 * DELETE / data_param / delete 建立数据源连接 涛涛
 ht 2019 - 03 - 13 添加
 */
export function GET_CONNECT (datasource, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data/connect',
    method: 'get',
    params: {
      datasource: datasource
    }
  });
}

/**
 * post data_source / save 添加数据源 李宁
 ht 2019 - 03 - 14 添加
 */
export function POST_DATA_SOURCE_SAVE (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_source/save',
    method: 'post',
    data: data
  });
}

/**
 * GET / data_source / search_data_source 搜索数据源列表
 mj 2019 - 03 - 14 添加
 */
export function SEARCH_DATA_SOURCE (params, context = CONTEXT_SETTING.DESIGN) {
  console.log('来了sql');
  return request({
    url: context + '/datas/data_source/search_data_source',
    method: 'get',
    params: params
  });
}

/**
 * lc /source_portal/search_data_source
 搜索资源区 李宁
 */
export function SEARCH_DATA_RESOURCE (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/source_portal/search_data_source',
    method: 'get',
    params: params
  });
}
/**
 * lc /data_design/search_data_design
 搜索数据集 李宁
 */
export function SEARCH_DATA_DESIGN (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_design/search_data_design',
    method: 'get',
    params: params
  });
}

/**
 * GET / data_source / search_data_source 搜索数据源列表
 mj 2019 - 03 - 14 添加
 */
export function POST_DATA_SOURCE_UPDATE (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_source/update',
    method: 'put',
    data: data
  });
}

/**
 * POST /find_cube_map 查询数据源表数据 李宁
 * http://192.168.2.245:8005/swagger-ui.html#!/25968254542830425805203162550921475/findCubeMapUsingPOST
 * @param params
 */
export function findThirdPartData (params, context = CONTEXT_SETTING.DESIGN) {
  if (!params.cubeId) {
    params.cubeId = JSON.parse(localStorage.database).license.id;
  }
  return request({
    method: 'post',
    url: params.url || context + '/datas/find_cube_map/',
    params: params
  });
}

/**
 * 查询sql列表 李宁
 * by ht 2019-3-15
 */
export function FIND_SQL_LIST (data, context = CONTEXT_SETTING.DESIGN) {
  console.log('查询sql管理列表');
  return request({
    url: context + '/datas/data_sql/find_page',
    method: 'post',
    data: data
  });
}

/**
 * 删除sql列表 李宁
 * by ht 2019-3-15
 */
export function FIND_SQL_DELETE (id, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_sql/delete/' + id,
    method: 'DELETE'
    // data: data
  });
}

/**
 * 编辑sql列表 李宁
 * by ht 2019-3-15
 */
export function FIND_SQL_UPDATE (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_sql/update',
    method: 'PUT',
    data: data
  });
}

// export function findThirdPartData(params) {
//   return request({
//     url: '/sql/cube/find_sql/',
//     method: 'get',
//     params: params
//   });
// }

/**
 * GET / data_source / find_id / {id}通过主键查找数据源 李宁
 mj 2019 - 03 - 14 添加
 */
export function SEARCH_DATA_SOURCE_ID (id, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_source/find_id/' + id,
    method: 'get'
  });
}

/**
 * POST / TT / data / test_connect 测试数据源链接 TT
 ht 2019 - 03 - 16 添加
 */
export function POST_DATA_TEST_CONNECT (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data/test_connect',
    method: 'post',
    data: data
  });
}

/**
 * POST / TT / data / test_connect 根据名称查询数据源 李宁
 ht 2019 - 03 - 18 添加
 */
export function GET_FIND_DATASOURCE_NAME (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_source/find_datasource_name?',
    method: 'get',
    params: params
  });
}

/**
 * POST / data_source / find_database_source 根据名称查询数据源 李宁
 * 侧边栏用的
 ht 2019 - 03 - 18 添加
 */
export function POST_FIND_DATABASE_SOURCE (data, context = CONTEXT_SETTING.DESIGN) {
  // console.log('wo lai l ');
  return request({
    url: context + '/datas/data_source/find_database_source',
    method: 'post',
    data: data
  });
}

/**
 * POST / data_source / find_database_source 搜索数据源SQL 李宁
 ht 2019 - 03 - 19 添加
 */
export function GET_DATA_SQL_SEARCH_SQL (params, context = CONTEXT_SETTING.DESIGN) {
  // console.log('wo lai search');
  return request({
    url: context + '/datas/data_sql/search_sql',
    method: 'get',
    params: params
  });
}

/**
 * GET / data_sql / find_id / 搜索数据源SQL 李宁
 ht 2019 - 03 - 19 添加
 */
export function GET_DATA_SQL_FIND_ID (id, context = CONTEXT_SETTING.DESIGN) {
  // console.log('wo lai search');
  return request({
    url: context + '/datas/data_sql/find_id/' + id,
    method: 'get'
  });
}

/**
 * GET /init_cube/check_company_cube 检查该公司数据表是否初始化完整 CHECK_COMPANY_CUBE 丁威
 * @param appRunDbType  工程运行数据源类型1-mysql,2-oracle,3-sqlserver
 * jhb 2019-05-31 添加
 */
export function CHECK_COMPANY_CUBE (appRunDbType, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/init_cube/check_company_cube',
    method: 'get',
    params: {
      appRunDbType
    }
  });
}

/**
 * POST /init_cube/init_cube 初始化cube INIT_CUBE 丁威
 * @param appRunDbType  工程运行数据源类型1-mysql,2-oracle,3-sqlserver
 * jhb 2019-05-31 添加
 */
export function INIT_CUBE (data, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/init_cube/init_cube',
    method: 'post',
    data
    // params: {
    //   appRunDbType,
    //   etlHandlerUrl
    // }
  });
}

/**
 * POST /excel/conv_excel2json excel转json CONV_EXCEL2JSON 丁威
 * http://192.168.2.245:8005/swagger-ui.html#!/259912021425968254542830425805203162550921475/excel2JsonUsingPOST_1
 * @param file          {formData}
 * @param fixed         {number} 1=固定模板f 0=非固定
 * @param templateId
 * jhb 2019-05-31 添加
 */
export function CONV_EXCEL2JSON (file, fixed = 1, templateId = 1, context = CONTEXT_SETTING.DESIGN) {
  let formData = new FormData();
  formData.set('file', file);
  formData.set('fixed', fixed);
  formData.set('templateId', templateId);
  return request({
    url: context + '/datas/excel/conv_excel2json',
    method: 'post',
    responseType: 'json',
    data: formData
  });
}

/**
 * GET /data_folder/find_able_list 查看最外层文件夹列表 李宁
 * http://192.168.2.245:8005/swagger-ui.html#!/357743574522120259912021422841/findParentListUsingGET
 * @param type          {number} 1=数据集
 * jhb 2019-05-31 添加
 */
export function FIND_ABLE_LIST (type = 1, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/data_folder/find_able_list',
    method: 'get',
    params: {
      type
    }
  });
}

/**
 * POST /excel/save_json_data 保存json中的数据到对应的事实数据表 SAVE_JSON_DATA 丁威
 * @datasource          {string}    如：'402881fa699a2b9a01699e24278c0006'
 * @folderId            {integer}   文件夹id
 * @json                {string}    json格式的数据
 * @period              {string}    期间
 * @text                {string}    导入excel取的标题
 * @addCubeType         {integer}   0=不行新增，1=新增
 * @coverFactDataType   {integer}   0=不覆盖，  1=覆盖
 * jhb 2019-06-03 添加
 */

export function SAVE_JSON_DATA (datas, context = CONTEXT_SETTING.DESIGN) {
  // export function SAVE_JSON_DATA (datasource, folderId, json, period, text, addCubeType, coverFactDataType) {
  return request({
    url: context + '/datas/excel/save_json_data',
    method: 'POST',
    data: datas
    // data: {
    //   datasource,
    //   folderId,
    //   json,
    //   period,
    //   text,
    //   addCubeType,
    //   coverFactDataType
    // }
  });
}

/**
 * POST /find_dim_datas 查询维度表数据 FIND_DIM_DATAS 丁威
 * http://192.168.2.245:8005/swagger-ui.html#!/3250024230316492970225805203162550921475/findDimDatasUsingPOST
 * @datasource  {String}  数据源id 如“2c9180926b736509016b739c1f390008”
 * @dimSign     {String}  'period'=期间；'company'=公司
 * by：jhb
 */

export function FIND_DIM_DATAS (datasource, dimSign, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/find_dim_datas',
    method: 'POST',
    data: {
      datasource,
      dimSign
    }
  });
}

/**
 * GET /find_dim_tables  查询所有维度列表 FIND_DIM_TABLES 丁威
 * http://192.168.2.245:8005/swagger-ui.html#!/3250024230316492970225805203162550921475/findDimTablesUsingGET
 * @datasource  {String}  数据源id 如“2c9180926b736509016b739c1f390008”
 * by：ZJ
 */
export function FIND_DIM_TABLES (datasource, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/find_dim_tables?datasource=' + datasource,
    method: 'GET'
  });
}

/**
 * lc   GET /find_needdims_by_sources 仪表盘保存前查询维度 李宁
 * @param sources
 * @constructor
 */
export function FIND_NEEDDIMS_BY_SOURCES (sources, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/datas/find_needdims_by_sources?sources=' + sources,
    method: 'GET'
  });
}

/**
 * ht   /find_code_dict根据Code查询数据字典 FIND_CODE_DICT 李宁
 * @param sources
 * @constructor
 */
export function DATA_SOURCE_FIND_CODE_DICT (params, context = CONTEXT_SETTING.DESIGN) {
  return request({
    url: context + '/common/dict/find_child/' + params,
    method: 'GET'
  });
}
