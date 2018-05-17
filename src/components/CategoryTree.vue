<template>
  <div class="category-tree-container">
    <ul class="tree-root">
      <category-node
        class="category-node"
        :categoryNode="getCategoryTreeRoot"
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
    ])

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
