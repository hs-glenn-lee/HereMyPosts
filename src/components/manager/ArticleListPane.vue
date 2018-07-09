<template>
  <div class="article-list-pane"
      v-show="isArticleListPaneShowing">
    <div class="loading" :class="{'showing': isManagerLoading }">
      <img class="loading-img"
           :style="getLoadingImgStyle"
           src="@/assets/images/loading.gif">
    </div>
    <div class="not-list">

      <div class="article-list-pane-header">
        <span class="article-list-pane-title" v-if="this.getListOf === 'category'">{{this.getSelectedNode.name}} 글 목록</span>
        <span class="article-list-pane-title" v-if="this.getListOf === 'recent'" >최근 글</span>
      </div>

      <div v-if="getListOf === 'category'" class="tool-bar">
        <div class="tool-input">
          <div class="tool-buttons">
            <span class="tool-button"
                  :class="{'selected': (getSortProperty==='updateTimestamp')}"
                  @click="setSortProperty('updateTimestamp')">날짜</span>
            <span class="tool-button"
                  :class="{'selected': (getSortProperty==='title')}"
                  @click="setSortProperty('title')">제목</span>
            <span class="tool-button"
                  :class="{'selected': (getSortDirection==='asc')}"
                  @click="setSortDirection('asc')">asc</span>
            <span class="tool-button"
                  :class="{'selected': (getSortDirection==='desc')}"
                  @click="setSortDirection('desc')">desc</span>
            <span class="tool-button go-recent-button"
                  @click="getRecentArticles(0)">최근 글</span>
          </div>
          <div class="title-search-input">
            <label>제목</label>
            <input ref="searchWord" v-on:keyup="inputSearchWord" class="search-word" type="text">
          </div>
        </div>
      </div>

    </div>

    <div class="list-height" :style="getListHeight">
      <div class="article-list-wrapper">
        <ul class="article-list">
          <li v-if="isArticleListEmpty">
            <div class="empty-list-item">
              <label class="empty-list-label">비어 있음</label>
            </div>

          </li>
          <li v-for="article in getArticleList"
              :key="article.id"
              class="article-list-item">
            <div class="article-list-item-wrapper">
              <div class="article-title">
              <span class="article-title"
                    v-bind:id="article.id"
                    @click="onArticleTitleClick"
                    @click.double="onArticleTitleDoubleClick">{{article.title}}</span>
              </div>
              <div class="article-create-timestamp">
                <span v-if="(article.updateDateString)" class="article-create-timestamp">{{article.updateDateString}}</span>
              </div>
              <div class="article-summary">
                <span class="article-summary">{{article.summary}}</span>
              </div>
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
import { mapActions } from 'vuex';

export default {
  name: 'CategorySubLeftPaneComp',
  props: {
    onArticleTitleClick:  Function,
    onArticleTitleDoubleClick: Function
  },
  data () {
    return {
      listHeight: '',
      notListHeight: 0,
      windowInnerHeight: 0,
      loadingImgPaddingTop: 0
    }
  },
  computed: {
    ...mapGetters([
      'getArticleList',
      'isArticleListEmpty',
      'isArticleListPaneShowing',
      'getSelectedNode',
      'isManagerLoading',
      'getListOf',
      'getSortDirection',
      'getSortProperty'
    ]),
    getListHeight () {
      return this.listHeight;
    },
    getLoadingImgStyle () {
      return {'padding-top': this.loadingImgPaddingTop + 'px'};
    }
  },
  methods: {
    ...mapMutations([
      'setFocusedVueCompName',
      'setSortProperty',
      'setSortDirection',
      'setSearchWord'
    ]),
    ...mapActions([
      'getRecentArticles'
    ]),
    calcListHeight() {
      let notList = window.document.querySelector('div.not-list');
      console.log('notList');

      let notListHeight = notList.offsetHeight;
      console.log(notListHeight)

      this.innerHeight = window.innerHeight;
      this.listHeight = 'height:' + (this.innerHeight - notListHeight - 2/*border px*/) + 'px;';
    },
    calcLoadingImgPaddingTop () {
      let loadingDivHeight = window.document.querySelector('div.article-list-pane');
      this.loadingImgPaddingTop = (loadingDivHeight.clientHeight/2) - 120 /*loading img height*/;
    },
    inputSearchWord() {
      var searchWord = this.$refs.searchWord.value;
      this.setSearchWord(searchWord)
    }

  },
  watch: {
    windowInnerHeight (val,oldVal) {
      if(val !== oldVal) {
        this.calcListHeight();
      }
    },
    getListOf (val,oldVal) {
      if(val !== oldVal) {
        this.calcListHeight();
      }
    }
  },
  mounted() {
    this.calcListHeight();
    this.calcLoadingImgPaddingTop();
    var vm = this;
    window.onresize = function(event) {
      vm.windowInnerHeight = window.innerHeight;
    };
  }
}
</script>

