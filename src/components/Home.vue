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
          <a @click="goUserHome" class="psd-hover-cursor-pointer">사용자 홈</a>
        </div>
      </div>
    </header>
    <main>
      <h1 class="hidden">Features</h1>
      <div class="main-content">

      </div>
    </main>
    <footer-comp></footer-comp>
  </div>
</template>

<script>

  import FooterComp from '@/components/viewer/ViewerFooter.vue'
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
</style>
