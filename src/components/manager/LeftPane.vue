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
  methods: {
    ...mapActions([
      'getMyAccount'
    ])
  }*/
}
</script>

<style scoped>
.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
