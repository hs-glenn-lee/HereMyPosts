import api from '@/api/api'
import Article from '@/model/Article'
const state = {
  alertIsShowing: false,
  alertMessage: ''
};
const getters = {
  getAlertMessage: state => {
    return state.alertMessage;
  },
  getIsAlertShowing: state => {
    return state.alertIsShowing;
  }
};
const mutations = {
  setAlertMessage: (state, payload) => {
    state.alertMessage = payload;
  },
  setAlertIsShowing: (state, payload) => {
    state.alertIsShowing = payload;
  },
  showAlert: (state, payload) => {
    state.alertIsShowing = payload.alertMessage;
    state.alertIsShowing = true;
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
