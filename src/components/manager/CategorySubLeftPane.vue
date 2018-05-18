<template>
  <div class="sub-left-pane" v-show="getCategorySubLeftPaneIsShow">
      <div class="close-icon" @click="closeCSLP(false)">
        <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
      </div>

      <div class="category-container">
        <category-tree-comp></category-tree-comp>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import categoryTreeComp from '@/components/CategoryTree.vue'
export default {
  name: 'CategorySubLeftPaneComp',
  components: {
    'category-tree-comp': categoryTreeComp
  },
  methods: {
    ...mapMutations([
      'setCategorySubLeftPaneIsShow'
    ]),
    closeCSLP () {
      this.setCategorySubLeftPaneIsShow(false)
    }
  },
  computed: {
    ...mapGetters([
      'getCategorySubLeftPaneIsShow'
    ])
  }
}
</script>

<style scoped>
  div.sub-left-pane {
    position: absolute; left: 73px; top: 0px; right: 0px; bottom: 0px;
    width: 300px;
    border-right: 2px solid #eaeaea;
    border-left: 2px solid #ececec;
    background-color: white;
    z-index: 199;
  }
  div.close-icon {
    float:right;
    margin-right: 10px;
    margin-top: 10px;
    opacity: 0.7;

  }
  div.close-icon:hover {
    cursor: pointer;
  }
  div.category-container {
    margin-top: 70px;
  }

</style>
