<template>
  <div class="manager">
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
  </div>
</template>

<script>
import CategoryNode from '@/model/CategoryTree/CategoryNode'
import CategoryTree from '@/model/CategoryTree/CategoryTree'

export default {
  name: 'Manage'

}
</script>

<style scoped>
/*.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}*/

</style>
