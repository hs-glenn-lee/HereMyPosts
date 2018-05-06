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
    return axiosAppJson.get('/getMyAccount')
        .then(res => { return res })
        .catch(err=>{ console.log(err) })
        .then(res => {
          if(res.data.status === 'success') {
            commit('setAccount', res.data.data)
            return res.data.data
          }else {
            return reject(res.data.message)
          }
        })
  },
  signIn: ({ commit }, payload) => {
    return axiosAppJson.post('/sign-in', payload)
        .then(res => { return res })
        .catch(err => {
          console.log(err)
        })
        .then(res => {
          if(res.data.status === 'success') {
            commit('setAccount', res.data)
            return res.data;
          }else {
            return Promise.reject(res.data.message);
          }
        })
  },
  isUniqueNewUsername({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axiosAppJson.post('/isUniqueNewUsername',{
        'username':payload
      })
        .then(res => {
          console.log(res)
          resolve(res.data.isUniqueNewUserName)
        })
        .catch(err => console.log(err) );
    })
  },
  signUp({ commit }, payload) {
    return axiosAppJson.get('/sign-up')
      .then(res => { return res })
      .catch(err=>{ console.log(err) })
      .then(res => {
        if(res.data.status === 'success') {
          commit('setAccount', res.data.data)
          return res.data.data
        }else {
          return reject(res.data.message)
        }
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
