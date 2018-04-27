<template>
  <div class="root-container center-block">
    <main>
      <div class="heading">
        <div class="global-logo"><i><img src="@/assets/images/logo_height_52px.png"/></i></div>
        <h2>계정 생성</h2>
      </div>

      <form>
        <div class="input-component">
          <input v-model="account.username" name="username" type="text" placeholder="사용자명"/>
          <div class="guide-message">{{userNameDescription}}</div>
        </div>

        <div class="input-component">
          <input v-model="account.email" name="email" type="text" placeholder="이메일"/>
          <div class="guide-message"></div>
        </div>

        <div class="input-component">
          <input v-model="account.password" type="password" placeholder="비밀번호"/>
          <div class="guide-message"></div>
        </div>

        <div class="input-component">
          <input v-model="repeatPassword" name="password-confirmation" type="text" placeholder="비밀번호 한번 더 입력"/>
          <div class="guide-message"></div>
        </div>

        <label class="checkbox-container">
          <input type="checkbox"><span class="underline-link">사용 약관</span>과 <span class="underline-link">개인정보 취급방침</span>에 동의합니다.
        </label>
        <div class="button-wrapper">
          <button>계정 생성</button>
        </div>
      </form>
      <div class="context-switch">
        <div class="tip-text">계정이 이미 있으세요?</div>
        <a href="/sign-in">로그인</a>
      </div>
    </main>
  </div>
</template>

<script>
import Account from '@/model/account'
import _ from 'lodash'
export default {
  name: 'SignUp',
  data () {
    return {
      account: new Account(),
      userNameDescription: '사용자명은 반드시 입력해야 합니다.',
      repeatPassword: ''
    }
  },
  methods: {
    validateUsername: _.debounce(
      function () {

      },
      1000
    ),
    validatePassword: _.debounce(
      function () {

      },
      1000
    ),
    validateEmail: _.debounce(
      function () {

      },
      1000
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
div.heading {
  margin-top: 100px;
  margin-bottom: 50px;
}
div.center-block {
  margin-left: auto;
  width: 30%;
  min-width: 480px;
}
div {
  text-align: center;
}
form {
  background-color: white;
  padding-top: 30px;
  padding-bottom: 30px;
  border: 1px solid #e5e5e5;
}
div.input-component {
  margin: 0.4em auto 0.5em auto;
  max-width: 308px;
}
div.guide-message {
  content: "";
  height: 1em;
  line-height: 1em;
  vertical-align: middle;
  text-align: left;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  color: #6f6f6f;
}
.red-text-alert {
  color: red;
}

div.button-wrapper {
  margin: 1.5em 0px 1.5em 0px;
}
button {
  width: 292px;
}
div.context-switch {
  margin-top: 1em;
  margin-bottom: 1em;
  color: #999999;
}
div.tip-text {
  height: 1.5em;
  line-height: 1.5em;
}
div.context-switch a{
  color: #004e8c;
}
label.checkbox-container {
  color: #2c3e50;
}
</style>

<style>
html {
  background-color: #f3f3f3;
}
</style>
