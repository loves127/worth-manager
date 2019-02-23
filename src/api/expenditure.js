import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class ExpenditureApi {

  /**
   * 增加账户
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/expenditure/add', params);
  /**
   * 账户列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/expenditure/list', params);
  /**
   * 删除账户
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/expenditure/delete', params);
  /**
   * 根据ID查询账户
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/expenditure/findById', params);
  /**
   * 更新账户
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/expenditure/update', params);
  /**
   * 图标
   * @param params
   * @returns {Promise<*>}
   */
  findToPie = (params) => fetch('GET', '/expenditure/queryToPie', params);
  /**
   * 支出最高 最低 平均
   * @param params
   * @returns {Promise<*>}
   */
  findExDetail = (params) => fetch('GET', '/expenditure/queryExDetail', params);
}
// 实例化再导出
export default new ExpenditureApi();
