Math.avg = function () {
  let arr = Array.prototype.slice.apply(arguments);
  if (arr.length < 2) return console.error('调用此公式参数个数必须大于2哦！');
  return Math.sum(arr) / arr.length;
};

Math.sum = function (arr) {
  if (!isNaN(arr)) {
    arr = Array.prototype.slice.apply(arguments);
  }
  let sum = 0;
  if (!arr) return sum;
  for (let i = 0, len = arr.length; i < len; i++) {
    sum = sum + arr[i];
  }
  return sum;
};

/**
 * 四舍五入，并强制保留小数点后i位小数
 * 2016-6-25
 * @param d Number/String 目标值
 * @param i Number 保留的小数位数
 * @return String
 */
Math.decimalRound = function (d, i) {
  var f = parseFloat(d);
  if (isNaN(f)) {
    return;
  }
  var b = Math.pow(10, i);
  f = Math.round(d * b) / b;
  var s = f.toString();
  var rs = s.indexOf('.');
  if (rs < 0) {
    rs = s.length;
    s += '.';
  }
  while (s.length <= rs + i) {
    s += '0';
  }
  return s;
};
/**
 * 获取日期对象或日期格式字符串中的天数
 * 2019-6-25
 * @param d Date/String 日期对象或日期格式字符串
 * @return Number
 */
Math.day = function (d) {
  if (Math.isValidDate(d)) {
    var _d;
    if (typeof d === 'string') {
      _d = new Date(d);
    } else {
      _d = d;
    }
    return _d.getDate();
  } else {
    console.error('不是一个有效的日期');
  }
};
/**
 * 验证是否是一个有效的日期
 * 支持：yyyy-mm-dd和yyyy/mm/dd，且只能精确到day
 * 2019-6-25
 * @param d String/Date
 * @return boolean
 */
Math.isValidDate = function (d) {
  if (d instanceof Date) {
    return true;
  } else if (typeof d === 'string') {
    var array = [];
    if (/^\d{4}\-\d\d?\-\d\d?/.test(d)) {
      array = d.replace(/\-0/g, '-').split('-');
    }
    if (/^\d{4}\/\d\d?\/\d\d?/.test(d)) {
      array = d.replace(/\/0/g, '/').split('/');
    }
    if (array.length === 0) {
      return false;
    }
    var year = parseInt(array[0]);
    var month = parseInt(array[1]) - 1;
    var day = parseInt(array[2]);
    var date = new Date(year, month, day);
    return (date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day);
  } else {
    return false;
  }
};

/**
 * 字符串拼接
 */
Math.concat = function (a, b){
//console.info('concat了' + a + '+' + b);
  return a + '' + b;
};

/**
 * 字符串截取
 */
Math.substring = function (a, start, end) {
  if (!a) return '';
  console.info(a + '==>substring了' + start + '+' + end);
  let len = a.length;
  if (end > len) end = len;

  return a.substring(start, end);
};
Math.substr = Math.substring;

/**
 * 获取日期对象或日期格式字符串中的年份
 * 2019-6-25
 * @param d Date/String 日期对象或日期格式字符串
 * @return Number
 */
Math.year = function (d) {
  if (Math.isValidDate(d)) {
    var _d;
    if (typeof d === 'string') {
      _d = new Date(d);
    } else {
      _d = d;
    }
    return _d.getFullYear();
  } else {
    console.error('不是一个有效的日期');
  }
};

/**
 * 获取日期对象或日期格式字符串中的月份
 * 2019-6-25
 * @param d Date/String 日期对象或日期格式字符串   2018/05/25
 * @return Number
 */
Math.month = function (d) {
  if (Math.isValidDate(d)) {
    var _d;
    if (typeof d === 'string') {
      _d = new Date(d);
    } else {
      _d = d;
    }
    return _d.getMonth() + 1;
  } else {
    console.error('不是一个有效的日期');
  }
};
/**
 * 获取季度
 * 2019-6-26
 * @param d Date/String 日期对象或日期格式字符串
 * @return Number
 */
Math.quarter = function (d) {
  var q = Math.month(d);
  if (q > 0 && q < 4) {
    return 1;
  } else if (q > 3 && q < 7) {
    return 2;
  } else if (q > 6 && q < 10) {
    return 3;
  } else if (q > 9 && q < 13) {
    return 4;
  }
};

