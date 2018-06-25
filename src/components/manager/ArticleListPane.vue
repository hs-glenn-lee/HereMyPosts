<template>
  <div class="article-list-pane"
       v-show="isArticleListPaneShowing">
    <div class="article-list-pane-header">
      <span class="article-list-pane-title">{{this.getSelectedNode.name}} 의 글 목록</span>
    </div>
    <div class="list-height" :style="getListHeight">
      <div class="article-list-wrapper">
        <ul class="article-list">
          <li v-if="isArticleListEmpty">
            <span>empty</span>
          </li>
          <li v-for="article in getArticleList"
              :key="article.id"
              class="article-list-item">
            <div class="article-title">
              <span class="article-title"
                    v-bind:id="article.id"
                    @click="onArticleTitleClick"
                    @click.double="onArticleTitleDoubleClick">{{article.title}}</span>
            </div>
            <div class="article-create-timestamp">
              <span class="article-create-timestamp">{{article.createTimestamp}}</span>
            </div>
            <div class="article-summary">
              <span class="article-summary">{{article.summary}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

export default {
  name: 'CategorySubLeftPaneComp',
  props: {
    onArticleTitleClick:  Function,
    onArticleTitleDoubleClick: Function
  },
  data () {
    return {
      listHeight: ''
    }
  },
  computed: {
    ...mapGetters([
      'getArticleList',
      'isArticleListEmpty',
      'isArticleListPaneShowing',
      'getSelectedNode'
    ]),
    getListHeight () {
      console.log(this.listHeight);
      return this.listHeight;
    }
  },
  methods: {
    ...mapMutations([
      'setFocusedVueCompName'
    ]),
    calcListHeight() {
      console.log('listHeight');
      let header = window.document.querySelector('div.article-list-pane-header');
      let headerHeight = header.offsetHeight;
      let innerHeight = window.innerHeight;

      console.log(header)
      console.log(headerHeight)
      console.log(innerHeight - headerHeight)

      this.listHeight = 'height:' + (innerHeight - headerHeight) + 'px;';
    }
  },
  mounted() {
    this.calcListHeight();
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
    height:100%;
  }

  div.article-list-pane-header {
    height:21px;
    padding: 20px 0px 20px 20px;
  }
  span.article-list-pane-title {
    color: #6A6A6A;
    font-size: 1.3em;
  }

  div.article-list-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    height:100%;
  }

  ul.article-list {

  }

  li.article-list-item {
    width: 98%;
    padding: 3px 5px 3px 5px;
    border-top: 1px solid #cccccc;
  }

  div.article-title {
    padding: 10px 0px 5px 5px;
    font-size: 20px;
  }

  div.article-create-timestamp {
    padding: 1px 0px 5px 5px;
    font-size: 0.5em;
    color: #6A6A6A;
  }
  div.article-summary {
    padding: 5px 0px 10px 5px;
    color: #6A6A6A;
  }

  ul > li.article-list-item:first-child {
    border-top: 1px solid #cccccc;
  }

</style>
