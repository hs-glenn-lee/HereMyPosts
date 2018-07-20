<template>
  <div class="category-pane"
       v-show="isCategoryPaneShowing"
        @click.right="function(e){e.preventDefault()}"
        @click="markPass('CategoryPane')"><!--prevent leftClick-->

      <div class="pane-header">
        <span class="pane-header-title">카테고리</span>
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
<!--      <div class="close-icon psd-hover-cursor-pointer" @click="closeCSLP(false)">
        <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
      </div>-->


      <div class="category-container">
        <category-tree-comp
          ref="$categoryTreeComp"
          :onNodeNameRightClick="onNodeNameRightClick"
          :onNodeNameClick="onNodeNameClick"></category-tree-comp>
      </div>

      <c-node-right-click-menu
        v-bind:is="rightClickMenu"
        v-if="isRightClickMenuShowing"
        @newCategoryCreated="setIsRightClickMenuShowing(false)"
        :category-node="rightClickedCategoryNode"
        :top="rightClickedTop"
        :left="rightClickedLeft">
      </c-node-right-click-menu>

      <div>
        <article-list-pane :onArticleClick="onArticleClick"
                           :onArticleDoubleClick="onArticleDoubleClick"></article-list-pane>
      </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import categoryTreeComp from '@/components/CategoryTree.vue'
import CNodeRightClickMenu from "./CategoryNodeRightClickMenu";
import emptyComp from '@/components/Empty.vue';
import ArticleListPane from '@/components/manager/ArticleListPane';

export default {
  name: 'CategoryPane',
  data () {
    return {
      rightClickMenu: '',
      rightClickedCategoryNode: '',
      rightClickedTop: '',
      rightClickedLeft: ''
    }
  },
  components: {
    'c-node-right-click-menu': CNodeRightClickMenu,
    'category-tree-comp': categoryTreeComp,
    'empty-comp': emptyComp,
    'article-list-pane': ArticleListPane
  },
  methods: {
    ...mapMutations([
      'setCategoryPaneIsShowing',
      'setSelectedNodeById',
      'setArticleListPaneShowing',
      'setIsRightClickMenuShowing',
    ]),
    ...mapActions([
      'getArticlesOfCategory',
      'markPass',
      'loadSavedArticle'
    ]),
    closeCSLP () {
      this.setCategoryPaneIsShowing(false)
    },

    //categoryTree props
    onNodeNameRightClick (clickEvent) {
      clickEvent.preventDefault();
      clickEvent.stopPropagation();
      var clickedNodeNameSpan = clickEvent.currentTarget;

      var nodeId = clickedNodeNameSpan.parentElement.parentElement.id;
      var targetNode = this.getCategoryTree.find(nodeId);
      console.log('%%%%%')
      console.log('id '+ nodeId);
      console.log(targetNode);

      this.rightClickedTop = clickEvent.pageY;
      this.rightClickedLeft = clickEvent.pageX - 70; // i don't know why this need to sub 70
      this.rightClickedCategoryNode = targetNode;
      this.rightClickMenu = 'c-node-right-click-menu';

      //if menu position-y is to low(too big) to show whole menu.
      var categoryPane = window.document.querySelector('div.category-pane');
      if(categoryPane) {
        var categoryPaneHeight = categoryPane.offsetHeight;
        var menuHeight = 106; //set hard
        var curTop = (this.rightClickedTop);
        var lack = (curTop + menuHeight) - categoryPaneHeight;
        if( lack > 0 ) {
          this.rightClickedTop -= (lack + 5 /*just little space*/);
        }
      }



      this.setIsRightClickMenuShowing(true)
    },
    onNodeNameClick(clickEvent) {
      var clickedNodeNameSpan = clickEvent.currentTarget;
      this.setSelectedNodeById(clickedNodeNameSpan.parentElement.parentElement.id)
      this.getArticlesOfCategory(clickedNodeNameSpan.parentElement.parentElement.id)
      this.setArticleListPaneShowing(true);
    },

    onArticleClick(event) {

    },
    onArticleDoubleClick(event) {
      var articleId = event.currentTarget.id;
      this.loadSavedArticle(articleId);
    },

    openAllCategoryNodes () {
      this.$refs.$categoryTreeComp.openAllCategoryNodes();
    },
    closeAllCategoryNodes () {
      this.$refs.$categoryTreeComp.closeAllCategoryNodes();
    }


  },
  computed: {
    ...mapGetters([
      'isCategoryPaneShowing',
      'getCategoryTree',
      'getAccount',
      'isRightClickMenuShowing'
    ])
  }
}
</script>

<style scoped>
  div.category-pane {
    position: absolute; left: 60px; top: 0px; right: 0px; bottom: 0px;
    width: 800px;
    border-right: 2px solid #eaeaea;
    border-left: 2px solid #ececec;
    background-color: white;
    z-index: 199;
  }
  div.pane-header {
    padding-top: 16px;
    padding-bottom: 8px;
    height: 40px;
    line-height: 40px;
  }
  span.pane-header-title {
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

  div.category-container {
    margin-top: 16px;
  }

</style>
