<template>
  <nav class="left-pane">
    <div class="global-logo"><img src="@/assets/images/logo_height_30px.png"/></div>
    <div class="left-pane-item">NEW</div>
    <div class="left-pane-item">CAT</div>
    <div class="left-pane-item">PUB</div>
    <div class="left-pane-item">SER</div>
    <div class="left-pane-item">TAG</div>
    <div class="left-pane-item">SAVE</div>
    <div class="left-pane-item">SETTINGS</div>
  </nav>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Manage'/*,
  methods: {    ...mapActions([
      'getMyAccount'
    ])
  }*/
}
</script>

<style scoped>
.left-pane {
  left: 0;
  width: 73px;

  /**/
  border-right: 1px solid #ececec;
  height: 100%;
  float: left;
  z-index: 200;
  position: absolute;

}
</style>
