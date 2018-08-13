<template>
  <div class="root-container">
    <header class="home-header clearfix">
      <div class="float-left">
        <div class="global-logo"><img src="@/assets/images/logo-200w30h.png"/></div>
      </div>
      <div class="float-right">
        <div class="link">
          <a href="/sign/sign-in">로그인</a>
        </div>
      </div>
    </header>
    <main>
      <h1 class="hidden">Features</h1>
      <div>
        개발자가 쓰기에 쉽고 편한 블로그
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
  }
</style>
