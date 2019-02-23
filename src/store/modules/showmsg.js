import {SHOW_MSG} from '../mutations_type.js'

const state = {
  message:{
    isShow: false,
    type: '', //弹框类型
    content: '' // 弹框内容
  }
}

const mutations = {
  [SHOW_MSG](state , payload){
    state.message = payload
  }
};

export default {
  state,
  mutations
}
