import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class transferRecordApi {

  /**
   * 增加账户
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/transferRecord/add', params);
  /**
   * 账户列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/transferRecord/list', params);
  /**
   * 删除账户
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/transferRecord/delete', params);
  /**
   * 根据ID查询账户
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/transferRecord/findById', params);
  /**
   * 更新账户
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/transferRecord/update', params);
}

// 实例化再导出
export default new transferRecordApi();
