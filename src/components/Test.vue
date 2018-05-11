<template>
  <div>
    <h1>test</h1>
    <category-tree :model = "mCategoryTree" v-if="mCategoryTree.root !== undefined"></category-tree>
  </div>
</template>

<script>
  import categoryTreeComp from './CategoryTree'
  import CategoryTree from '@/model/categoryTree/CategoryTree'
  import api from '@/api/api'
export default {
  name: 'Test',
  created () {
    this.getAllMyCategory()
  },
  data() {
    return {
      mCategoryTree: new CategoryTree(),
    }
  },
  methods: {
    getAllMyCategory() {
      console.log('???')
      api.getAllMyCategory()
        .then(  data => {
          this.mCategoryTree.setCategoryList(data)
        })
    }
  },
  components: {
    'category-tree': categoryTreeComp
  },
}
</script>

<style scoped>
.category-root {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
