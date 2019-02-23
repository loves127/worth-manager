import * as types from './mutations_type.js'

export const showMsg = ({commit},payload) =>{
  commit(types.SHOW_MSG,payload)
};

