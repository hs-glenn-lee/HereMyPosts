<template>
  <div class="user-home">
    <div>
      <header class="home-header">
        <div class="flex-item">
          <div class="global-logo"><img src="@/assets/images/logo_height_30px.png"/></div>
        </div>
      </header>
    </div>

    <div>
      <article class="center">
        <h2 style="display:none;">홈 내용</h2>
        <div class="user-info">
            <div class="user-profile-picture"><img style="width:100px; height: 100px; box-shadow: none; border-radius: 3px;"
                                           :src="profilePictureUrl"></div>
            <div class="user-pen-name"><span>{{accountSetting.penName}}</span></div>
            <div class="user-introduction">{{accountSetting.introduction}}</div>
        </div>

        <div class="recent-article-feed-container">
          <recent-article-feed :username="username"></recent-article-feed>
        </div>

      </article>
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
        accountSetting: {}
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

      ]),
      profilePictureUrl () {
        if(this.accountSetting.profilePictureFileId) {
          return '/uploaded-image/' + this.accountSetting.profilePictureFileId
        }else {
          return ''
        }
      }
    },
    components: {
      'recent-article-feed': RecentArticleFeed
    },
    created () {
      api.getPublicAccountSetting(this.username)
        .then( data => {
          this.accountSetting = data;
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

  article.center {
    width: 1080px;
    margin: auto;
  }

  div.user-info {
    width: 600px;
    min-height: 110px;
    margin: auto;
    padding-bottom:16px;
  }
  div.user-pen-name{
    font-size: 1.8em;
    font-weight: bold;
    padding-bottom: 8px;
  }

  div.user-introduction {
    font-size: 1.2em;
    padding-bottom: 1.4em;
  }
  div.user-profile-picture {
    float: right;
  }

</style>
