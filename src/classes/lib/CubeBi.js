import {
  GET_DATA_FIND_JSON
} from '@p/dataArea';

import {
  FIND_DESIGN_SOURCE_BY_ID
} from '@p/interface';
import {
  FIND_PORTAL_SOURCE_BY_ID
} from '@p/portal';
import CnbiCube from './CnbiCube';
import CnbiSource from './CnbiSource';
import CnbiDash from './CnbiDash';
import ColFormatter from './ColFormatter';
import names from '@a/dictionaries/datas-create-top.json';

// import CubeObserver from './CubeObserver'; // 给数据添加动态监听，当数据变化时触发相应的时间跟新视图
/**
 * ================================================
 * @desc： 静态对象
 * @author: 龚佳新
 * @date  : 2019/6/26
 *   CubeBi.modules[type].id ==> cube source  dash
 * ================================================
 */
class CubeBi {
  /**
   * 设计器组件显示默认距离顶部的高度  gjx 2019/9/24
   * @type {number}
   */
  static designTopNavHeight = 200;

  /**
   * 拷贝的属性,本不应该有这个的，是为了填以前的坑而设计  gjx 2019/6/29
   * update gjx remove  filter    2019/8/22
   */
  static cubeProperties = ['id', 'filters', 'needDims', 'config', 'columns', 'rows', 'cube', 'code', 'updateUser', 'updateTime', 'compares', 'type'];

  /**
   *  可以保存的json属性   gxb 2019/08/27
   * @type {{id: string, text: string, filters: string, needDims: string, config: string, columns: string, rows: string, cube: string, code: string, updateUser: string, updateTime: string, type: string, datas: string}}
   */
  static couldSaveProperties = {
    // id: 'number',
    text: 'string',
    filters: 'array',
    needDims: 'object',
    config: 'string',
    columns: 'string',
    // rows: 'string',
    cube: 'string',
    // code: 'string',
    updateUser: 'string',
    // updateTime: 'string',
    // compares: 'object', // Array
    type: 'string'
    // datas: 'object' // Array

  };
  static noDesignSourceType = ['img', 'video', 'text'];
  static customConfigProperties = ['titleConfig', 'tableConfig', 'treeTableConfig', 'muTableConfig', 'chartConfig', 'calculatorConfig', 'layoutConfig', 'themeConfig', 'globalFiltrateConfig']; // 设计器所有视图配置
  /**
   *  默认的分页参数  gjx 2019/7/12
   */
  static pagination = {
    'page': 1,
    'size': 10000
  };
  /**
   *  3大模块的标识  gjx 2019/7/12
   */
  static modules = [{}, {
    id: 'cube',
    text: '数据集'
  }, {
    id: 'source',
    text: '资源'
  }, {
    id: 'dash',
    text: '仪表盘'
  }];

  /**
   * @desc 存到window下的变量, 有人讲存到vuex里？ 为了与刘琦定的1，2，3的代码，所以这里0做了一个占位   gjx 2019/7/12
   */
  static MGT_KEYS = ['', '$bi_' + CubeBi.modules[1].id + 's', '$bi_' + CubeBi.modules[2].id + 's', '$bi_' + CubeBi.modules[3].id + 's'];

  /**
   * 资源的三种类型   gjx 2019/7/12
   */
  static componentTypes = {
    'table': 'table',
    'chart': 'chart',
    'text': 'text'
  };

  /**
   *
   * @desc  获取需要缓存的对象数据
   * @author gjx
   * @date 2019/8/22
   * @params scope 需要处理的对象【cube source dash】
   */
  static getCubeCacheBean (scope) {
    let cacheBean = {};
    CubeBi.cubeProperties.forEach(property => {
      if (scope[property]) {
        cacheBean[property] = scope[property];
      }
    });
    return cacheBean;
  };

  static historyClickNodeOfkeyInLs = { // 历史点击节点存到ls中的key值
    cube: 'history_cube_node_info',
    source: 'history_source_node_info',
    dash: 'history_dash_node_info'
  };

