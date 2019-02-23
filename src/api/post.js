import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class PostApi {

  /**
   * 增加岗位
   * @param params
   * @returns {Promise<*>}
   */
  add = (params) => fetch('POST', '/post/add', params);
  /**
   * 岗位列表
   * @param params
   * @returns {Promise<*>}
   */
  list = (params) => fetch('GET', '/post/list', params)
  /**
   * 删除岗位
   * @param params
   * @returns {Promise<*>}
   */
  delete = (params) => fetch('POST', '/post/delete', params)
  /**
   * 根据ID查询岗位
   * @param params
   * @returns {Promise<*>}
   */
  findById = (params) => fetch('GET', '/post/findById', params)
  /**
   * 更新岗位
   * @param params
   * @returns {Promise<*>}
   */
  update = (params) => fetch('POST', '/post/update', params)
  /**
   * 更新状态
   * @param params
   * @returns {Promise<*>}
   */
  findByIdAndUpdate = (params) =>fetch('POST','/post/findByIdAndUpdate',params)
  /**
   * 查询所有岗位名称
   * @returns {Promise<*>}
   */
  findAllPname = () =>fetch('GET', '/post/findToAllPname')
}

// 实例化再导出
export default new PostApi();
