import * as types from '../../mutations_type.js'

const mutations = {
  // 获取岗位
  [types.GET_POSTLIST] (state, payload) {
    state.list = payload.data
  },
  // 新增岗位
  [types.ADD_POST] (state, payload){
    state.msg = payload.msg
  }
};

export default mutations;
