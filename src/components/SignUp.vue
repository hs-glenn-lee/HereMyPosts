<template>
  <div>
    <main>
      <div class="global-logo">logo</div>
      <h2>로그인</h2>
      <form>
        <div class="input-component">
          <input v-model="account.username" name="username" type="text"/>
          <div class="guide-message">{{userNameDescription}}</div>
        </div>

        <div class="input-component">
          <input v-model="account.email" name="email" type="text"/>
          <div class="guide-message"></div>
        </div>

        <div class="input-component">
          <input v-model="account.password" type="password"/>
          <div class="guide-message"></div>
        </div>

        <div class="input-component">
          <input name="password-confirmation" type="text"/>
          <div class="guide-message"></div>
        </div>
        <div>
          {{account.username}}
          {{account.password}}
        </div>
        <button>계정 만들기</button>
      </form>
    </main>
  </div>
</template>

<script>
import Account from '../model/account/account'
import _ from 'lodash'
export default {
  name: 'home',
  data () {
    return {
      account: new Account(),
      userNameDescription: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    validateUsername: _.debounce(
      function () {
        var ret = this.account.validateUsername()
        if (!ret.isValidate) {
          this.userNameDescription = ret.message
        }
      },
      500
    )
  },
  watch: {
    'account.username': function (newVal, oldVal) {
      this.validateUsername()
    }
  }
}
</script>

<style scoped>

</style>
