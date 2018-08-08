<template>
    <ul class="tree-root">
      <category-node
        class="category-node"
        ref="root"
        :categoryNode="categoryTreeRoot"
        :onNodeNameClick="onNodeNameClick"
        :onNodeNameRightClick="onNodeNameRightClick"
      ></category-node>
    </ul>
</template>

<script>
  import CategoryNode from './CategoryNode'
  import {mapActions} from 'vuex';
  import { mapGetters } from 'vuex'
  export default {
  name: 'CategoryTreeComp',
  props: {  //CategoryTree Must set these function before
    onNodeNameClick: Function,
    onNodeNameRightClick: Function,
    categoryTreeRoot: Object,
    selectedNode: Object
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
      this.$refs.root.openMe();
      this.$refs.root.openChildren();
    },
    closeAllCategoryNodes () {
      this.$refs.root.closeMe();
      this.$refs.root.closeChildren();
    },
    markSelectedNode(newNode, oldNode) {
      if(oldNode) {
        const oldNodeQuery = '#'+oldNode.id;
        var $oldNode = window.document.querySelector(oldNodeQuery);
        if(oldNode) {
          $oldNode.classList.remove('selected');
        }
      }

      const newNodeQuery = '#'+newNode.id;
      var $newNode = window.document.querySelector(newNodeQuery);
      $newNode.classList.add('selected');
    },
  },
  watch: {
    selectedNode: function(val,oldVal) {
      this.markSelectedNode(val,oldVal);
    }
  },
  computed: {
    ...mapGetters([

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
  ul.tree-root {
    margin-top: 16px;
  }

</style>
