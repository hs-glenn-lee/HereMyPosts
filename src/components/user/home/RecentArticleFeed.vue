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
  import PageParameter from '@/model/PageParameter.js'
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
      this.getRecentArticles(0);
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([

      ]),
      getRecentArticles(page) {
        var vm = this;
        var pageParameter = new PageParameter(page,10,'desc','updateTimestamp');
        var username = this.username;

        return api.getRecentArticles(username, pageParameter)
          .then( data => {
            vm.recentArticleList = data;
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
