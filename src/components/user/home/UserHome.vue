<template>
  <div class="user-home">
    <p>home!!</p>
    <recent-article-feed :username="username"></recent-article-feed>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  import RecentArticleFeed from "@/components/user/home/RecentArticleFeed.vue";

  export default {
    name: 'UserHome',
    props: {

    },
    data() {
      return {
        username: this.$route.params.username
      }
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([

      ])
    },
    computed: {
      ...mapGetters([

      ])
    },
    components: {
      'recent-article-feed': RecentArticleFeed
    }
  }
</script>

<style scoped>

</style>
