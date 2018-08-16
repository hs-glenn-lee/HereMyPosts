<template>
  <div class="recent-article-feed">
    <div class="feed-name"><span>최근 글</span></div>
    <ul>
      <article-feed-item
        class="article-feed-item"
        v-for="article in recentArticleList" :key="article.id"
        :article="article">
      </article-feed-item>
    </ul>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  import ArticleFeedItem from './ArticleFeedItem'
  import PageParameter from '@/model/PageParameter.js'
  import api from '@/api/api'

  export default {
    name: 'RecentArticleFeed',
    props: {
      'username': String
    },
    data() {
      return {
        recentArticleList: [],
        page: 0,
        size: 10,
        maxPage: Number.MAX_SAFE_INTEGER
      }
    },
    created() {
      this.getRecentArticles();
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([

      ]),
      getRecentArticles() {
        var pageParameter = new PageParameter(this.page,this.size,'desc','updateTimestamp');
        var username = this.username;

        return api.getRecentPublicArticles(username, pageParameter)
          .then( data => {
            this.recentArticleList = data;
            this.page +=1;
          })
      }
    },
    computed: {
      ...mapGetters([

      ])
    },
    components: {
      'article-feed-item': ArticleFeedItem
    }
  }
</script>

<style scoped>
  div.feed-name {
    font-weight: bold;
    color: #333;
  }
</style>
