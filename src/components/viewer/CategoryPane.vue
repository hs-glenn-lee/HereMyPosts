<template>
  <div class="category-pane"
       v-show="isCategoryPaneShowing"
        @click.right="function(e){e.preventDefault()}"
        @click="markPass('CategoryPane')"><!--prevent leftClick-->

    <div class="col category-col">
      <div class="category-info"><!-- todo -->
        <div class="category-header">
          <span class="category-header-title">카테고리</span>
        </div>
        <div class="tool-bar">
          <div class="tool-bar-buttons">
          <span
            @click="openAllCategoryNodes"
            class="sort-controller-button psd-hover-cursor-pointer">펼치기</span>
            <span
              @click="closeAllCategoryNodes"
              class="sort-controller-button psd-hover-cursor-pointer">접기</span>
          </div>
        </div>

      </div>

      <div class="category-tree-container"
          :style="categoryTreeContainerStyle">
        <category-tree-comp
          ref="$categoryTreeComp"
          :categoryTreeRoot="getCategoryTreeRoot"
          :selectedNode="getSelectedNode"
          :onNodeNameRightClick="onNodeNameRightClick"
          :onNodeNameClick="onNodeNameClick">
        </category-tree-comp>
      </div>


    </div>

    <div class="col">
      <div>
        <article-list-pane :onArticleClick="onArticleClick"
                           :onArticleDoubleClick="onArticleDoubleClick"></article-list-pane>
      </div>
    </div>

    <div class="clearfix"></div>

  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';

import categoryTreeComp from '@/components/CategoryTree.vue'
import emptyComp from '@/components/Empty.vue';
import ArticleListPane from './ArticleListPane';

export default {
  name: 'CategoryPane',
  data () {
    return {
      categoryTreeHeight: 0
    }
  },
  components: {
    'category-tree-comp': categoryTreeComp,
    'empty-comp': emptyComp,
    'article-list-pane': ArticleListPane
  },
  methods: {
    ...mapMutations([
      'setCategoryPaneIsShowing',
      'setArticleListPaneShowing',
    ]),

    ...mapActions([

    ]),
    ...mapActions('viewer',[
      'markPass'
    ]),
    ...mapMutations('viewer/categoryTree',[
      'setSelectedNodeById',
    ]),
    ...mapActions('viewer/article',[
      'loadPublicArticle'
    ]),
    ...mapActions('viewer/articleList',[
      'getPublicArticlesOfCategory',
    ]),

    closeCSLP () {
      this.setCategoryPaneIsShowing(false)
    },

    //categoryTree props
    onNodeNameRightClick (clickEvent) {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      return;
    },
    onNodeNameClick(clickEvent) {
      var clickedNodeNameSpan = clickEvent.currentTarget;

      let nodeFound = this.findCategoryNode(clickedNodeNameSpan.parentElement.parentElement.id);
      console.log(nodeFound)
      if(!nodeFound.isPublic) {
        return;
      }
      let username = this.$router.currentRoute.params.username;
      this.setSelectedNodeById(clickedNodeNameSpan.parentElement.parentElement.id)
      this.getPublicArticlesOfCategory({username: username, categoryId: clickedNodeNameSpan.parentElement.parentElement.id});
      this.setArticleListPaneShowing(true);
    },

    onArticleClick(event) {
      var articleId = event.currentTarget.id;
      var $route = this.$route;
      this.$router.push({name:'Viewer', params: {username:$route.params.username, articleId: articleId}});
      this.setCategoryPaneIsShowing(false)
    },
    onArticleDoubleClick(event) {
      var articleId = event.currentTarget.id;
      var $route = this.$route;
      this.$router.push({name:'Viewer', params: {username:$route.params.username, articleId: articleId}});
      this.setCategoryPaneIsShowing(false)
    },

    openAllCategoryNodes () {
      this.$refs.$categoryTreeComp.openAllCategoryNodes();
    },
    closeAllCategoryNodes () {
      this.$refs.$categoryTreeComp.closeAllCategoryNodes();
    },
    getViewerHeight () {
      var $manager = window.document.querySelector('div.viewer');
      return $manager.offsetHeight;
    },
    getCategoryInfoHeight () {
      var $categoryInfo = window.document.querySelector('div.category-info');
      return $categoryInfo.offsetHeight;
    },
    setCategoryTreeHeight () {
      this.categoryTreeHeight = ( this.getViewerHeight() - this.getCategoryInfoHeight() );
    }


  },
  mounted () {
    var vm = this;
    window.addEventListener("resize", function() {
      vm.setCategoryTreeHeight();
    });
  },
  computed: {
    ...mapGetters([
      'isCategoryPaneShowing'
    ]),
    ...mapGetters('viewer/categoryTree',[
      'getCategoryTree',
      'getCategoryTreeRoot',
      'getSelectedNode',
      'findCategoryNode'
    ]),
    categoryTreeContainerStyle () {
      return {
        'height': this.categoryTreeHeight + 'px'
      }
    }
  },
  watch: {
    isCategoryPaneShowing (val, oldVal) {
      if(val) {
        this.$nextTick(() => {
          this.setCategoryTreeHeight();
        })
      }
    }
  }
}
</script>

<style scoped>
  div.category-pane {
    position: absolute; left: 60px; top: 0px; right: 0px; bottom: 0px;
    height: 100%;
    border-right: 2px solid #eaeaea;
    border-left: 2px solid #ececec;
    background-color: white;
    width:862px;
    z-index: 199;
  }

  div.col {
    float: left;
  }

  div.category-col {
    min-width: 400px;
  }

  div.category-tree-container {
    overflow-y: scroll;
    overflow-x: scroll;
    width: 460px;
  }

  div.category-header {
    padding-top: 16px;
    padding-bottom: 8px;
    height: 40px;
    line-height: 40px;
  }
  span.category-header-title {
    color: #6A6A6A;
    /*color: white;*/
    padding-left: 16px;
    font-size: 1.3em;
  }

  div.close-icon {
    position: absolute;
    opacity: 0.7;
    display: inline-block;
    top: 21px;
    right: 10px;
  }


  div.tool-bar {
    background-color: #f8f8f8;
    height: 28px;
    line-height: 28px;
  }

  div.tool-bar-buttons {
    padding-left: 16px;
  }

  span.sort-controller-button {
    margin: 1px 2px 1px 0px;
    padding: 2px 3px 2px 2px;

    border: 1px solid #f8f8f8;
    background-color: #f8f8f8;

    font-size: 14px;
  }
  span.sort-controller-button:hover {
    background-color: #eaeaea;
    border: 1px solid rgb(16,123,211);
  }

</style>
