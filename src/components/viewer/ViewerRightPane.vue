<template>
  <div class="right-pane">
    <div class="right-pane-wrapper" :style="rightPaneWrapperStyle">
      <div class="center-block">
        <article class="article" v-if="getArticle">
          <h1 class="hidden">{{getTitle}}</h1>
          <div class="article-meta">
            <div class="author-info">
              <div class="author-profile-picture info-item" :style="authorProfilePictureStyle"></div>
              <div class="author-pen-name info-item"><span>{{authorSetting.penName}}</span></div>
            </div>
            <div class="category-name">
              <img src="@/assets/images/left-pane-icons/category-icon-40w40h.png" style="width:1em;height:1em; vertical-align:middle; opacity:0.8;">
              {{getArticle.category.name}}
            </div>
            <div class="title"><span>{{getTitle}}</span></div>
            <div class="update-time">작성 {{getArticle.createDateString}}</div>
          </div>

          <!--<div v-html="getContent" class="article-content"></div>-->
          <article-content-comp v-if="getArticle" :content="getContent"></article-content-comp>
        </article>


      </div>

      <div class="other comment-comp-container">
        <div class="center-block">
          <viewer-comments
            v-if="getArticle"
            :article="getArticle"></viewer-comments>
        </div>
      </div>
      <div class="other">
        <div class="center-block">
          <viewer-footer-comp></viewer-footer-comp>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import api from '@/api/api';

  import ViewerComments from './ViewerComments';
  import ArticleContentComp from './ArticleContent';
  import ViewerFooterComp from "./ViewerFooter";

  export default {
    name: "ViewerRightPane",
    data () {
      return {
        username: this.$route.params.username,
        authorSetting: {},

        rightPaneWrapperWidth: 0
      }
    },
    methods: {
      calcRightPaneWidth () {
        var $divRightPane = window.document.querySelector('div.right-pane');
        this.rightPaneWrapperWidth = $divRightPane.offsetWidth - 60 /*left-pane-width*/;
      }
    },
    computed: {
      ...mapGetters([
        'getContent',
        'getTitle',
        'getArticle'
      ]),
      authorProfilePictureStyle () {
        return {
          'background-image': 'url("' + this.profilePictureUrl + '")'
        }
      },
      profilePictureUrl () {
        if(this.authorSetting.profilePictureFileId) {
          return '/uploaded-image/' + this.authorSetting.profilePictureFileId
        }else {
          return ''
        }
      },
      rightPaneWrapperStyle () {
        return {
          'width': this.rightPaneWrapperWidth + 'px'
        }
      }
    },
    created() {
      api.getPublicAccountSetting(this.username)
        .then( data => {
          this.authorSetting = data;
        })
    },
    mounted() {
      this.calcRightPaneWidth();
      var vm = this;
      window.addEventListener("resize",function(event) {
        vm.calcRightPaneWidth();
      });
    },
    components: {
      'viewer-footer-comp': ViewerFooterComp,
      'viewer-comments': ViewerComments,
      'article-content-comp': ArticleContentComp
    }
  }
</script>

<style scoped>
  div.right-pane {
    display: block;
    margin-left: 60px;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  div.right-pane-wrapper {
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
  }
  div.center-block {
    margin: auto;
    width: 1280px;
  }
  div.author-info {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-bottom: 16px;
  }
  div.author-info > .info-item {
    margin: 0px 0px 0px 8px;
    font-size: 1.2em;
  }

  div.author-info > div.author-profile-picture{
    height: 45px;
    width: 45px;
    background-size: 45px 45px;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 50%;
  }

  div.article-meta {
    position: relative;
    padding-top: 16px;
    padding-bottom: 32px;
  }

  div.article-meta > div.category-name {
    margin-bottom: 16px;
    font-size: 1.2em;
    color: #4a4a4a;
  }

  div.article-meta > div.title {
    font-size: 2em;
    font-weight: bold;
    padding-bottom: 16px;
  }

  div.article-meta > div.update-time {
    color: #aaaaaa;
    font-size: 0.7em;
  }

  article.article {
    margin-bottom: 80px;
    min-height: 550px;
  }




  div.other {
    padding-top: 16px;
    padding-bottom: 16px;
    background-color: #f8f8f8;

  }
  div.comment-comp-container {
    min-height: 240px;
    padding-bottom: 80px;
  }

</style>
