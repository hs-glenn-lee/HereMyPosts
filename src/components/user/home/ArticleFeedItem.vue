<template>
  <li class="article-feed-item">
    <div class="itemm psd-hover-cursor-pointer" @click="goArticleViewer(article.id)">
      <div class="row">
        <div class="title">{{article.title}}</div>
      </div>
      <div class="row">
        <div class="flex-row">
          <div class="update-time">
            <span v-if="(article.updateTimestamp)" class="article-create-timestamp">{{new Date(article.updateTimestamp).toLocaleDateString()}}</span>
            <span class="middotDivider"></span>
            <span>{{article.updateTimestamp | timestampToPastTimeString}}</span>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="summary"><span>{{article.summary}}</span></div>
      </div>
      <!--<div class="row">
        <div class="flex-row">
          <div class="comment-count">6 comments</div>
        </div>
      </div>-->
    </div>
  </li>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'ArticleFeedItem',
    props: {
      article: Object
    },
    data() {
      return {

      }
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([

      ]),
      goArticleViewer(articleId) {
        var username = this.$route.params.username;
        let routeData = this.$router.resolve({ path: "/"+username+"/article/"+articleId})
        window.open(routeData.href, '_self');
      }
    },
    computed: {
      ...mapGetters([

      ])
    },
    created () {
      console.log(
        'feeditem'
      )
    }
  }
</script>

<style scoped>
  div.itemm {
    border: 1px solid #ececec;
    border-radius: 4px;
    margin: 10px 0px 10px 0px;
    padding: 8px 16px 8px 16px;

    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    background-color: #fdfdfd;
  }
  div.row:first-child {
    margin-top: 8px;
  }
  div.row {
    margin: 8px 0px 8px 0px;
  }
  div.flex-row {
    display:flex;
    flex-direction: row;
    align-items: center;
  }

  div.title {
    font-size: 1.5em;
    font-weight: bold;
    color: #333;
  }
  div.update-time {
    display:flex;
  }
  div.update-time > span {
    font-size: 0.8em;
    color: #8A8A8A;
  }
  div.summary {
    font-size: 1em;
    color: #4a4a4a;
  }


</style>
