<template>
  <div class="right-pane">
    <div v-if="getArticle" class="right-pane-wrapper" :style="rightPaneWrapperStyle">
      <div class="center-block">
        <article class="article">
          <h1 class="hidden">{{getTitle}}</h1>
          <div class="article-meta">
            <div class="author-info">
              <div class="author-profile-picture info-item" :style="authorProfilePictureStyle"><span v-if="!authorSetting.profilePictureFileId">{{authorSetting.penName.substr(0,1)}}</span></div>
              <div class="author-pen-name info-item psd-hover-cursor-pointer" @click="goUserHome"><span>{{authorSetting.penName}}</span></div>
            </div>
            <div class="category-name ">
              <img src="@/assets/images/left-pane-icons/category-icon-40w40h.png" style="width:1em;height:1em; vertical-align:middle; opacity:0.8;">
              <span class="user-select-text ">{{getArticle.category.name}}</span>
            </div>
            <div class="title"><span class="user-select-text">{{getTitle}}</span></div>
            <div v-if="getArticle.createTimestamp" class="create-time">
              <span class="middotDivider">
                {{new Date(getArticle.createTimestamp).toLocaleDateString()}}
              </span>
              <span>
                {{new Date(getArticle.createTimestamp) | timestampToPastTimeString}}에 작성
              </span>
            </div>
          </div>

          <article-content-comp v-if="getArticle" :content="getContent"></article-content-comp>
        </article>

        <div class="context-switch-short"></div>
        <article-tags :article="getArticle"></article-tags>
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
    <div v-else class="right-pane-wrapper">
      <div v-if="getError" class="article-error">
        <div class="center-block">
          <div class="error-message"><span>{{getError.message}}</span></div>
        </div>
      </div>
      <div class="article-false">

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
  import ArticleTagComp from './ArticleTags';
  import nameToColor from '@/components/nameToColor.js'

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
      },
      goUserHome () {
        let currentRoute = this.$router.currentRoute;
        let routeData = this.$router.resolve({ name:'UserHome', params: { username: currentRoute.params.username }})
        window.open(routeData.href, '_self');
      }
    },
    computed: {
      ...mapGetters('viewer/article',[
        'getContent',
        'getTitle',
        'getArticle',
        'getError'
      ]),
      authorProfilePictureStyle () {
        if(this.authorSetting.profilePictureFileId) {
          return {
            'background-image': 'url("' + this.profilePictureUrl + '")'
          }
        }else {
          if(this.authorSetting.penName)
            return {
              'background-color': '#'+nameToColor(this.authorSetting.penName)
            }
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
    watch: {
      getArticle() {
        let container = window.document.querySelector("div.right-pane-wrapper");
        container.scrollTop = 0;
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
      'article-content-comp': ArticleContentComp,
      'article-tags': ArticleTagComp
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

    line-height: 49px;
    font-size: 30px;
    text-align: center;

    background-size: 45px;
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

  div.article-meta > div.create-time {
    color: #8a8a8a;
    font-size: 0.7em;
  }

  article.article {
    margin-bottom: 80px;
    min-height: 550px;
  }


  div.other {
    padding-top: 32px;
    padding-bottom: 16px;
    background-color: #f8f8f8;

  }
  div.comment-comp-container {
    min-height: 240px;
    padding-bottom: 80px;
  }


  div.context-switch-short {
    border-bottom: 1px solid #ccc;
    width: 30%;
    margin-top: 16px;
    margin-bottom: 16px;

  }

  div.error-message {
    margin-top:64px;
    margin-bottom: 64px;
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
  }

</style>
