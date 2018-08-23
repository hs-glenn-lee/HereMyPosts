<template>
  <div class="user-home">
    <div>
      <header class="home-header">
        <div class="flex-con">
          <div class="flex-item">
            <div @click="goHome" class="global-logo psd-hover-cursor-pointer"><img src="@/assets/images/logo-200w30h.png"/></div>
          </div>
        </div>
        <div class="flex-con">
          <div class="flex-item">
            <div @click="goManager" class="header-button"><span>글 관리로 이동</span></div>
          </div>
        </div>
      </header>
    </div>

    <main>
      <article class="center">
        <h2 style="display:none;">홈 내용</h2>
        <div v-if="accountSetting" class="user-info">
            <div class="user-profile-picture">
              <div v-if="accountSetting.profilePictureFileId" class="profile-picture" :style="profilePictureStyle"></div>
              <div v-else class="default-profile-picture profile-picture" :style="defaultProfilePictureStyle">{{accountSetting.penName.substr(0,1)}}</div>
            </div>
            <div class="user-pen-name"><span>{{accountSetting.penName}}</span></div>
            <div class="user-introduction">{{accountSetting.introduction}}</div>
        </div>
        <div class="recent-article-feed-container">
          <recent-article-feed :username="username"></recent-article-feed>
        </div>
      </article>
    </main>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'
  import RecentArticleFeed from "@/components/user/home/RecentArticleFeed.vue";
  import api from '@/api/api';
  import nameToColor from '@/components/nameToColor.js'
  export default {
    name: 'UserHome',
    props: {

    },
    data() {
      return {
        username: this.$route.params.username,
        accountSetting: null
      }
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([

      ]),
      goHome () {
        window.location.href = "/";
      },
      goManager () {
        let username = this.$route.params.username;
        let routeData = this.$router.resolve({name:'Manager', params: {username}})
        window.open(routeData.href, '_self');
      }
    },
    computed: {
      ...mapGetters([

      ]),
      profilePictureStyle () {
        if(this.accountSetting.profilePictureFileId) {
          console.log('--------------')
          let profilePictureUrl = '/uploaded-image/' + this.accountSetting.profilePictureFileId;
          return {
            'background-image' : 'url("' + profilePictureUrl + '")'
          }
        }
      },
      defaultProfilePictureStyle () {
        return {
          'background-color': '#'+nameToColor(this.accountSetting.penName),
          'font-size': '86px',
          'line-height': '100px',
          'text-align': 'center',
          'color': '#2a2a2a'
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
  main {
    margin-bottom: 48px;
  }
  header.home-header {
    display: flex;
    justify-content: space-between;
    height: 54px;

    margin-bottom: 32px;
  }
  .flex-con {
    display: flex;
    flex-direction: row;
    justify-items: center;
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

  div.header-button {
    display: inline-block;
    font-size: 1em;
    height: 1.2em;
    line-height: 1.2em;

    padding: 8px;
    border: 1px solid #8a8a8a;
    border-radius: 8px;
    margin: 8px;
  }
  div.header-button:hover {
    cursor: pointer;
    background-color: #ececec;
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
    color: #333;
  }

  div.user-introduction {
    font-size: 1.2em;
    padding-bottom: 1.4em;
  }
  div.user-profile-picture {
    float: right;
  }
  div.profile-picture {
    width: 100px;
    height: 100px;
    background-position: center;
    background-size: 100px;
    background-repeat: no-repeat;
  }


</style>
