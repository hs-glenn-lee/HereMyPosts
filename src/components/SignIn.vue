<template>
  <div>
    <main>
      <div class="global-logo">logo</div>
      <h2>로그인</h2>
      <form>
        <input name="username" type="text"/>
        <input name="password" type="password"/>
        <button>로그인</button>
      </form>
      <div class="context-switch">
        <div class="">계정이 없으시면</div>
        <a href="/sign-up">계정 만들기</a>
      </div>
    </main>
  </div>
</template>

<script>

export default {
  name: 'home'
}
</script>

<style scoped>

</style>
