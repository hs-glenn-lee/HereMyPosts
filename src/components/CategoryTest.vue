<template>
  <div class="manager">
    <category-tree></category-tree>
  </div>
</template>

<script>
import CategoryTree from './CategoryTest'
export default {
  name: 'Manage',
  components: {
    'category-tree': CategoryTree
  }
}
</script>

<style scoped>
.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
