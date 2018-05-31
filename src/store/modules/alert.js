import api from '@/api/api'
import Article from '@/model/Article'
const state = {
  alert: {
    message: '',
    isShowing: false
  },
  alertCount: 0 // for identify alert emerged
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
  },
  getAlertCount: state => {
    return state.alertCount;
  }
};
const mutations = {
  setAlert: (state, payload) => {
    state.alertCount++;
    state.alert = payload;
  },
  setAlertMessage: (state, payload) => {
    state.alertCount++;
    state.alert.message = payload;
  },
  setAlertIsShowing: (state, payload) => {
    state.alertCount++;
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
