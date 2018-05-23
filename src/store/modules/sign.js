import axiosAppJson from '@/api/api'
const state = {
  sign: {
    account: {},
    isSignedIn: false
  }
};
const getters = {
  getSign: state => {
    return state.sign;
  },
  getAccount: state => {
    return state.account;
  }
};
const mutations = {
  setAccount: (state, payload) => {
    state.account = payload;
  },
  setIsSignedIn: (state, payload) => {
    state.isSignedIn = payload;
  },
  setSign: (state, payload) => {
    state.account = payload.account;
    state.isSignedIn = payload.isSignedIn;
  }
};
const actions = {
  initSign: (context) => {
    if(!state.sign.isSignedIn) {
      return axiosAppJson.getMyAccount()
        .then( data => {
          context.commit('setAccount', data)
          context.commit('setIsSignedIn',true)
          return data;
        })
        .catch( errMsg => {
          alert(errMsg)
        });
    }else {
      return Promise.resolve(this.account)
    }
  }
};
export default {
  state,
  mutations,
  actions,
  getters
}
