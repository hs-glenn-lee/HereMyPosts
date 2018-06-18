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
    console.log(payload);
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
    console.log('syncSign!')
    console.log(state.sign)
    console.log(state.sign.isSignedIn)
    if(!state.sign.isSignedIn) {
      return api.getMyAccount()
        .then( data => {
          console.log('getMyAccount!')
          console.log(data);
          context.commit('setAccount', data)
          context.commit('setIsSignedIn',true)
          return data;
        })
        .catch( errMsg => {
          console.log(errMsg)
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
