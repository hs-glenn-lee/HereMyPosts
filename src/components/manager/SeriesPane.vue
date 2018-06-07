<template>
  <div class="series-pane"
       v-show="isSeriesPaneShowing"
       @click.right="function(e){e.preventDefault()}"
       @click="markPass('SeriesPane')">
    <div class="close-icon" @click="closeSeriesPane(false)">
      <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
    </div>

    <div class="series-list-container">
      <series-list :onNodeNameRightClick="onSeriesNameRightClick"
                   :onNodeNameClick="onSeriesNameClick"></series-list>
    </div>

   <!-- <c-node-right-click-menu v-bind:is="rightClickMenu"
                             :category-node="rightClickedCategoryNode"
                             :top="rightClickedTop"
                             :left="rightClickedLeft">
    </c-node-right-click-menu>-->

    <div>
      <article-list-pane :onArticleTitleClick="onArticleTitleClick"
                         :onArticleTitleDoubleClick="onArticleTitleDoubleClick"></article-list-pane>
    </div>
  </div>
</template>

<script>
  import SeriesList from '@/components/series/SeriesList.vue';
  import ArticleListPane from '@/components/manager/ArticleListPane.vue'
  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';

  export default {
    name: "SeriesPane",
    methods: {
      ...mapActions([
        'markPass'
      ]),
      ...mapMutations([
        'setIsSeriesPaneShowing'
      ]),
      onSeriesNameRightClick (event) {

      },
      onSeriesNameClick (event) {

      },
      onArticleTitleClick(event) {

      },
      onArticleTitleDoubleClick(event) {

      },
      closeSeriesPane(event) {
        this.setIsSeriesPaneShowing(false)
      }
    },
    computed: {
      ...mapGetters([
        'isSeriesPaneShowing'
      ])
    },
    components: {
      'series-list': SeriesList,
      'article-list-pane': ArticleListPane
    }
  }
</script>

<style scoped>
  div.series-pane {
    position: absolute; left: 73px; top: 0px; right: 0px; bottom: 0px;
    width: 400px;
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
  div.series-list-container {
    margin-top: 70px;
  }
</style>
