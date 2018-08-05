<template>
  <div class="right-pane">
    <div class="center-block">
      <div class="author-info">
          <div class="author-profile-picture" :style="authorProfilePictureStyle"></div>
          <div class="author-pen-name"><span>{{authorSetting.penName}}</span></div>
          <div class="author-introduction">{{authorSetting.introduction}}</div>
      </div>
      <article v-if="getArticle">
        <h1 class="hidden">{{getTitle}}</h1>
        <div class="article-meta">
          <div class="category-name">{{getArticle.category.name}}</div>
          <div class="title">
            <span>{{getTitle}}</span>
          </div>
        </div>

        <div v-html="getContent" class="content-container">
          <!--{{getContent}}-->
        </div>
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
          'background-image': 'url("' + this.profilePictureUrl + '")',
          'background-size': '100px 100px'
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
      'viewer-comments': ViewerComments
    }
  }
</script>

<style scoped>
  div.right-pane {
    margin-left: 60px;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  div.center-block {
    margin: auto;
    width: 1366px;
  }
  div.author-info {

  }

  div.author-info > div.author-profile-picture{
    height: 100px;
    width: 100px;
    background-size: 100px 100px;
  }



  div.article-meta {
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  div.article-meta > div.category-name {
    margin-bottom: 8px;
  }

  div.article-meta > div.title {
    font-size: 2em;
    font-weight: bold;
  }


  div.content-container {
    height: 100%;
    /**/
    font: inherit;
  }
</style>
