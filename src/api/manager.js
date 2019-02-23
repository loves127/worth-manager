import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class UserApi {
  /**
   * 登录界面
   * @param params
   * @returns {Promise<*>}
   */
  goLogin = (params) => fetch('POST', '/login', params);

}

// 实例化再导出
export default new UserApi();
