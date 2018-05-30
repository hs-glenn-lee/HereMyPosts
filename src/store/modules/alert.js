import api from '@/api/api'
import Article from '@/model/Article'
const state = {
  alert: {
    message: '',
    isShowing: false
  }
};
const getters = {
  getAlertMessage: state => {
    return state.alert.message;
  },
  getIsAlertShowing: state => {
    return state.alert.isShowing;
  },
  getAlert: state => {
    return state.alert;
  }
};
const mutations = {
  setAlert: (state, payload) => {
    state.alert = payload;
  },
  setAlertMessage: (state, payload) => {
    state.alert.message = payload;
  },
  setAlertIsShowing: (state, payload) => {
    state.alert.isShowing = payload;
  }

};
const actions = {

};
export default {
  state,
  mutations,
  actions,
  getters
}
