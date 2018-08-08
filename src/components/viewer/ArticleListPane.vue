<template>
  <div class="article-list-pane"
      v-show="isArticleListPaneShowing">
    <div class="loading" :class="{'showing': isManagerLoading }">
      <img class="loading-img"
           :style="getLoadingImgStyle"
           src="@/assets/images/loading.gif">
    </div>
    <div class="not-list">
      <div class="article-list-pane-header" :class="{'has-border-bottom': (this.getListOf === 'recent')}">
        <div class="article-list-pane-title" v-if="(this.getListOf === 'category') && (this.getSelectedNode)">
          <span class="nobreak" style="max-width: 300px; display:inline-block; font-weight:bold;">
            {{this.getSelectedNode.name}}
          </span>
          <span class="nobreak" style="display:inline-block;"> 글 목록
          </span>
        </div>
        <div class="article-list-pane-title" v-if="this.getListOf === 'recent'" >
          최근 글
        </div>
      </div>

      <div v-if="getListOf === 'category'" class="tool-bar">
        <div class="tool-input">
          <div class="tool-buttons">
            <span class="tool-button psd-hover-cursor-pointer"><img @click="setSelectedListTool('sort')" class="tool-button-img" src="@/assets/images/article-list-pane/sort-arrows-16w16h.png"></span>
            <span class="tool-button psd-hover-cursor-pointer"><img @click="setSelectedListTool('search')" class="tool-button-img" src="@/assets/images/article-list-pane/mag-icon-16w16h.png"></span>
            <span class="tool-button psd-hover-cursor-pointer go-recent-button"
                  @click="getRecentArticles(0)">최근 글</span>
          </div>
          <div class="tool-controllers">
            <div class="tool-controller">
              <div v-show="selectedListTool === 'search'" class="title-search-input">
                <label>제목</label>
                <input ref="searchWord" v-on:keyup="inputSearchWord" class="search-word" type="text">
              </div>
            </div>
            <div v-show="selectedListTool === 'sort'" class="tool-controller sort-controller">
              <label class="sort-controller-label">기준</label>
              <span class="v-bar"><img src="@/assets/images/article-list-pane/v-bar-img.png"></span>
              <span class="sort-controller-button psd-hover-cursor-pointer"
                    :class="{'selected': (getSortProperty==='updateTimestamp')}"
                    @click="setSortProperty('updateTimestamp')">날짜</span>
              <span class="sort-controller-button psd-hover-cursor-pointer"
                    :class="{'selected': (getSortProperty==='title')}"
                    @click="setSortProperty('title')">제목</span>

              <span class="h-gap"></span>

              <label class="sort-controller-label">방향</label>
              <span class="v-bar"><img src="@/assets/images/article-list-pane/v-bar-img.png"></span>
              <span class="sort-controller-button psd-hover-cursor-pointer"
                    :class="{'selected': (getSortDirection==='asc')}"
                    @click="setSortDirection('asc')">asc</span>
              <span class="sort-controller-button psd-hover-cursor-pointer"
                    :class="{'selected': (getSortDirection==='desc')}"
                    @click="setSortDirection('desc')">desc</span>
            </div>
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
            <div class="article-list-item-wrapper psd-hover-cursor-pointer"
                 v-bind:id="article.id"
                 @click="onArticleClick"
                 @click.double="onArticleDoubleClick">

              <div class="flex">
                <div class="article-title">
                  <span class="article-title">{{article.title}}</span>
                </div>
                <div v-show="getListOf === 'category'" class="buttons">
                  <div class="button">
                    <div class="button-image" @click="onClickTrashCan($event, article.id)"></div>
                  </div>
                </div>
              </div>

              <div class="article-create-timestamp">
                <span v-if="(article.updateDateString)" class="article-create-timestamp">{{article.updateDateString}}</span>
              </div>
              <div class="article-summary">
                <span class="article-summary">{{ellipsedSummary(article.summary)}}</span>
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

import _ from 'lodash';