<style scoped>
  div.article-list-pane {
    position: absolute; left: 400px; top: 0px; right: 0px; bottom: 0px;
    width: 400px;
    border-right: 2px solid #eaeaea;
    /*border-left: 2px solid #ececec;*/
    background-color: white;
    z-index: 199;
    height:100%;
  }

  div.loading {
    width: 100%;
    height: 100%;

    position: absolute;
    left: 0px;
    top: 0px;

    z-index: 200;

    background-color : #ececec;
    opacity: 0;
    visibility: hidden;
  }

  div.loading.showing {
    visibility: visible;
    opacity: 0.7;
    transition: visibility 0s, opacity 0.5s linear;
  }

  img.loading-img {
    display: block;
    margin: auto;
  }

  div.article-list-pane-header {
    /*background-color: #f8f8f8;*/
    padding-top: 16px;
    padding-bottom: 8px;
    border-top: 3px solid #eaeaea;
    /*border-bottom: 1px solid #eaeaea;*/
    height: 40px;
    line-height: 40px;
  }

  span.article-list-pane-title {
    color: #6A6A6A;
    padding-left: 4px;
    font-size: 1.3em;
  }

  div.tool-bar {
    background-color: #f8f8f8;
    line-height: 28px;
    padding-bottom: 4px;
  }

  div.tool-bar-buttons {
    /*padding-left: 16px;*/
  }

  span.tool-button {
    margin: 1px 2px 1px 0px;
    padding: 2px 3px 2px 2px;

    border: 1px solid #f8f8f8;

    background-color: #f8f8f8;

    font-size: 14px;
  }


  div.title-search-input {
    padding-left: 4px;
  }

  div.title-search-input > label {
    margin-right: 8px;
  }

  input.search-word {
    font-size: 0.7em;
    width: 80%;
  }

  span.tool-button.go-recent-button {
    margin-left: 40px;
  }
  span.tool-button:hover {
    background-color: #eaeaea;
    cursor: pointer;
    border: 1px solid rgb(16,123,211);
  }
  span.tool-button.selected {
    background-color: #eaeaea;
    cursor: pointer;
    border: 1px solid rgb(16,123,211);
  }

  div.article-list-wrapper {
    overflow-y: scroll;
    overflow-x: hidden;
    height:100%;
    /*border-top: 2px solid #ececec;*/
  }

  div.empty-list-item {
    text-align: center;
    padding-top: 10px;
  }

  label.empty-list-label {
    font-size: 1.2em;
    color: #999999;
  }

  ul.article-list {

  }

  li.article-list-item {
    width: 98%;
    padding: 3px 5px 3px 5px;
    border-bottom: 1px solid #ececec;
  }

  div.article-list-item-wrapper {
    border: 4px solid white;
  }
  div.article-list-item-wrapper:hover {
    border: 4px solid #acacac;
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

  /*ul > li.article-list-item:first-child {
    border-top: 1px solid #cccccc;
  }*/

</style>
