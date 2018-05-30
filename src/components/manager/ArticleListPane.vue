<template>
  <div class="article-list-pane"
       v-show="isArticleListPaneShowing">
    <ul class="article-list">
      <li v-if="isArticleListEmpty">
        <span>empty</span>
      </li>
      <li v-for="article in getArticleList"
          :key="article.id"
          class="article-list-item">
        <span class="article-title"
          @click="onArticleTitleClick"
          @click.double="onArticleTitleDoubleClick">{{article.title}}</span>
      </li>
    </ul>


  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'CategorySubLeftPaneComp',
  props: {
    onArticleTitleClick:  Function,
    onArticleTitleDoubleClick: Function
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'getArticleList',
      'isArticleListEmpty',
      'isArticleListPaneShowing'
    ])
  },
  methods: {


  }
}
</script>

<style scoped>
  div.article-list-pane {
    position: absolute; left: 400px; top: 0px; right: 0px; bottom: 0px;
    width: 400px;
    border-right: 2px solid #eaeaea;
    border-left: 2px solid #ececec;
    background-color: white;
    z-index: 199;
  }
  ul.article-list {
    margin-top: 50px;
  }
  li.article-list-item {
    width: 380px;
    padding: 3px 5px 3px 5px;
    border: 1px solid black;
  }
  span.article-title {
    font-size: 20px;
  }
</style>
