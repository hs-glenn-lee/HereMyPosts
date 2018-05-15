<template>
  <div class="manager">
    <left-pane></left-pane>
    <right-pane></right-pane>
  </div>

</template>

<script>

import leftPaneComp from './LeftPane'
import rightPaneComp from './RightPane'
export default {
  name: 'Manage',
  components: {
    'left-pane': leftPaneComp,
    'right-pane': rightPaneComp
  }
}
</script>

<style scoped>
.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
  overflow: hidden;
}
</style>
