<template>
  <div class="recent-article-feed">
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
  import api from '@/api/api'

  export default {
    name: 'RecentArticleFeed',
    props: {
      'username': String
    },
    data() {
      return {
        recentArticleList: []
      }
    },
    created() {
      console.log('feed!!');
      this.getRecentArticles();
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([

      ]),
      getRecentArticles() {
        console.log(' com getRecentArticles ')
        var vm = this;
        api.getRecentArticles(this.username)
          .then(res => {
            vm.recentArticleList = res;
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

</style>