export default {
  name: 'CategorySubLeftPaneComp',
  props: {
    onArticleClick:  Function,
    onArticleDoubleClick: Function
  },
  data () {
    return {
      listHeight: '',
      notListHeight: 0,
      windowInnerHeight: 0,
      loadingImgPaddingTop: 0,
      selectedListTool: 'search'
    }
  },
  computed: {
    ...mapGetters([
      'isArticleListPaneShowing',
      'isManagerLoading',//TODO

    ]),
    ...mapGetters('viewer/articleList',[
      'getArticleList',
      'isArticleListEmpty',
      'getListOf',
      'getSortDirection',
      'getSortProperty',
    ]),
    ...mapGetters('viewer/categoryTree',[
      'getSelectedNode'
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
      'setSortProperty',
      'setSortDirection',
      'setSearchWord'
    ]),
    ...mapActions('viewer/articleList',[
      'getRecentArticles'
    ]),
    calcListHeight() {
      let notList = window.document.querySelector('div.not-list');
      let notListHeight = notList.offsetHeight;

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
    },
    setSelectedListTool (payload) {
      this.selectedListTool = payload;
    },
    onClickTrashCan (evt, articleId) {
      evt.stopPropagation();
      this.deleteArticle(articleId);
    },
    toggleArticlePublicity (articleId) {
      console.log(articleId)
    },
    ellipsedSummary (summary) {
      var ret = summary;
      if(ret) {
        ret = (ret.length > 60)? ret.substring(0,60) + ' ...' : ret;
        return ret;
      }
      return '';
    }

  },
  watch: {
    windowInnerHeight (val,oldVal) {
      if(val !== oldVal) {
        this.$nextTick(() => {
          this.calcListHeight();
        })
      }
    },
    getListOf (val,oldVal) {
      if(val !== oldVal) {
        this.$nextTick(() => {
          this.calcListHeight();
        })
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
    /*position: absolute; left: 399px; !*400-1px*! top: 0px; right: 0px; bottom: 0px;*/
    width: 400px;
    border-right: 2px solid #eaeaea;
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
    padding-top: 16px;
    padding-bottom: 8px;
    height: 40px;
    line-height: 40px;
  }
  div.article-list-pane-header.has-border-bottom {
    border-bottom: 1px solid #ececec;
  }
  div.article-list-pane-title {
    color: #6A6A6A;
    padding-left: 8px;
    font-size: 1.3em;
    width: 100%;

    vertical-align: middle;
  }


  span.nobreak {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow:hidden;
  }

  div.tool-bar {
    background-color: #f8f8f8;
    padding-top: 2px;
    padding-bottom: 2px;
  }

  div.tool-bar-buttons {

  }

  div.tool-buttons {
    padding-left: 8px;
    line-height: 28px;
    height: 30px;
    vertical-align: middle;
  }
  span.tool-button {
    margin: 1px 2px 1px 0px;
    padding: 2px 2px 0px 2px;

    border: 1px solid #f8f8f8;
    font-size: 16px;
  }
  span.tool-button:hover {
    background-color: #eaeaea;
  }
  img.tool-button-img {
    width: 13px;
    height: 13px;
    vertical-align: middle;
  }
  span.tool-button.go-recent-button {
    padding: 3px 3px 3px 3px;
    font-size: 12px;
    background: #aaaaaa;
    border-radius: 5px;
    color: white;
  }

  div.tool-controllers {
    padding-left: 8px;
    height: 28px;
    line-height: 28px;
    vertical-align: middle;
  }
  div.tool-controller {

  }

  label.sort-controller-label {
    color: #888888;
    font-size: 14px;
  }
  span.sort-controller-button {
   font-size: 14px;
  }
  span.sort-controller-button:hover {
    font-weight: bold;
  }
  span.sort-controller-button.selected {
    font-weight: bold;
  }

  span.h-gap {
    display: inline-block;
    width:24px;
    height: 12px;
  }
  span.v-bar {
    vertical-align: middle;
    height: 16px;
    line-height: 16px;
  }
  span.v-bar img{
    width: 1px;
    height: 14px;
    opacity: 0.7;
    vertical-align: middle;
    margin-left: 2px;
    margin-right: 2px;
  }

  div.title-search-input > label {
    color: #888888;
    margin-right: 4px;
    font-size: 14px;
  }

  input.search-word {
    vertical-align: middle;
    font-size: 12px;
    padding: 2px 4px 2px 4px;
    width: 85%;
    border: #999999;
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

  div.flex {
    display: flex;
    justify-content: space-between;
  }

  div.article-title {
    display: inline-block;
    padding: 10px 0px 5px 5px;
    font-size: 20px;
  }

  div.buttons {
    display: inline-block;
  }
  div.buttons > div.button {
    display: inline-block;
    margin-top: 8px;
    margin-right: 8px;
  }
  div.buttons > div.button > div.button-image {
    background-size: 14px 14px;
    background-image: url(../../assets/images/article-list-pane/trash-24w24h.png);
    width: 14px;
    height: 14px;

    cursor: pointer;

    opacity: 0.5;
  }
  div.buttons > div.button > div.button-image:hover {
    background-image: url(../../assets/images/article-list-pane/trash-on-hover-24w24h.png);
    opacity: 0.7;
  }


  div.article-create-timestamp {
    padding: 1px 0px 5px 5px;
    font-size: 0.5em;
    color: #6A6A6A;
  }
  div.article-summary {
    padding: 5px 0px 10px 5px;
    color: #8A8A8A;
    font-size: 12px;
  }

</style>
