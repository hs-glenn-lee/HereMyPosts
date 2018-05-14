<template>
  <div class="manager">
    <left-pane></left-pane>
    <editor></editor>
  </div>

</template>

<script>
import editorComp from './Editor'
import leftPaneComp from './LeftPane'
export default {
  name: 'Manage',
  components: {
    'editor': editorComp,
    'left-pane': leftPaneComp
  }
}
</script>

<style scoped>
/*.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}*/

</style>
