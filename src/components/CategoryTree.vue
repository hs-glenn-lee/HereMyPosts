<template>
  <div class="category-tree-container">
    <ul class="tree-root">
      <category-node
        class="category-node"
        ref="root"
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
   // this.initCategoryTree()
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

    },
    openAllCategoryNodes () {
      console.log('openAllCategoryNodes')
      console.log(this.$refs.root)
      this.$refs.root.openMe();
      this.$refs.root.openChildren();
    },
    closeAllCategoryNodes () {
      this.$refs.root.closeMe();
      this.$refs.root.closeChildren();
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
  ul.tree-root > li:first-child{
    margin-left: 16px;
  }
  div.category-tree-container {
    margin-top: 16px;
  }
</style>
