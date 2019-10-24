export const TIME_SETTING = {
  // 小于此时间登陆刷新 单位s
  reLoginTime: 3 * 3600,
  // 每隔此时间刷新token， 注意 refreshTokenInterval < reLoginTime   单位：ms
  refreshTokenInterval: 7200 * 1000
};

export const CONTEXT_SETTING = {
  // 设计器服务地址
  DESIGN: '/aapi',
  // 门户服务地址
  PORTAL: '/apis'
};
