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
          if(res.data.status === 'success') {
            commit('setAccount', res.data.data)
            resolve(res.data)
          }else {
            reject(res.data.message)
          }
        })
        .catch(err=>{
          reject(err)
          console.log(err)
        })
    })
  },
  signIn: ({ commit }, payload) => {
    return axiosAppJson.post('/sign-in', payload)
        .then(res => {
          console.log(res)
          if(res.data.status === 'success') {
            commit('setAccount', res.data)
            return res.data;
          }else {
            console.log('???')
            return Promise.reject(res.data.message);
          }
        })
        .catch(err => {
          console.log(err)
          return Promise.reject(err);
        })
  },
  isUniqueNewname({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axiosAppJson.post('/isUniqueNewUsername',{
        'username':'hayley'
      })
        .then(res => {
          resolve(res.isUniqueNewUserName)
        })
        .catch(err => console.log(err) );
    })
  },
  signUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axiosAppJson.post('/sign-up', payload)
        .then(res => {
          if(res.data.status === 'success') {
            resolve(res.data);
          }else {
            reject(res.data.message)
          }
        })
        .catch(err => console.log(err))
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
