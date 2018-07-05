<template>
  <nav class="left-pane-menu">
    <div class="global-logo"><img src="@/assets/images/logo_height_30px.png"/></div>
    <div class="left-pane-menu-item">NEW</div>
    <div class="left-pane-menu-item">CAT</div>
    <div class="left-pane-menu-item">PUB</div>
    <div class="left-pane-menu-item">SER</div>
    <div class="left-pane-menu-item">TAG</div>
    <div class="left-pane-menu-item">SAVE</div>
    <div class="left-pane-menu-item">SETTINGS</div>
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
.left-pane-menu {
  left: 0;
  width: 60px;

  /**/
  border-right: 1px solid #ececec;
  height: 100%;
  float: left;
  z-index: 200;
  position: absolute;

}
</style>
