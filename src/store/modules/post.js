import * as type from '@/store/mutations_type.js'
import PostApi from '@/api/post';

const getters = {
  post_list: state => state.list
};

const actions = {
  getPostList({ commit, state }){
    state.loading = true;
    const res = PostApi.list({curPage: state.curPage,rows: state.rows});
    res.then((data) => {
      if (data.state === '200') {
        state.loading = false;
        commit(type.GET_POSTLIST, {
          data: data.data
        })
      }
    })
  }
};

const mutations = {
  // 获取岗位
  [type.GET_POSTLIST] (state, payload) {
    state.list = payload.data
  }
};


export default {
  state: {
    list: [], // 岗位列表
    curPage: 1, // 当前页
    rows:10 // 每页大小
  },
  getters,
  actions,
  mutations
};


