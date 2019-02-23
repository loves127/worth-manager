import * as types from '../../mutations_type.js'
import PostApi from '@/api/post';
import {showMsg} from "../../actions";

const actions = {
  getPostList({commit, state}) {
    state.loading = true;
    const res = PostApi.list({curPage: state.curPage, rows: state.rows});
    res.then((data) => {
      if (data.state === '200') {
        state.loading = false;
        commit(types.GET_POSTLIST, {
          data: data.data
        })
      }
    })
  },
  addPost({commit, state}, payload) {
    state.loading = true;
    const res = PostApi.add(payload);
    res.then(data => {
      if (data.state === '200') {
        state.loading = false;
        showMsg(true,'success','添加成功');
        commit(types.ADD_POST, {
          msg: data.msg
        })
      }
    })

  }
};

export default actions
