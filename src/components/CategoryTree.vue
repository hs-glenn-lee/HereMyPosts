<template>
  <div class="category-tree-container">
    <ul class="tree-root">
      <category-node
        class="category-node"
        :categoryNode="getCategoryTreeRoot"
        :onNodeNameClick="onNodeNameClick"
        :onNodeNameRightClick="onNodeNameRightClick"
      ></category-node>
    </ul>
  </div>
</template>

<script>
  import CategoryNode from './CategoryNode'
  import {mapActions} from 'vuex';
  import { mapGetters } from 'vuex'
  export default {
  name: 'CategoryTreeComp',
  props: {  //CategoryTree Must set these function before
    onNodeNameClick: Function,
    onNodeNameRightClick: Function
  },
  mounted() {
    this.initCategoryTree()
  },
  data() {
    return {

    }
  },
  methods: {
    ...mapActions([
      'isCategoryTreeInitialized',
      'initCategoryTree'
    ]),
    findNodeElement (id) {

    }

  },
  computed: {
    ...mapGetters([
      'getCategoryTreeRoot'
    ]),
  },
  components: {
    'category-node': CategoryNode
  }
}
</script>

<style scoped>

</style>
