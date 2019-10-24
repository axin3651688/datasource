const ACCESS_TOKEN = 'Access-Token';
const TOKEN_INFO = 'TOKEN_INFO';
const GLOBAL_DIMS = 'GLOBAL_DIMS';

export {
  ACCESS_TOKEN,
  TOKEN_INFO,
  GLOBAL_DIMS
};

export const setToken = function (token, tokenInfo) {
  localStorage.setItem(ACCESS_TOKEN, token);
  localStorage.setItem(TOKEN_INFO, tokenInfo);
};
