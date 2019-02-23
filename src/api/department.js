import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class DepartmentApi {

  /**
   * 增加公司
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/department/add', params);
  /**
   * 公司列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/department/list', params)
  /**
   * 删除公司
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/department/delete', params)
  /**
   * 根据ID查询公司
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/department/findById', params)
  /**
   * 更新公司
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/department/update', params)

  /**
   * 查询所有部门名称
   * @returns {Promise<*>}
   */
  findAllDname = () =>fetch('GET', '/department/findToAllDname')
}

// 实例化再导出
export default new DepartmentApi();
