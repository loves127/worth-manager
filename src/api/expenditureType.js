import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class expenditureTypeApi {

  /**
   * 增加账户
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/expenditureType/add', params);
  /**
   * 账户列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/expenditureType/list', params);
  /**
   * 删除账户
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/expenditureType/delete', params);
  /**
   * 根据ID查询账户
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/expenditureType/findById', params);
  /**
   * 更新账户
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/expenditureType/update', params);
}

// 实例化再导出
export default new expenditureTypeApi();
