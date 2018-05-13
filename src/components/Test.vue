<template>
  <div>
    <h1>test</h1>
    <!--<button @click="getAllMyCategory" type="button" value="test">test</button>-->
    <category-tree></category-tree>
  </div>
</template>

<script>
  import categoryTreeComp from './CategoryTree'
  export default {
    name: 'Test',
    data() {
      return {

      }
    },
    methods: {

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
