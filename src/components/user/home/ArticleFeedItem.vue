<template>
  <li class="article-feed-item">
    <div class="title" @click="goArticle(article.id)">{{article.title}}</div>
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
      goArticle(articleId) {
        var username = this.$route.params.username;
        this.$router.push({ path: "/"+username+"/article/"+articleId})
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
      console.log(this.article);
    }
  }
</script>

<style scoped>

</style>
