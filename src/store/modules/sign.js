import api from '@/api/api'
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
    return state.sign.account;
  },
  getIsSignedIn: state => {
    return state.sign.isSignedIn;
  }
};
const mutations = {
  setAccount: (state, payload) => {
    console.log('setAccount!')
    state.sign.account = payload;
  },
  setIsSignedIn: (state, payload) => {
    state.sign.isSignedIn = payload;
  },
  setSign: (state, payload) => {
    state.sign.account = payload.account;
    state.sign.isSignedIn = payload.isSignedIn;
  }
};
const actions = {
  syncSign: (context) => {
    if(!state.sign.isSignedIn) {
      return api.getMyAccount()
        .then( data => {
          context.commit('setAccount', data)
          context.commit('setIsSignedIn',true)
          return data;
        })
        .catch( errMsg => {
          return Promise.reject(errMsg);
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
