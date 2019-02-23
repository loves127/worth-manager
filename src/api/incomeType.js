import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class IncomeTypeApi {

  /**
   * 增加账户
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/incomeType/add', params);
  /**
   * 账户列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/incomeType/list', params);
  /**
   * 删除账户
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/incomeType/delete', params);
  /**
   * 根据ID查询账户
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/incomeType/findById', params);
  /**
   * 更新账户
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/incomeType/update', params);
}

// 实例化再导出
export default new IncomeTypeApi();
