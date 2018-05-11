<template>
  <div class="category-tree-contatiner">
    <ul class="tree-root">
      <category-node
        class="category-node"
        :model="mCategoryTree.root"
      ></category-node>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryTree',
  props: [
    'mCategoryTree'
  ],
  created() {
    console.log(this.mCategoryTree)
  },
  data() {
    return {
    }
  },
  methods: {
    getAll() {

    }
  }
}
</script>

<style scoped>
.category-root {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
