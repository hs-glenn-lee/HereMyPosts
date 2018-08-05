<template>
  <div class="right-pane">
    <div class="center-block">
      <article class="article" v-if="getArticle">
        <h1 class="hidden">{{getTitle}}</h1>
        <div class="article-meta">
          <div class="author-info">
            <div class="author-profile-picture info-item" :style="authorProfilePictureStyle"></div>
            <div class="author-pen-name info-item"><span>{{authorSetting.penName}}</span></div>
          </div>
          <div class="category-name">{{getArticle.category.name}}</div>
          <div class="title"><span>{{getTitle}}</span></div>
        </div>

        <!--<div v-html="getContent" class="article-content"></div>-->
        <article-content-comp v-if="getArticle" :content="getContent"></article-content-comp>

      </article>

      <viewer-comments
        v-if="getArticle"
        :article="getArticle"></viewer-comments>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import api from '@/api/api';

  import ViewerComments from './ViewerComments';
  import ArticleContentComp from './ArticleContent';

  export default {
    name: "ViewerRightPane",
    data () {
      return {
        username: this.$route.params.username,
        authorSetting: {}
      }
    },
    methods: {

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
      }
    },
    created() {
      api.getPublicAccountSetting(this.username)
        .then( data => {
          this.authorSetting = data;
        })
    },
    components: {
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
    padding-bottom: 16px;
  }

  div.article-meta > div.category-name {
    margin-bottom: 8px;
    font-size: 1.2em;
    color: #8a8a8a;
  }

  div.article-meta > div.title {
    font-size: 2em;
    font-weight: bold;
  }

  article.article {
    margin-bottom: 16px;
  }

</style>
