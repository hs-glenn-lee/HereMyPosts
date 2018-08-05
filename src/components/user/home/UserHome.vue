<template>
  <div class="user-home">
    <div>
      <header class="home-header">
        <div class="flex-item">
          <div class="global-logo"><img src="@/assets/images/logo_height_30px.png"/></div>
        </div>
        <!--<div class="flex-item">
          <div class="header-menu-item">
            <a href="/sign/sign-in">로그인</a>
          </div>
        </div>-->
      </header>
    </div>

    <div class="user-info">
      <div class="user-pen-name">{{userSetting.penName}}</div>
      <div class="user-introduction">{{userSetting.introduction}}</div>
      <div class="user-name">{{username}}</div>
    </div>

    <div class="">
      <recent-article-feed :username="username"></recent-article-feed>
    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  import RecentArticleFeed from "@/components/user/home/RecentArticleFeed.vue";
  import api from '@/api/api';
  export default {
    name: 'UserHome',
    props: {

    },
    data() {
      return {
        username: this.$route.params.username,
        userSetting: {}
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
    },
    created () {
      api.getPublicAccountSetting(this.username)
        .then( data => {
          console.log('wwwwwwwwwwwwww')
          console.log(data);
          this.userSetting = data;
        })
    }
  }
</script>

<style scoped>
  header.home-header {
    display: flex;
    justify-content: space-between;
    height: 54px;
  }
  .flex-item {
    display: flex;
  }

  div.global-logo {
    margin-left: 8px;
  }
  div.header-menu-item {
    display:inline-block;
    font-size: 1.2em;
    height: inherit;
    vertical-align: middle;
    line-height: 54px;

    padding: 0px 10px 0px 10px;
  }

</style>
