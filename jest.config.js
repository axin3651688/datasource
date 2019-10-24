module.exports = {
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },
  transformIgnorePatterns: [
    '/node_modules/'
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@ad/(.*)$': '<rootDir>/src/assets/datas-area/datas-create-right-icon/$1',
    '^@ht/(.*)$': '<rootDir>/src/assets/datas-area/datas-create-left-icon/$1',
    '^@tem/(.*)$': '<rootDir>/src/assets/publish-template/static/$1', // 资源区-新建资源图标
    '^@a/(.*)$': '<rootDir>/src/assets/$1', // 配置静态图片引入别名，引用图片时前面加～,在css中引入则加～
    '^@b/(.*)$': '<rootDir>/src/base/$1',
    '^@c/(.*)$': '<rootDir>/src/views/component/$1',
    '^@de/(.*)$': '<rootDir>/src/views/data-source/$1',
    '^@dt/(.*)$': '<rootDir>/src/views/data-set/$1',
    '^@da/(.*)$': '<rootDir>/src/views/datas-area/$1',
    '^@i/(.*)$': '<rootDir>/src/views/instruments-panel/$1',
    '^@m/(.*)$': '<rootDir>/src/mixins/$1',
    '^@p/(.*)$': '<rootDir>/src/api/$1',
    '^@s/(.*)$': '<rootDir>/src/styles/$1',
    '^@t/(.*)$': '<rootDir>/src/views/test/$1',
    '^@u/(.*)$': '<rootDir>/src/utils/$1',
    '^@v/(.*)$': '<rootDir>/src/views/$1'
  },
  snapshotSerializers: [
    'jest-serializer-vue'
  ],
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname'
  ]
};
