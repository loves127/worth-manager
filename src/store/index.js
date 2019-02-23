import Vue from 'vue'
import Vuex from 'vuex'
import post from './modules/post/'
import showmsg from './modules/showmsg'
import * as actions from './actions'

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
  },
  modules: {
    post,
    showmsg
  },
  actions
});

export default store
