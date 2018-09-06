<template>
  <div class="root-container">
    <header class="home-header clearfix">
      <div class="float-left">
        <div @click="goHome" class="global-logo psd-hover-cursor-pointer"><img src="@/assets/images/logo-200w30h.png"/></div>
      </div>
      <div class="float-right">
        <div v-if="!getIsSignedIn" class="link">
          <a href="/sign/sign-in" class="psd-hover-cursor-pointer" >로그인</a>
        </div>
        <div v-else class="link">
          <a @click="goManager" class="psd-hover-cursor-pointer">글 관리</a>
          <a @click="goUserHome" class="psd-hover-cursor-pointer">내 홈</a>
          <a @click="signOut" class="psd-hover-cursor-pointer">로그아웃</a>
        </div>
      </div>
    </header>
    <main>
      <h1 class="hidden">Features</h1>
      <div class="main-content user-select-none">
        <div class="represent" style="background-color: #ececec; margin-top: 64px; padding-top: 32px; margin-bottom: 64px; padding-bottom: 32px;">
          <p>페이퍼타워는 간단한 블로그서비스 입니다.</p>
          <p>아이디어를 글로 남기고, 트리로 분류해보세요.</p>
          <div style="">
            <img style="padding-left: 32px; width: 1080px; margin-top: 48px; display:block; margin-left: auto; margin-right: auto;" id="home_content_pic1" src="../assets/images/home_content_pic1.png"/>
          </div>
          <div style="margin-top: 32px; display: flex; flex-direction: column; align-content: center; align-items: center;">
            <div style="display: flex;">
              <a href="/sign/sign-in" class="psd-hover-cursor-pointer" ><button style="font-size: 2em; background-color: #4a4a4a;" type="button">시작하기</button></a>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 64px;">
            <p style=" text-align: center;">
              <span style="color: #fff; background-color: #cfcfcf; padding: 8px;">계속 개발 중입니다. 원하는 기능이나 개선할 부분이 있다면 이메일로 보내주세요.</span>
            </p>
        </div>

      </div>
    </main>
    <footer-comp></footer-comp>
  </div>
</template>

<script>

  import FooterComp from '@/components/viewer/ViewerFooter.vue'
  import api from '@/api/api'
  import {mapGetters} from 'vuex'
  import {mapActions} from 'vuex'

  export default {
    name: 'Home',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      'footer-comp':  FooterComp
    },
    computed : {
      ...mapGetters([
        'getIsSignedIn',
        'getAccount'
      ])
    },
    methods: {
      ...mapActions([
        'syncSign'
      ]),
      goHome () {
        window.location.href = "/";
      },
      goUserHome () {
        let username = this.getAccount.username;
        let routeData = this.$router.resolve({name:'UserHome', params: {username}})
        window.open(routeData.href, '_self');
      },
      goManager () {
        let username = this.getAccount.username;
        let routeData = this.$router.resolve({name:'Manager', params: {username}})
        window.open(routeData.href, '_self');
      },
      signOut () {
        api.signOut().then( () => {
          window.location.href = "/";
        })
      }
    },
    created () {
      this.syncSign();
    }
  }
</script>

<style scoped>
  header.home-header {
    margin: 10px auto 10px auto;
    clear: both;
    height: 54px;
  }
  header.home-header div {
    height: inherit;
  }
  header div.link a{
    font-size: 1.2em;
    height: inherit;
    vertical-align: middle;
    line-height: 54px;
    margin-left: 32px;
  }

  div.main-content {
    min-height: 600px;
  }

  .represent p {
    font-size: 2em;
    line-height: 2em;
    color: #2a2a2a;
    padding-left: 32px;
  }


</style>
