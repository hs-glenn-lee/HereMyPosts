<template>
  <div class="sub-left-pane">
      <button class="close">x</button>
      <category-tree-comp></category-tree-comp>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import categoryTreeComp from '@/components/CategoryTree.vue'
export default {
  name: 'CategorySubLeftPaneComp',
  components: {
    'category-tree-comp': categoryTreeComp
  }
}
</script>

<style scoped>
  div.sub-left-pane {
    position: absolute; left: 73px; top: 0px; right: 0px; bottom: 0px;
    width: 300px;
    background-color: white;
    border-right: 1px solid #ececec;
    z-index: 199;
  }
</style>
