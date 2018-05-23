<template>
  <div class="root-container center-block">
    <main>
      <div class="heading">
        <div class="global-logo"><img src="@/assets/images/logo_height_52px.png"/></div>
        <h2>로그인 하기</h2>
      </div>
      <form>
        <div>
          <p :class="{'alert-message': isFail}">{{alertMessage}}</p>
        </div>
        <div class="text-input-wrapper">
          <input v-model="username"
                 v-on:keyup.enter="signInGoToManage"
                 name="username"
                 type="text"
                 placeholder="사용자명"/>
        </div>
        <div class="text-input-wrapper">
          <input v-model="password"
                 v-on:keyup.enter="signInGoToManage"
                 name="password"
                 placeholder="비밀번호"
                 type="password"/>
        </div>
        <div class="button-wrapper">
          <button type="button" @click="signInGoToManage">로그인</button>
        </div>
      </form>
      <div class="context-switch">
        <div class="tip-text">계정이 없으세요?</div>
        <a href="/sign-up">계정 만들기</a>
      </div>
      <!--<button @click="isUniqueNewUsername">test</button>-->
    </main>
  </div>
</template>

<script>
import api from '@/api/api';
import { mapMutations } from 'vuex';
export default {
  name: 'SignIn',
  data() {
    return {
      'username': '',
      'password': '',
      alertMessage: '아이디와 비밀번호를 입력하세요',
      isFail: false
    }
  },
  mounted () {
    document.querySelector('html').style.backgroundColor = '#f3f3f3'
  },
  methods: {
    ...mapMutations([
      'setSign'
    ]),
    signInGoToManage() {
      api.signIn({
        username: this.username,
        password: this.password
      })
        .then(data => {
          var sign =  {
            account: data,
            isSignedIn: true
          };
          this.setSign(sign);
          this.$router.push({ path: "/manage"})
        })
        .catch(message => {
          this.alertMessage = '! ' + message
          this.isFail = true;
        })
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
  max-height: 350px;
  padding-top: 30px;
  padding-bottom: 30px;
  border: 1px solid #e5e5e5;
}
div.text-input-wrapper {
  margin: 1.5em 0px 1.5em 0px;
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

p.alert-message {
  color: red;
}
</style>
