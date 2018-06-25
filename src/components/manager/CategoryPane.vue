<template>
  <div class="category-pane"
       v-show="isCategoryPaneShowing"
        @click.right="function(e){e.preventDefault()}"
        @click="markPass('CategoryPane')"><!--prevent leftClick-->

      <div class="pane-header">
        <span class="pane-header-title">카테고리</span>
      </div>
      <div class="close-icon" @click="closeCSLP(false)">
        <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
      </div>


      <div class="category-container">
        <category-tree-comp :onNodeNameRightClick="onNodeNameRightClick"
                            :onNodeNameClick="onNodeNameClick"></category-tree-comp>
      </div>

      <c-node-right-click-menu v-bind:is="rightClickMenu"
                               :category-node="rightClickedCategoryNode"
                                :top="rightClickedTop"
                                :left="rightClickedLeft">
      </c-node-right-click-menu>

      <div>
        <article-list-pane :onArticleTitleClick="onArticleTitleClick"
                           :onArticleTitleDoubleClick="onArticleTitleDoubleClick"></article-list-pane>
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
      'setSelectedNode'
    ]),
    ...mapActions([
      'getArticlesOfCategory',
      'markPass',
      'initManager'
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

      this.rightClickedTop = clickEvent.pageY;
      this.rightClickedLeft = clickEvent.pageX - 70; // i don't know why this need sub 70
      this.rightClickedCategoryNode = targetNode;
      this.rightClickMenu = 'c-node-right-click-menu';

    },
    onNodeNameClick(clickEvent) {
      var clickedNodeNameSpan = clickEvent.currentTarget;
      this.setSelectedNode(clickedNodeNameSpan.parentElement.parentElement.id)
      this.getArticlesOfCategory(clickedNodeNameSpan.parentElement.parentElement.id)
    },

    onArticleTitleClick(event) {

    },
    onArticleTitleDoubleClick(event) {
      var articleId = event.currentTarget.id;
      let account = this.getAccount;
      this.$router.push({
        name: "ManagerSavedArticle",
        params: { 'username': account.username, 'articleId': articleId }
      });
      this.initManager(articleId);
    }

  },
  computed: {
    ...mapGetters([
      'isCategoryPaneShowing',
      'getCategoryTree',
      'getAccount'
    ])
  }
}
</script>

<style scoped>
  div.category-pane {
    position: absolute; left: 73px; top: 0px; right: 0px; bottom: 0px;
    width: 400px;
    border-right: 2px solid #eaeaea;
    border-left: 2px solid #ececec;
    background-color: white;
    z-index: 199;
  }
  div.pane-header {
    margin: 30px 0px 20px 20px;
  }
  span.pane-header-title {
    color: #6A6A6A;
    font-size: 1.3em;
  }
  div.close-icon {
    position: absolute;
    opacity: 0.7;
    display: inline-block;
    top: 18px;
    right: 18px;
  }
  div.close-icon:hover {
    cursor: pointer;
  }
  div.category-container {

  }

</style>
