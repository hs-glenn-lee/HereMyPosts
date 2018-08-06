<template>
  <footer class="viewer-footer">
    <p><span>이용약관 </span><span>개인정보취급방침</span></p>
    <div class="context-switch"></div>
    <p><span>Developer Heesoo Lee, E-mail lheesoo89@gmail.com</span></p>
    <p><span>ⓒHeesoo Lee, All Rights Reserved.</span></p>
  </footer>
</template>

<script>
  export default {
    name: "ViewerFooterComp"
  }
</script>

<style scoped>
  footer.viewer-footer {
    font-size: 0.7em;
    color: #5a5a5a;
  }
  footer.viewer-footer > p {
    line-height: 1.2;
  }
  div.context-switch {
    border-bottom: 1px solid #c4c4c4;
    margin-top: 2px;
    margin-bottom: 2px;
  }
</style>
