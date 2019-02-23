import getters from './getters'
import actions from './actions.js'
import mutations from './mutations.js'

export default {
  state: {
    list: [], // 岗位列表
    curPage: 1, // 当前页
    rows:8, // 每页大小
    loading: false, // 是否加载中
    form:{

    },
    msg: '' // 提示信息
  },
  getters,
  actions,
  mutations
};
