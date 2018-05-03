import { axiosAppJson } from "../../model/axios-instances";

const state = {
  account: {}
}
const getters = {
  getAccount: state => {
    return state.account;
  }
}
const mutations = {
  setAccount: (state, payload) => {
    state.account = payload;
  }
}
const actions = {
  getMyAccount: ({ commit }) => {
    return new Promise((resolve, reject) => {
      axiosAppJson.get('/getMyAccount')
        .then(res => {
          if(res.status === 200) {
            commit('setAccount', res.data)
            resolve(res.data)
          }else {
            reject(res.message)
          }
        })
        .catch(err=>reject(err))
    })

  }
}
/*
* import {mapActions} from 'vuex';
* */
export default {
  state,
  mutations,
  actions,
  getters
}