/**
 * 获取日期对象或日期格式字符串中的分钟
 * 2019-6-26
 * @param d Date/String 日期对象或日期格式字符串
 * @return Number
 */
Math.minute = function (d) {
  if (Math.isValidDate(d)) {
    var _d;
    if (typeof d === 'string') {
      _d = new Date(d);
    } else {
      _d = d;
    }
    return _d.getMinutes();
  } else {
    console.error('不是一个有效的日期');
  }
};

/**
 * 获取日期对象或日期格式字符串中的时点
 * 2019-6-26
 * @param d Date/String 日期对象或日期格式字符串
 * @return Number
 */
Math.hour = function (d) {
  if (Math.isValidDate(d)) {
    var _d;
    if (typeof d === 'string') {
      _d = new Date(d);
    } else {
      _d = d;
    }
    return _d.getHours();
  } else {
    console.error('不是一个有效的日期');
  }
};

/**
 * 获取日期对象或日期格式字符串中的秒钟
 * 2019-6-26
 * @param d Date/String 日期对象或日期格式字符串
 * @return Number
 */
Math.second = function (d) {
  if (Math.isValidDate(d)) {
    var _d;
    if (typeof d === 'string') {
      _d = new Date(d);
    } else {
      _d = d;
    }
    return _d.getSeconds();
  } else {
    console.error('不是一个有效的日期');
  }
};
/**
 * 求指定日期是当年中的第几周
 * 2019-6-26
 * @param d Date/String 日期对象或日期格式字符串
 * @return String
 */
Math.weekOfYear = function (d) {
  if (Math.isValidDate(d)) {
    var _d;
    if (typeof d === 'string') {
      _d = new Date(d);
    } else {
      _d = d;
    }
    var fd = new Date(_d.getFullYear(), 0, 1);
    var dayOfWeek = fd.getDay();
    var spendDay = 1;
    if (dayOfWeek != 0) {
      spendDay = 7 - dayOfWeek + 1;
    }
    fd = new Date(_d.getFullYear(), 0, 1 + spendDay);
    var dd = Math.ceil((_d.valueOf() - fd.valueOf()) / 86400000);
    var result = Math.ceil(dd / 7);
    return result + 1;
  } else {
    console.error('不是一个有效的日期');
  }
};

/**
 * 获取数据类型
 * gxb
 * @param {*} obj
 */
Object.getDataType = function (obj) {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  };
  return map[toString.call(obj)];
};
/**
 * 深度clone
 * gxb
 * @param {*} data
 */
Object.deepClone = function (data) {
  var t = Object.getDataType(data);
  var o;
  var i;
  var ni;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (i = 0, ni = data.length; i < ni; i++) {
      o.push(arguments.callee(data[i]));
    }
    return o;
  } else if (t === 'object') {
    for (i in data) {
      o[i] = arguments.callee(data[i]);
    }
    return o;
  }
};
/**
 *  @desc  :  判断是否为空
 * （用马军的，挪到这）
 *  @author:  gxb
 *  @date  :  2019/08/19
 *  @param   {}
 *  @return  {}
 *  @update  by
 */
Object.valiDataNull = function (val) {
  if (typeof val === 'boolean') {
    return false;
  }
  if (typeof val === 'number') {
    return false;
  }
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') {
      return true;
    }
    return false;
  }
  return false;
};
/**
 * @author gjx
 * @date 2019/8/27
 * @desc 时间的格式化
 */
Date.prototype.format = function (format) {
  var date = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S+': this.getMilliseconds()
  };
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (var k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length));
    }
  }
  return format;
};
Array.prototype.delete = function (delIndex) {
  var temArray = [];
  for (var i = 0; i < this.length; i++) {
    if (i != delIndex) {
      temArray.push(this[i]);
    }
  }
  return temArray;
};
/**
 *  @desc  :  首字母大写
 *  @author:  gxb
 *  @date  :  2019/09/06
 *  @param   {}
 *  @return  {}
 *  @update  by
 */
String.initialUpperCase = function (str) {
  var newStr = str.split(' ');
  for (var i = 0; i < newStr.length; i++) {
    newStr[i] = newStr[i].slice(0, 1).toUpperCase() + newStr[i].slice(1).toLowerCase();
  }
  return newStr.join(' ');
};
