/**
 * author：姜海斌
 *
 * 配置参考官网：http://eslint.cn/docs/rules/
 * 博客：https://blog.csdn.net/hsl0530hsl/article/details/78594973
 * webStorm-eslint的配置和使用（2018版）：https://blog.csdn.net/qq_29329037/article/details/80100450
 */

module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['warn', 'always'], // 语句强制分号结尾
    'quotes': ['error', 'single'], // 引号类型 `` "" ''
    'no-multi-spaces': ['error', {
      ignoreEOLComments: true
    }], // 不能用多余的空格, 'ignoreEOLComments' 或略注释前的空格
    'spaced-comment': ['error', 'always'], // 注释风格要不要有空格什么的
    'eol-last': ['warn', 'always'], // 要求或禁止文件末尾存在空行 'always':必须有空行；"never" 强制文件末尾不要有换行符
    "space-before-function-paren": // 函数定义时括号前面要要有空格
      ["error", {
        "anonymous": "always",
        "named": "always",
        "asyncArrow": "always"
      }],
    'object-curly-spacing': ["warn", "always"], // 大括号内是否允许不必要的空格
    'no-undef': ['warn', {
      "typeof": false
    }], //不能有未定义的变量
    'no-multiple-empty-lines': ["warn", {
      "max": 1,
      "maxBOF": 1
    }] // 不允许多个空行 "max"强制最大连续空行数。"maxEOF" 强制文件末尾的最大连续空行数。"maxBOF" 强制文件开始的最大连续空行数。
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
};