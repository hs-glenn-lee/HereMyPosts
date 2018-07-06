<template>
  <div class="article-list-pane"
      v-show="isArticleListPaneShowing">
    <div class="loading" :class="{'showing': isManagerLoading }">
      <img class="loading-img"
           :style="getLoadingImgStyle"
           src="@/assets/images/loading.gif">
    </div>
    <div class="article-list-pane-header">
      <span class="article-list-pane-title" v-if="this.getSelectedNode">{{this.getSelectedNode.name}} 글 목록</span>
    </div>

    <div class="tool-bar">
      <div class="tool-bar-buttons">
        <span class="tool-button">정렬</span>
        <span class="tool-button">제목검색</span>
        <span class="tool-button">페이지로 보기</span>
        <span class="tool-button">최근 글</span><!-- 우로 정렬 -->
      </div>
      <div class="tool-input">
        <!--<input type="text">-->
      </div>
    </div>


    <div class="list-height" :style="getListHeight">
      <div class="article-list-wrapper">
        <ul class="article-list">
          <li v-if="isArticleListEmpty">
            <span>비어 있음</span>
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
              <span v-if="(article.createDateString)" class="article-create-timestamp">{{article.createDateString}}</span>
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
      listHeight: '',
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
      'isManagerLoading'
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
      'setFocusedVueCompName'
    ]),
    calcListHeight() {
      let header = window.document.querySelector('div.article-list-pane-header');
      let headerHeight = header.offsetHeight;
      this.innerHeight = window.innerHeight;
      this.listHeight = 'height:' + (this.innerHeight - headerHeight - 2/*border px*/) + 'px;';
    },
    calcLoadingImgPaddingTop () {
      let loadingDivHeight = window.document.querySelector('div.article-list-pane');
      this.loadingImgPaddingTop = (loadingDivHeight.clientHeight/2) - 120 /*loading img height*/;
    }

  },
  watch: {
    windowInnerHeight (val,oldVal) {
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
    padding-left: 16px;
    font-size: 1.3em;
  }

  div.tool-bar {
    background-color: #f8f8f8;
    height: 28px;
    line-height: 28px;
    /*border-bottom: 1px solid #eaeaea;*/
  }

  div.tool-bar-buttons {
    padding-left: 16px;
  }

  span.tool-button {
    margin: 1px 2px 1px 0px;
    padding: 2px 3px 2px 2px;

    border: 1px solid #f8f8f8;

    background-color: #f8f8f8;

    font-size: 14px;

  }
  span.tool-button:hover {
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

  ul.article-list {

  }

  li.article-list-item {
    width: 98%;
    padding: 3px 5px 3px 5px;
    border-bottom: 1px solid #ececec;
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
