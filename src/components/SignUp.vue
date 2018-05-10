<template>
  <div class="root-container center-block">
    <main>
      <div class="heading">
        <div class="global-logo"><i><img src="@/assets/images/logo_height_52px.png"/></i></div>
        <h2>계정 만들기</h2>
      </div>

      <form>
        <div class="input-component">
          <input v-model="account.username"
                 name="username"
                 type="text"
                 placeholder="사용자명"/>
          <div class="guide-message"
                :class="{'false-color': !isUserNameValidate, 'true-color': isUserNameValidate}">
            {{userNameDescription}}
          </div>
        </div>

        <div class="input-component">
          <input v-model="account.email"
                 name="email"
                 type="text"
                 placeholder="이메일"/>
          <div class="guide-message"
               :class="{'false-color': !isEmailValidate, 'true-color': isEmailValidate}">{{emailDescription}}</div>
        </div>

        <div class="input-component">
          <input v-model="account.password"
                 type="password"
                 placeholder="비밀번호"/>
          <div class="guide-message"
               :class="{'false-color': !isPasswordValidate, 'true-color': isPasswordValidate}">{{passwordDescription}}</div>
        </div>

        <div class="input-component">
          <input v-model="repeatPassword"
                 name="password-confirmation"
                 type="password"
                 placeholder="비밀번호 한번 더 입력"/>
          <div class="guide-message"
               :class="{'false-color': !isRepeatPasswordValid, 'true-color': isRepeatPasswordValid}">{{repeatPasswordDescription}}</div>
        </div>

        <label class="checkbox-container">
          <input type="checkbox"
                 v-model="isCheckedOnAgreement">
          <span class="underline-link">사용 약관</span>과 <span class="underline-link">개인정보 취급방침</span>에 동의합니다.
        </label>
        <div class="button-wrapper">
          <button type="button" v-on:click="signUpAndInAndGoToManage">계정 생성</button>
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
import Account from '@/model/account';
import api from '@/api/api';

import _ from 'lodash'
export default {
  name: 'SignUp',
  created () {
    document.querySelector('html').style.backgroundColor = '#f3f3f3'
  },
  data () {
    return {
      account: new Account(),
      userNameDescription: '',
      isUserNameValidate: false,
      emailDescription: '',
      isEmailValidate: false,
      passwordDescription: '',
      isPasswordValidate: false,
      repeatPassword: '',
      repeatPasswordDescription: '',
      isRepeatPasswordValid: false,
      isCheckedOnAgreement: false
    }
  },
  methods: {
    validateUsername: _.debounce(
      function () {
        var username = this.account.username;

        var isValidateUsername = this.account.isValidUsername(username)
        if(!isValidateUsername.isValid) {
          this.isUserNameValidate = false;
          this.userNameDescription = isValidateUsername.message
          console.log(isValidateUsername.message)
          return
        }


        api.isUniqueNewUsername(username)
          .then(ret => {
            console.log(ret)
            if(ret) {
              this.isUserNameValidate = true;
              this.userNameDescription = 'good!'
            }else {
              this.isUserNameValidate = false;
              this.userNameDescription = '이미 사용중인 사용자명입니다.'
            }
          })

      },
      1000
    ),
    validateEmail: _.debounce(
      function () {
        var email = this.account.email;
        var ret = this.account.isValidEmil(email)
        if(ret.isValid) {
          this.isEmailValidate = true;
          this.emailDescription = 'good!'
        }else {
          this.isEmailValidate = false;
          this.emailDescription = ret.message;
        }
      },
      1000
    ),
    validatePassword: _.debounce(
      function () {
        var password = this.account.password
        var ret = this.account.isValidPassword(password)
        if(ret.isValid) {
          this.isPasswordValidate = true;
          this.passwordDescription = 'good!'
          return
        }else {
          this.isPasswordValidate = false;
          this.passwordDescription = ret.message
          return
        }
      },
      1000
    ),
    validateRepeatPassword: _.debounce(
      function () {
        if(this.repeatPassword === this.account.password) {
          this.isRepeatPasswordValid = true;
          this.repeatPasswordDescription = 'good!'
        }else {
          this.isRepeatPasswordValid = false;
          this.repeatPasswordDescription = '비밀번호가 일치하지 않습니다.'
        }
      },
      1000
    ),
    isFormValidate() {
      return this.isRepeatPasswordValid && this.isUserNameValidate && this.isPasswordValidate && this.isEmailValidate && this.isCheckedOnAgreement
    },
    signUpAndInAndGoToManage() {
      if(this.isFormValidate()) {
        api.signUp(this.account)
          .then(na => {
            api.signIn({
              username: this.account.username,
              password: this.account.password
            })
              .then(data => {
                this.$router.push({ path: "/manage"})
              })
              .catch(message => {
                alert(mesage)
              })
          })
          .catch(err => {
              console.log(err)
          })
      }else {
        alert('약관동의 및 입력정보를 모두 입력해주세요.')
      }
    }
  },
  watch: {
    'account.username': function (newVal, oldVal) {
      this.validateUsername()
    },
    'account.password' : function (newVal, oldVal) {
      this.validatePassword()
    },
    'account.email' : function (newVal, oldVal) {
      this.validateEmail()
    },
    repeatPassword: function (newVal, oldVal) {
      this.validateRepeatPassword()
    }
  }
}
</script>

<style scoped>
div.heading {
  margin-top: 30px;
  margin-bottom: 15px;
}
div.center-block {
  margin-left: auto;
  width: 25%;
  min-width: 430px;
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
  height: 0.8em;
  line-height: 0.8em;
  vertical-align: middle;
  text-align: left;
  padding-top: 0.2em;
  padding-bottom: 0.5em;
  padding-left: 0.1em;
  /*color: #6f6f6f;*/
}
.false-color {
  color: #edb338;
}
.true-color {
  color: #004e8c;
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