  /**
   * 获取缓存节点的key
   * @param module
   * @returns {*}
   */
  static getModuleCacheKey(module){
    let lsKey = CubeBi.getCurrentUser().phone + CubeBi.historyClickNodeOfkeyInLs[module];
    return lsKey;
  }
  /**
   *  @desc  :  获取数据集、资源区、仪表盘右侧点击历史节点
   * （右侧节点每点击一次都会存到ls中）
   *  @author:  gxb
   *  @date  :  2019/09/10
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  static getNodeBean (module) {
    if (!isNaN(module)) { // 如果是数字
      module = CubeBi.modules[module].id;
    }
    return JSON.parse(localStorage.getItem(CubeBi.getModuleCacheKey(module))) || {};
  }

  /**
   *
   * @desc  功能：转成树形数据
   * @author gjx
   * @date 2019/7/20
   * @params data 需要和处理的数据
   * @params pid  根节点的id
   * @params defaultProps 在对象里的属性，可以不传！
   */
  static convertToTreeData (data, pid, defaultProps) {
    defaultProps = defaultProps || {
      children: 'children',
      label: 'label'
    };
    const result = [];
    let temp = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].pid === pid) {
        const obj = {
          'id': data[i].id
        };
        obj[defaultProps.label] = data[i].text;
        temp = CubeBi.convertToTreeData(data, data[i].id, defaultProps);
        if (temp.length > 0) {
          obj[defaultProps.children] = temp;
        }
        result.push(obj);
      }
    }
    return result;
  }

  /**
   * @desc 通过id获取数据集对象，此方法必须确保在数据集对象初始之后再调用
   * @param id 数据集id
   * @author gjx
   * @date 2019/7/20
   */
  static getCube (id) {
    return CubeBi.getCubeObject(id, 1);
  }

  /**
   * @desc 通过id获取资源对象，此方法必须确保在资源对象初始之后再调用
   * @author gjx
   * @date 2019/7/20
   */
  static getSource (id) {
    return CubeBi.getCubeObject(id, 2);
  }

  /**
   * @desc 通过id获取仪表盘对象，此方法必须确保在仪表盘对象初始之后再调用
   * @author gjx
   * @date 2019/7/20
   */
  static getDash (id) {
    return CubeBi.getCubeObject(id, 3);
  }

  /**
   * @desc 此方法必须确保在【数据集，资源，仪表盘】对象初始之后再调用
   * @param id
   * @param type  1,2,3对应的标记
   * @author gjx
   * @date 2019/7/20
   */
  static getCubeObject (id, type) {
    let sources = window[CubeBi.MGT_KEYS[type]];
    if (!sources) return;
    return sources[id];
  }

  /**
   * @desc Response数据处理
   * @author gjx
   * @date 2019/7/21
   */
  static resDataHandler (res) {
    let cube;
    if (!res.code) { // 如果res中没有code，就认为是请求的本地测试json数据 直接 cube = res
      cube = res;
    } else {
      let data = res.data;
      cube = res.code === 200 ? (data.jsonCol ? data.jsonCol : data) : null;
      if (!cube.filters) {
        cube.filters = []; // add by gjx 2019/9/24解决数据返回为null的问题
      }
    }
    return cube;
  }

  /**
   * @desc 数据集 通过id请求初始cube 数据集数据
   * @param id
   * @param isInit      是否需要初始化
   * @author gjx
   * @date 2019/6/27
   */
  static async getCubeById (id, isInit = false, isDebug, queryPortal = false) {
    let module = CubeBi.modules[1];
    let res;
    // 是否是查询门户信息
    if (!queryPortal) {
      res = await FIND_DESIGN_SOURCE_BY_ID(id, module.id, isDebug);
    } else {
      res = await FIND_PORTAL_SOURCE_BY_ID({
        sourceId: id,
        sourceType: 1
      });
    }
    // console.log(`请求【id=${id}】的cube数据res--->`, res, res.data.updateTime);
    // localStorage.setItem('allUpdateTime', res.data.updateTime);
    let cube = CubeBi.resDataHandler(res); // let cubeObj = new CnbiCube(cube);
    if (res.code === 200) {
      cube.module = module;
      if (!isInit) {
        return cube;
      } else {
        // debugger;
        let cubeObj = new CnbiCube(cube);
        await cubeObj.init(cube);
        return cubeObj;
      }
    } else {
      console.warn('可能传入了错误的cubeId' + cube.msg);
      return null;
    }
  }

  /**
   * @desc 拷贝属性
   * @author gjx
   * @date 2019/7/21
   */
  static propertiesCopy (target, source) {
    CubeBi.cubeProperties.forEach(pro => {
      if (!target[pro] && source[pro]) {
        if (pro === 'columns') {
          target[pro] = [];
        } else {
          target[pro] = source[pro];
        }
      }
    });
  }

  /**
   * @desc 通过列名获取列配置对象
   * @param columns
   * @param colId
   * @param property
   * @returns {*}
   * @author gjx
   * @date 2019/7/21
   */
  static _getColumnById (columns, colId, property) {
    if (!property) property = 'id';
    return columns.filter(col => {
      if (col[property] === colId) {
        return col;
      }
      if (col.children && col.children.length > 0) return this.getColumnById(col.children, colId);
    })[0];
  }

  /**
   * @desc 通过列名获取列配置对象
   * @param columns
   * @param colId
   * @param property
   * @author gjx
   * @date 2019/7/21
   * @update :上面的方法改为这个，透视表column包含chilren，需要递归，不影响之前的
   */
  static getColumnById (columns, colId, property, resArr) {
    if (!resArr) resArr = [];
    if (!property) property = 'id';
    columns.forEach(col => {
      if (col[property] === colId) {
        return resArr.push(col);
      }
      if (col.children && col.children.length > 0) return this.getColumnById(col.children, colId, null, resArr);
    });
    return resArr[0];
  }

  /**
   * @desc 对formatter对象进行解析,在渲染时调用的
   * @author gjx
   * @date 2019/6/28
   */
  static colFormatter (value, col) {
    return ColFormatter.colFormatter(value, col);
  }

  static __cubeProperties = ['dims', 'facts', 'pivotValues', 'tableSum', 'rowSum', 'factsCloum', 'sort', 'contrast', '', 'filters', 'colName', 'treeTableConfig'];

  /** ***************************以下老的适配已不用 gxb********************************* */
  /**
   * @desc  错误属性纠正
   * @author gjx
   * @date 2019/7/21
   */
  // static updateErrorProperties (source) {
  //   let xtype = source.type.xtype || source.type;
  //   let types = CubeBi.componentTypes;
  //   switch (xtype) {
  //     case types.table:
  //       // 等同于cube,这里只是把filter,cube,warnFilters时传入cube中执行就OK了
  //       break;
  //     case types.chart:
  //       if (!source.chartConfig && source.config) {
  //         source.chartConfig = source.config;
  //         delete source.config;
  //       } // 马军发过通知了的
  //       break;
  //     case types.text:
  //       // 文字组件
  //       break;
  //   }
  //   // 把外层马军写的散的dims,facts装到cube里去！
  //   if (!source.cube) {
  //     source.cube = {};
  //   } else {
  //     return;
  //   }
  //   // gjx update
  //   let emptyArrs = ['dims', 'facts', 'pivotValues',  'contrast', 'lastCickItems', 'filters', 'colName']; // 这些属性，即使在外层没有，也给初始化为空数组吧 gxb
  //   let emptyObjs = ['tableSum', 'rowSum', 'sort', 'treeTableConfig'];
  //   let booleanProps = ['factsCloum'];
  //   CubeBi.__cubeProperties.forEach(property => {
  //     if (source[property]) {
  //       source.cube[property] = source[property];
  //     } else if (emptyArrs.indexOf(property) !== -1) {
  //       source.cube[property] = [];
  //     } else if (emptyObjs.indexOf(property) !== -1) {
  //       source.cube[property] = {};
  //     } else if (booleanProps.indexOf(property) !== -1) {
  //       source.cube[property] = false;
  //     }
  //   });
  //   // 进一步规范和纠错，相应的会对组件中的属性进行修改规范，下面流程只是对已有的source进行适配  add by gxb
  //   if (source.type.subtype === 'table' || source.type.subtype === 'mu-table') { // 是表格才设置表格配置和计算配置 add by gxb
  //     CubeBi.setTableConfig(source); // 对一些涉及表格配置的属性进行重新命名和规范，并存到config下的tableConfig中
  //     CubeBi.setCalculatorConfig(source); // 对一些涉及单表、透视表、表格树计算的属性进行重新命名和规范，并存到config下的calculatorConfig下面
  //   } else { // 非table，这里设置一个空的tableConfig和calculatorConfig
  //     source.config.tableConfig = {};
  //     source.config.calculatorConfig = {
  //       rowCal: {},
  //       colCal: {},
  //       groupCal: []
  //     };
  //   }
  // }
  /**
   *  @desc  :  对一些涉及表格配置的属性进行重新命名和规范，并存到config下的tableConfig中
   *  @author:  gxb
   *  @date  :  2019/08/16
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  // static setTableConfig (source) {
  //   // let reSetArr = ['tableSum', 'rowSum', 'factsCloum'];
  //   let tableSetArr = ['merge', 'cellSpan', 'rowSeq', 'summary', 'isTreeTable']; // 合并同类项，合并单元格，行序号，分类计算
  //   let tableSet = source.cube.tableSum;
  //   let config = source.config;
  //   if (config.tableConfig) return; // 如果存在tableConfig，则用已经存在的
  //   let tableConfig = {}; // 所有关于单表的设置都存在tableConfig下面
  //   for (let key in tableSet) {
  //     if (tableSetArr.indexOf(key) !== -1) {
  //       let singleConfig = tableSet[key];
  //       switch (key) {
  //         case 'summary': { // 强迫症改了
  //           tableConfig.groupCal = singleConfig;
  //           break;
  //         }
  //         case 'merge':
  //         case 'cellSpan':
  //         case 'rowSeq':
  //         case 'isTreeTable':
  //         default: {
  //           tableConfig[key] = singleConfig;
  //           break;
  //         }
  //       }
  //     }
  //   }
  //   config.tableConfig = tableConfig; // 单表设置存到tableConfig下面
  // }
  /**
   *  @desc  :  对一些涉及单表、透视表、表格树计算的属性进行重新命名和规范，并存到config下的calculatorConfig下面
   *  @author:  gxb
   *  @date  :  2019/08/16
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  // static setCalculatorConfig (source) {
  //   let calculatorSetArr = ['rowSum', 'factsCloum']; // 行计算、列计算
  //   let config = source.config;
  //   let cube = source.cube;
  //   let subtype = source.type.subtype;
  //   if (config.calculatorConfig) return; // 如果存在calculatorConfig，则用已经存在的
  //   let calculatorConfig = {};
  //   let labels;
  //   // 先获取行计算和列计算
  //   for (let key in cube) {
  //     if (calculatorSetArr.indexOf(key) !== -1) {
  //       let singleConfig = cube[key];
  //       switch (key) {
  //         case 'rowSum': {
  //           calculatorConfig.rowCal = {
  //             flag: singleConfig.open || false,
  //             fun: singleConfig.rowSum || 'Math.sum'
  //           };
  //           break;
  //         }
  //         case 'factsCloum': {
  //           calculatorConfig.colCal = {
  //             flag: singleConfig || false,
  //             fun: 'Math.sum'
  //           };
  //           break;
  //         }
  //       }
  //     }
  //   }
  //   // 在获取分类计算
  //   let groupCal = []; // 这里使用数组存，因为分类计算是针对一个或多个标签来的
  //   if (subtype === 'table') labels = Object.assign([], cube.dims); // 单表根据维度进行分类计算
  //   if (subtype === 'mu-table') labels = Object.assign([], cube.facts); // 透视表根据度量进行分类计算
  //   labels.pop(); // 最后一个不需要分类计算，在这去掉
  //   if (labels && config.tableConfig.groupCal) {
  //     labels.forEach(label => {
  //       if (label.groupCal) {
  //         groupCal.push(label.groupCal);
  //       } else {
  //         groupCal.push(null);
  //       }
  //     });
  //   }
  //   calculatorConfig.groupCal = groupCal;
  //   config.calculatorConfig = calculatorConfig;
  // }
  /**
   * @desc 加载依赖的cube对象
   * @author gjx
   * @date 2019/7/21
   */
  static async loadDependencyCube (cubeId, params) {
    let module = CubeBi.modules[1]; // 调用统一的接口，贼溜了
    let tempParams = {};
    Object.assign(tempParams, params);
    tempParams.id = cubeId;
    let cube = await CubeBi.getDesignSource(module, tempParams);
    cube = CubeBi.resDataHandler(cube); // let cubeObj = new CnbiCube(cube);
    let cubeObject = new CnbiCube(cube, params);
    await cubeObject.init();
    return cubeObject;
  }

  /**
   * @desc 获取真实的设计资源对象
   * @author gjx
   * @date 2019/7/31
   */
  // static getRealDesignJsonSource (res) {
  //   if (res.code !== 200) {
  //     console.error(res);
  //     throw new Error('设计资源查询失败！');
  //   }
  //   let __source = res.data;
  //   let source = __source.columns || __source.jsonCol || __source; // 由于以前需求没有整清清楚楚，以前操作整个jsonCol了,这真的是不科学呢，小帮看着真的有点不高兴哦，不过没关系，小邦想了一个办法
  //   // if (!source.columns) source.columns = [];
  //   if (Array.isArray(source)) { // 如果是数组，修改下designList然后直接返回外层__source，不用内外合并（ps：真搞不懂为什么要套一层source，好混乱啊） update by gxb
  //     if (!__source.designList) {
  //       __source.childrenIds = [];
  //     } else {
  //       __source.childrenIds = __source.designList;
  //     }
  //     delete __source.designList;
  //     if (typeof (__source.type) === 'string') {
  //       __source.type = JSON.parse(__source.type);
  //     }
  //     if (Object.valiDataNull(__source.filters)) __source.filters = null;
  //     return __source;
  //   }
  //   this.propertiesCopy(source, __source); // 如果外层属性里，里层属性没有，刚把外层属性给到里层去，亲，放心吧，加了保险！
  //   let childrenIds = __source.designList; // designList  谁定的这个属性，真是太older了 哟!
  //   if (childrenIds && childrenIds.length > 0) {
  //     source.childrenIds = childrenIds;
  //   }
  //   //  source.config.cubes = cubeIds; // 为了与数据集的一致
  //   return source;
  // }

  /**
   * @desc 适配业务数据模型
   * http://192.168.1.145/auth?access_token=12121212212221212221212&scope=111&redirect_url=门户地址.......
   * http://192.168.1.145/auth?phone=1829801187&redirect_url=门户地址
   * http://192.168.1.145/auth?authrization=ewrerererererererererererer
   * @author gjx
   * @date 2019/7/21
   */
  // static async adaptBussniess (res, params) {
  //   let source = CubeBi.getRealDesignJsonSource(res);
  //   let __source = res.data;
  //   this.updateErrorProperties(source);
  //   source.xtype = source.type.xtype.replace('bi-', '');
  //   source.subtype = source.type.subtype;
  //   let cubeIds = __source.designList || source.childrenIds; // designList  谁定的这个属性，真是太older了 哟!
  //   if (cubeIds && cubeIds.length > 0) { // 加载数据集
  //     // source.config.cubes = cubeIds; // 为了与数据集的一致
  //     // let cube = await CubeBi.loadDependencyCube(cubeIds[0], params);
  //     let cube = await CubeBi.getCubeById(cubeIds[0], false, params.debug);
  //     if (cube) {
  //       source.__cube__ = cube;
  //       if (cube.datas) { // 临时测试用的,非法的
  //         source.datas = source.cubeTempDatas = cube.datas;
  //       }
  //     } else {
  //       console.error('数据集【' + cubeIds[0] + '】已经被人删除了，请检查更新！');
  //     }
  //   } else {
  //     throw Error('资源【' + source.id + '--' + source.text + '】没有数据集配制,请检查！');
  //   }
  //   // if (source.columns) {
  //   //   // source.cubeTempColumns = Object.deepClone(source.columns); // cubeTempColumns作为原始的columns,勿轻易改动 add gxb
  //   // }

  //   // source.reRender = { // 资源路线下，增加一个reRender属性，用于监听source组件是否需要重新渲染，免得去监听多个属性的麻烦 add gxb
  //   //   flag: false, // 是否需要重新渲染
  //   //   initCondition: null, // 初始化重新请求数据的条件
  //   //   simpleReRender: false // 不用走处理流程，为true强制刷新当前组件
  //   // };
  //   return source;
  // }
  /**
   * @desc 如果是调试模式,有debug,直接用最新api数据
   * @author gjx
   * @date 2019/7/21
   */
  static async getDesignSource (module, params) {
    if (!module) module = CubeBi.modules[params.type - 0]; // 调用统一的接口，贼溜了
    let object = null;
    if (params.queryPortal) { // 是否是查询门户信息
      object = await CubeBi.getPortalSource(params);
    } else {
      object = await FIND_DESIGN_SOURCE_BY_ID(params.id, module.id, params.debug);
    }
    return object;
    // if (!params.debug) {

    // }
    // let cacheKey = module.id + '-' + params.id;
    // let object = localStorage.getItem(cacheKey);
    // if (object == null || object === 'null') {
    //   object = await FIND_DESIGN_SOURCE_BY_ID(params.id, module.id, params.debug);
    //   if (object.code === 200) {
    //     localStorage.setItem(cacheKey, JSON.stringify(object));
    //   }
    // } else {
    //   object = JSON.parse(object);
    // }
    // return object;
  }

  static async getPortalSource (params) {
    const result = await FIND_PORTAL_SOURCE_BY_ID({
      sourceId: params.id,
      sourceType: params.type
    });
    return result;
  }

  /**
   * @desc    : 通过统一的方式加载【cube,source,dash】调用统一的接口，贼溜了
   * @author  : gjx
   * @param   : params.queryPortal   是否是查询门户信息，默认不是
   * @date 2019/7/21
   */
  static async getDesignObjectByParams (params, parent) {
    let viewType = params.type - 0;
    let module = CubeBi.modules[viewType - 0]; // 调用统一的接口，贼溜了
    let object = await CubeBi.getDesignSource(module, params);
    if (object.code !== 200) {
      console.error(object.msg || '查询资源出错！');
      return;
    }
    let cubeObject = null;
    if (viewType === 1) {
      object = CubeBi.resDataHandler(object); // let cubeObj = new CnbiCube(cube);
      cubeObject = new CnbiCube(object, params);
    } else if (viewType === 2) {
      object = await CubeBi.publicAdaptBussniess(object, viewType, params);
      // object = await CubeBi.adaptBussniess(object, params);
      cubeObject = new CnbiSource(object, params);
    } else if (viewType === 3) {
      object = await CubeBi.publicAdaptBussniess(object, viewType, params);
      // object = CubeBi.getRealDesignJsonSource(object);
      cubeObject = new CnbiDash(object, params);
      // return object; // 先返回，而后走资源路线type===2
    }
    if (parent) {
      cubeObject.setParent(parent);
    }
    await cubeObject.init();
    return cubeObject;
  }

  /**
   *  @desc  :  统一适配方法，规范之前存储的json配置
   * （资源对象和仪表盘对象都走这个规范方法）
   *  @author:  gxb
   *  @date  :  2019/08/27
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  static async publicAdaptBussniess (res, viewType, params) {
    let cubeObject = res.data;
    let subCubeObject = {};
    if (viewType === 1) {
      // ...数据集要适配吗？
    } else {
      if (!cubeObject.cube) cubeObject.cube = {};
      if (!cubeObject.config) cubeObject.config = {};
      cubeObject.childrenIds = cubeObject.designList || cubeObject.childrenIds || []; // designList改名了
      delete cubeObject.designList;
      if (cubeObject.columns && !Array.isArray(cubeObject.columns)) { // columns就是columns，就是数组，不要乱往里塞东西
        subCubeObject = cubeObject.columns;
        cubeObject.columns = subCubeObject.columns || subCubeObject.facts || [];
        CubeBi.updateSourceModel(subCubeObject, cubeObject, viewType);
        CubeBi.updateDashModel(subCubeObject, cubeObject, viewType);
      } else { // 新存的就不会有问题
        if (viewType === 2) {
          CubeBi.adaptType(cubeObject); // type很重要当然要适配一下呀
          if (!cubeObject.config.themeConfig) {
            cubeObject.config.themeConfig = {
              themeName: '',
              themeIndex: null
            };
          }
        }
        // ...
      }
    }
    if (viewType === 2) {
      // 加载数据集
      let cubeIds = cubeObject.childrenIds;
      if (cubeIds && cubeIds.length > 0) {
        let cube = await CubeBi.getCubeById(cubeIds[0], false, params.debug, params.queryPortal);
        if (cube) {
          cubeObject.__cube__ = cube;
        } else {
          console.error('数据集【' + cubeIds[0] + '】已经被人删除了，请检查更新！');
        }
      } else {
        throw Error('资源【' + cubeObject.id + '--' + cubeObject.text + '】没有数据集配制,请检查！');
      }
    }
    return cubeObject;
  }

  /**
   *  @desc  :  资源路线下适配cubeObject下的type
   *  @author:  gxb
   *  @date  :  2019/09/06
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  static adaptType (cubeObject) {
    let type = cubeObject.type;
    if (Object.valiDataNull(type) || typeof (type) !== 'object') { // 为什么会这么不规范？
      cubeObject.type = { // 我也不知道我也不敢问，这里直接给table add gxb
        xtype: 'bi-table',
        subtype: 'table'
      };
      type = cubeObject.type;
    }
    // 拆分type放到外部
    if (!Object.valiDataNull(type)) { // 没有bi-了
      cubeObject.subtype = type.subtype;
      cubeObject.xtype = type.xtype.replace('bi-', '');
      cubeObject.type.xtype = cubeObject.xtype;
    }
  }

  /**
   *  @desc  :  规范Source对象（资源对象）
   * （主要是将以前存在colums下的属性移动到cube和config下面，或是替换外层属性：cube下面存的有dims、facts、pivotValue、sort、contrast、lastCickItems、filters、colName，
   *  config下面整理的有tableConfig，treetableConfig，calulatorConfig，这些config都是由右侧边栏设置而来，没有也在这初始化）
   * （这样做的目的是分好类，方便后面解析，不然都是散的，后期维护会很麻烦）
   *  @author:  gxb
   *  @date  :  2019/08/27
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  static updateSourceModel (subCubeObject, cubeObject, viewType) {
    if (viewType !== 2) return;
    let cubeProperties = CubeBi.cubeProperties;
    let cubePropertiesInSource = {
      dims: [],
      facts: [],
      pivotValues: [],
      sort: {},
      contrast: [],
      // lastCickItems: [],
      filters: [],
      colName: [],
      noNeedSetColumns: false // 临时属性，新保存的json都为true，告诉后面不用setColumns了
    };

    // 优先用里面的
    cubeProperties.forEach(propName => {
      if (subCubeObject[propName]) cubeObject[propName] = subCubeObject[propName];
    });
    let cube = cubeObject.cube;
    CubeBi.adaptType(cubeObject); // 适配type
    // 生成cube内部属性
    for (let cubePropName in cubePropertiesInSource) {
      cube[cubePropName] = subCubeObject[cubePropName] || cubePropertiesInSource[cubePropName];
    }
    // 初始化config中的一些内部属性
    CubeBi.initConfigInSource(cubeObject, subCubeObject); // 不去适应之前的配置，直接在config中生成初始化配置：tableConfig，treeTableConfig
    if (cubeObject.xtype === 'chart') {
      cubeObject.config.chartConfig = subCubeObject.chartConfig || {};
    }
  }

  /**
   *  @desc  :  规范Dash对象（仪表盘对象）
   * （主要是将以前存在colums下的属性移动到cube和config下面，或是替换外层属性：cube下面存的有items，
   *  config下面整理的有layoutConfig，themeConfig，这些config都是由右侧边栏设置而来，没有也在这初始化）
   * （这样做的目的是分好类，方便后面解析，不然都是散的，后期维护会很麻烦）
   *  @author:  gxb
   *  @date  :  2019/08/27
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  static updateDashModel (subCubeObject, cubeObject, viewType) {
    if (viewType !== 3) return;
    let cubeProperties = CubeBi.cubeProperties;
    let cubePropertiesInDash = {
      // items: []
    };
    let configPropertiesInDash = ['config', 'cConfig', 'mConfig', 'pConfig'];
    let cube = cubeObject.cube;
    let config = cubeObject.config;
    // 优先用里面的
    cubeProperties.forEach(propName => {
      if (subCubeObject[propName] && propName !== 'config') cubeObject[propName] = subCubeObject[propName]; // 优先用里面的
    });
    // 生成cube内部属性
    for (let cubePropName in cubePropertiesInDash) {
      cube[cubePropName] = subCubeObject[cubePropName] || cubePropertiesInDash[cubePropName];
    }
    // 从subCubeObject中挪一些属性到config下
    let themeConfig = {
      themeIndex: null,
      themeName: subCubeObject.themeName
    };
    let layoutConfig = subCubeObject.items || []; // 仪表盘布局
    configPropertiesInDash.forEach(configProp => {
      let tempConfig = subCubeObject[configProp];
      switch (configProp) {
        case 'config': {
          themeConfig.activeTheme = tempConfig || {};
          break;
        }
        case 'cConfig': {
          themeConfig.pcTheme = tempConfig || {};
          break;
        }
        case 'mConfig': {
          themeConfig.phoneTheme = tempConfig || {};
          break;
        }
        case 'pConfig': {
          themeConfig.padTheme = tempConfig || {};
          break;
        }
      }
    });
    config.themeConfig = themeConfig;
    config.layoutConfig = layoutConfig;
    config.globalfiltrateConfig = []; // 全局筛选配置
  }

  /**
   *  @desc  :  初始化source对象中的congfig
   * （生成tableConfig，treeTableConfig，calculatorConfig）
   *  @author:  gxb
   *  @date  :  2019/08/27
   *  @param   {}
   *  @return  {}
   *  @update  by
   */
  static initConfigInSource (cubeObject, subCubeObject) {
    let config = cubeObject.config;
    config.tableConfig = {
      merge: true
    };
    config.treeTableConfig = subCubeObject.treeTableConfig || {};
    config.muTableConfig = {};
    config.calculatorConfig = {
      rowCal: {},
      colCal: {},
      groupCal: []
    };
    config.chartConfig = {};
    config.themeConfig = {
      themeIndex: null,
      themeName: subCubeObject.themeName || ''
    };
    config.titleConfig = {
      isTitleShow: false,
      title: '未命名图表',
      color: 'rgba(98,108,127,1)',
      fontSize: '16',
      fontFamily: 'Microsoft YaHei',
      textAlign: 'left'
    };
  };

  // ...chart的配置

  /**
   * @desc 资源区 通过id请求资源区对象   254
   * @date 2019-07-12
   * @author gjx
   */
  static async getSourceById (id, params) {
    let res = await GET_DATA_FIND_JSON(id);
    let source = CubeBi.publicAdaptBussniess(res, 2, params);
    // let source = await CubeBi.adaptBussniess(res, params);
    return source;
  }

  /**
   * @desc  仪表盘 通过id请求仪表盘对象
   * @date 2019-07-12
   * @author gjx
   */
  static async getDashById (id, params) {
    let res = await FIND_DESIGN_SOURCE_BY_ID(id, 'dash');
    let dash = CubeBi.publicAdaptBussniess(res, 3, params);
    // let dash = CubeBi.getRealDesignJsonSource(res, params);
    // let items = dash.items;//在业务里再去加载item.source
    return dash;
  }

  /**
   * @desc 通过对象本身判断是否为数据集
   * @date 2019-07-12
   * @author gjx
   */
  static isCube (scope) {
    return scope.module.id === this.modules[1].id;
  }

  /**
   * @desc 通过对象本身判断是否为资源
   * @date 2019-07-12
   * @author gjx
   */
  static isSource (scope) {
    return scope.module.id === this.modules[2].id;
  }

  /**
   * @desc 通过对象本身判断是否为仪表盘
   * @date 2019-07-12
   * @author gjx
   */
  static isDash (scope) {
    return scope.module.id === this.modules[3].id;
  }

  /**
   * @desc 获取缓存对象的KEY
   * @date 2019-07-12
   * @author gjx
   */
  static getObjectKey (scope) {
    let index = 1; // 默认是数据集
    // if (scope.__cube__) { // 则说明是资源
    //   index = 2;
    // } else if (scope.items) { // 说明是仪表盘
    //   index = 3;
    // }
    switch (scope.module.id) {
      case 'cube': {
        index = 1;
        break;
      }
      case 'source': {
        index = 2;
        break;
      }
      case 'dash': {
        index = 3;
        break;
      }
    }
    return CubeBi.MGT_KEYS[index];
  }
  /**
   * 设置当前节点到缓存里localStorage
   * @date  2019/10/13
   * @author gjx
   */

  static setCurrentNodeToLocalStorage(scope){
    if(scope.parent){return};//说明是dash内里的items的来的
    let module = scope.module;
    let lsKey = CubeBi.getModuleCacheKey(module.id);
    localStorage.setItem(lsKey, JSON.stringify({ id: scope.id, text: scope.title||scope.text }));
  }

  /**
   * @desc 设置对象到window上
   * @param index  MGT_KEYS 的索引
   * @param scope  对象
   * @date 2019-07-12
   * @author gjx
   */
  static async setScopeToWindow (scope) {
    let mgtKey = CubeBi.getObjectKey(scope);
    if (window[mgtKey]) {
      if (window[mgtKey][scope.id]) {
        console.warn('对象【' + mgtKey + '_' + scope.id + '】已经初始化了，无需重复调用！');
        return;
      }
    }
    window[mgtKey] = window[mgtKey] || {};
    window[mgtKey][scope.id] = scope; // 置入全局统一对象管理中，只创建[cube,resoruce,dash]中的一个对象，只创建一次，其它都只做update操作
    console.log('初始化了:' + mgtKey + '_' + scope.id, window[mgtKey]);
    CubeBi.setCurrentNodeToLocalStorage(scope);
  }

  /**
   * @desc 获取容器的高度
   * @date 2019-09/21
   * @author gjx
   */
  static getCompoentHeightByOffset (topHeight) {
    let tempComponentHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    return tempComponentHeight - topHeight; // that.$refs.queryHeight.offsetHeight - 150;
  }

  /**
   * @desc 统一设计容器高度和监听窗口的变化
   * @date 2019-07-12
   * @author gjx
   */
  static onLisenerOnResize (me) {
    me.componentHeight = this.getCompoentHeightByOffset(me.topHeight);
    if (!me.height) {
      window.onresize = () => {
        return (() => {
          me.componentHeight = this.getCompoentHeightByOffset(me.topHeight);
        })();
      };
    }
    return me.componentHeight;
  }

  /**
   * @desc 获取传递过来的参数  query get  params post 参数优先
   * @date 2019-07-12
   * @author gjx
   */
  static getReceiveParams ($router, id, type, _params) {
    let params = _params || $router.query || {};
    Object.assign(params, $router.params);
    if (id) {
      if (params.id) {
        console.info('参数里有ID' + params.id + '但组件参数有了，' + id);
      }
      params.id = id;
    }
    if (type && !params.type) { // add by gxb
      params.type = type;
    } //
    if (!params.id && params.type - 0 < 4) {
      params.id = CubeBi.getNodeBean(params.type - 0).id; // 从缓存里拿
    }
    return params;
  }

  /**
   *获取当前用户
   * @returns {*}
   */
  static getCurrentUser () {
    let db = localStorage.user;
    if (db) {
      return JSON.parse(db).cubeInfo.user; // 没有就从默认的里面拿
    }
    return { // 默认的是农垦的，以后只要保证登录过后取到cubeId存到localStore里后，就不会走这里了的，亲！
      datasource: '2c91808c6d1a122a016d1e1773f60030',
      cubeId: 1377
    };
  }
  /**
   *
   * @desc 获取默认的数据库信息  2c91808c6d1a122a016d1e1773f60030 1377
   * @author gjx                 2c9180926b736509016b739c1f390008  273
   * @date 2019/9/7
   * @update by gjx 2019/9/30
   */
  static getCurrentDbInfo (config) {
    if (config && config.datasource && config.cubeId) { // 统一更新为如果节点自身有datasouce,就用自身的，没有则是用登录后获取的！
      return {
        datasource: config.datasource,
        cubeId: config.cubeId
      };
    }
    let db = localStorage.database;
    if (db) {
      let cubeInfo = JSON.parse(db).cubeInfo; // 没有就从默认的里面拿
      if (cubeInfo) {
        return cubeInfo;
      }
    }
    return { // 默认的是农垦的，以后只要保证登录过后取到cubeId存到localStore里后，就不会走这里了的，亲！
      datasource: '2c91808c6d1a122a016d1e1773f60030',
      cubeId: 1377
    };
  }

  /**
   * 默认的树形属性   gjx 2019/9/7
   */
  static treeDefaultProps = {
    children: 'children',
    label: 'label'
  };

  /**
   *
   * @desc 获取默认的当前的公司
   * @param 树数组
   * @author gjx
   * @date 2019/9/7
   */
  static getCurrentCompanyBean (children, defaultProps) {
    let db = localStorage.database;
    let company = {};
    let id = '1';
    // if (db) {
    //   company = JSON.parse(db).company;
    //   id = company.customerId;
    // } else {
    company = JSON.parse(localStorage.vuex).user.user.company;
    id = company.id;
    // }
    defaultProps = defaultProps || this.treeDefaultProps;
    if (!id) { // 应该要返回的，但是没有返回，李宁，在库里你加上吧
      id = '1';
      if (company.id === 87) {
        id = 'jt1';
      }
    }
    let bean = {
      id: id,
      text: company.text
    };
    bean[defaultProps.label] = company.text;
    if (children && children.length > 0) {
      bean[[defaultProps.children]] = CubeBi.convertToTreeData(children, bean.id); // 数组转成树形对象数组的方法
    }
    return bean;
  }

  /**
   * @desc 设置特殊变量  需要改造的
   * @date 2019/7/20
   * @author gjx
   * @update by gjx  2019/8/30  2019/9/6 move here from cnbiCube.js
   */
  static setScopeVariables (scope, bean, key) {
    try {
      let text = bean.originText || bean[key];
      if (text && text.indexOf('$') !== -1) {
        if (!bean.originText) {
          if (!scope.needDims.period && (scope.needDims.year && scope.needDims.month)) text = text.replace('${scope.needDims.period.text}', '${scope.needDims.year.text}${scope.needDims.month.text}');
          bean.originText = text; // 第一次来的
        }

        bean.originText = bean.originText.replaceAll('this.', 'scope.');
        let newText = eval('(' + bean.originText + ')');
        bean[key] = newText;
        return newText;
      }
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @desc    : 这是顶部拖拽的下拉列表
   * @author  : mj
   * @date  : 2019/09/09
   * @update   by
   */
  static topDragList () {
    /**
     * @desc    : 通用下拉配置
     */
    let commonConfig = [names.sort, names.alignment, names.automaticLine, names.reName, names.getFormat];
    /**
     * @desc    : 日期格式的下拉
     */
    let dimsDatas = (() => {
      let listShowDimension = names.listShowDimension; // 按日等
      let temp = listShowDimension.concat(names.maxvalueDimension /* 更多 */, commonConfig);
      return temp;
    })();
    /**
     * @desc    : 度量配置
     */
    let factsDatas = (() => {
      let computer = names.computer; // 求和
      let temp = computer.concat(names.topComputer /* 高级计算 */, commonConfig);
      return temp;
    })();
    /**
     * 空标签的下拉  mj  2019/09/27
     */
    let emptyTag = [names.automaticLine, names.reName];
    return {
      commonConfig,
      dimsDatas,
      factsDatas,
      emptyTag
    };
  }

  static topLineList () {
    /**
     *   通用 mj  2019/09/07
     */
    let COMMONLINELIST = [names.dims, names.facts];
    /**
     *  次轴 mj  2019/09/09
     */
    let BIAXIALLINE = [names.dims, names.facts, names.pivotAxis];
    let DASHBOARD = [names.dims, names.factX, names.pivotY];
    return {
      COMMONLINELIST,
      PIVOTLINE: names.pivotline,
      BIAXIALLINE,
      DASHBOARD
    };
  }
}

export default CubeBi;
