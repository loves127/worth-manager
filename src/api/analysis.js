import fetch from './fetch/index';

/**
 * 封装基础ajax请求
 * @param {any}
 */
class AnalysisApi {
  /**
   * charts
   * @param params
   * @returns {Promise<*>}
   */
  findToCharts = (params) => fetch('GET', '/analysis/queryToCharts', params);
}
// 实例化再导出
export default new AnalysisApi();
