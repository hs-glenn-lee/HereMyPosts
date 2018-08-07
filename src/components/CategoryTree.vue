<template>
    <ul class="tree-root">
      <category-node
        class="category-node"
        ref="root"
        :categoryNode="getCategoryTreeRoot"
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
    onNodeNameRightClick: Function
  },
  mounted() {

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
  ,mounted () {
    console.log('eeeee')
    console.log(this.getCategoryTreeRoot)
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
