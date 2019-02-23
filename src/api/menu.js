import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */

class MneuApi {
  list = (params) => fetch('GET', '/menu/tree/list', params);
  add = (params) => fetch('POST', '/menu/tree/add', params);
  delete = (params) => fetch('POST', '/menu/tree/delete', params);
  update = (params) => fetch('POST', '/menu/tree/update', params);
}

// 实例化再导出
export default new MneuApi();
