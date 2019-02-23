import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class CompanyApi {

  /**
   * 增加公司
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/company/add', params);
  /**
   * 公司列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/company/list', params)
  /**
   * 删除公司
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/company/delete', params)
  /**
   * 根据ID查询公司
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/company/findById', params)
  /**
   * 更新公司
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/company/update', params)
  /**
   * 查询所有公司名称
   * @returns {Promise<*>}
   */
  findAllCname = () =>fetch('GET', '/company/findToAllCname')
}

// 实例化再导出
export default new CompanyApi();
