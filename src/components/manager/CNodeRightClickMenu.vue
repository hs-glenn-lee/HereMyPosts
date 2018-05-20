<template>
  <div class="rc-click-menu">
    <div>이 카테고리를 ...</div>
    <ul>
      <li>새 카테고리</li>
      <li>이 카테고리 삭제</li>
      <li>공개여부 변경</li>
    </ul>
  </div>
</template>

<script>

  export default {
    name: 'CNodeRightClickMenu',
    props: [
      'categoryNode'
    ],
    methods: {

    }

  }
</script>

<style scoped>

</style>
