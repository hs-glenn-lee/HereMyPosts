<template>
  <li class="article-feed-item">
    <div class="title" @click="goArticleViewer(article.id)">{{article.title}}</div>
    <div class="title">{{article.createTimestamp}}</div>

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

</style>
