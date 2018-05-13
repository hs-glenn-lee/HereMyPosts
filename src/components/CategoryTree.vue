<template>
  <div class="category-tree-contatiner">
    <ul class="tree-root">
      <category-node
        class="category-node"
        :categoryNode="categoryTree.root"
      ></category-node>
    </ul>
  </div>
</template>

<script>
  import api from '@/api/api'
  import CategoryTree from '@/model/CategoryTree/CategoryTree'
  import CategoryNode from './CategoryNode'
  export default {
  name: 'CategoryTree',
  mounted() {
    this.getMyCategory()
    console.log(this.categoryTree)
  },
  data() {
    return {
      categoryTree: new CategoryTree()
    }
  },
  methods: {
    getMyCategory() {
      console.log('???');

      api.getAllMyCategory()
        .then(  data => {
          this.categoryTree = new CategoryTree();
          this.categoryTree.setCategoryList(data)
          //this.components["category-tree"] = categoryTreeComp
        })
    }
  },
  components: {
    'category-node': CategoryNode
  }
}
</script>

<style scoped>
.category-root {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
