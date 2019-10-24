/**
 * 配置参考：
 *  1. vul-cli官网：https://cli.vuejs.org/zh/guide/mode-and-env.html#模式
 *  2. vue-cli3配置vue.config.js持续更新：https://github.com/staven630/vue-cli3-config
 */
const path = require('path');
const debug = process.env.NODE_ENV !== 'production';

function resolve (dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: debug ? '/' : '/design_dev',
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [/\/node_modules\/resize-detector\//], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置

    if (debug) {
      // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map';
    } else {}
    config.externals = {
      // 'vue': 'Vue',
      // 'vue-router': 'VueRouter',
      // 'vuex': 'Vuex',
      // 'AVUE': 'AVUE'
      // 'element-ui': 'ELEMENT'
      // 'axios': 'axios',
      // 'echarts': 'echarts'
    };
    config.resolve = {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@a': resolve('src/assets'), // 配置静态图片引入别名，引用图片时前面加～,在css中引入则加～
        '@c': resolve('src/views/component'),
        '@cs': resolve('src/classes/lib'), 
        '@p': resolve('src/api'),
        '@t': resolve('src/views/test'),
        '@u': resolve('src/utils'),
        '@v': resolve('src/views'),
      }
    };
  },

  // 开发环境服务器设置
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 8086,
    https: false,
    hotOnly: false,
    // compress: true,
    disableHostCheck: true, // That solved it
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      // 设计器
      '/aapi': {
        // target: 'http://192.168.2.240:9100/',
        target: 'http://192.168.2.236/',
        // target: 'http://192.168.1.120:8005/', // 连接丁威私人服务，测试的
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/aapi': '/'
        }
      },
      // 门户使用
      '/apis': {
        target: 'http://192.168.2.236/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/apis': '/'
        }
      }
    }
  },
  // css相关配置
  css: {
    extract: false, // 是否使用css分离插件 ExtractTextPlugin
    sourceMap: true, // 开启 CSS source maps?
    loaderOptions: {}, // css预设器配置项
    modules: false // 启用 CSS modules for all css / pre-processor files.
  },

  // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: config => {
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },

  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  }
};
