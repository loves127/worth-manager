import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class AccountApi {
  /**
   * 用户列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/user/list', params);
  /**
   * 新增用户
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/user/add', params);
  /**
   * 删除用户
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/user/delete', params)
  /**
   * 查询用户
   * @param params
   * @returns {Promise<*>}
   */
  find = (params) => fetch('GET', '/user/find', params)
  /**
   * 根据ID查询用户
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/user/findById', params)
  /**
   * 更新用户
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/user/update', params)
  /**
   * 获得岗位列表
   * @returns {Promise<*>}
   */
  postList = () => fetch('GET','/user/postList');
  /**
   * 获得部门列表
   * @returns {Promise<*>}
   */
  departmentList = () => fetch('GET', '/user/departmentList');
  /**
   * 获得公司列表
   * @returns {Promise<*>}
   */
  companyList = () => fetch('GET', '/user/companyList')
}

// 实例化再导出
export default new AccountApi();
