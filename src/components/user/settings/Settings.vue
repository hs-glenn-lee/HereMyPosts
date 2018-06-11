<template>
  <div class="me-settings" v-if="getIsSignedIn">
    <header class="top-header">
      <div class="left-block">
        <div class="global-logo-inline"><img src="@/assets/images/logo_height_52px.png"/></div>
        <span class="username">{{getAccount.username}}</span>
      </div>

      <div class="right-block">
        <span class="manager-anchor" @click="goManager">글 관리로 이동</span>
      </div>
    </header>

    <div class="center-block">
      <h2 style="text-align:center;">
        개인설정
      </h2>

      <div class="photo setting-item">
        <div>
          <img style="width:100px; height: 100px; display: block; margin: auto; border-radius: 60px; border: 1px solid grey; box-shadow: none;">
        </div>
      </div>

      <div class="pen-name setting-item">
        <div class="setting-item-name">
          <span>필명</span>
          <button type="button">저장</button>
        </div>
        <div class="input-wrapper">
          <input type="text" placeholder="필명을 입력해 주세요.">
        </div>
      </div>

      <div class="introduction setting-item">
        <div class="setting-item-name">
          <span>자기소개</span>
          <button type="button">저장</button>
        </div>

        <div class="input-wrapper">
          <textarea-autosize
            placeholder="자기소개를 입력해주세요."
            :min-height="10"
            v-model="introduction"
          ></textarea-autosize>
        </div>
      </div>

      <div class="resign">

      </div>

    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Template',
    props: {

    },
    data() {
      return {
        introduction: '호랑나비한마리가 꽃밭에 앉았는데 \n 도대체 모르겠네'
      }
    },
    methods: {
      ...mapActions([

      ]),
      ...mapMutations([
          'getIsSignedIn'
      ]),
      goManager () {
        let routeData = this.$router.resolve({ name: "Manager", params: { username: this.getAccount.username }})
        window.open(routeData.href, '_self');
      }
    },
    computed: {
      ...mapGetters([
        'getAccount'
      ])
    },
    components: {

    }
  }
</script>

<style scoped>

  div.me-settings {
    color: #4f4f4f;
  }

  h1 {
    /*font-size: 1.2em;*/
    margin-top: 20px;
    margin-bottom: 1em;
  }

  header.top-header {
    border-bottom: 1px solid black;
    margin-bottom: 15px;
    height: 38px;
  }

  div.left-block {
    float:left;
  }
  div.right-block {
    float:right
  }
  div.right-block:after {
    clear: both;
    content: "";
  }

  div.global-logo-inline {
    display: inline-block;
    vertical-align: middle;
  }
  div.global-logo-inline img{
    height: 20px;
    padding: 10px 7px 7px 10px;
  }
  header.top-header span.username {
    border-radius: 6px;
    border: 1px solid black;
    background-color: #ececec;
    padding: 2px 3px 2px 3px;
    vertical-align: middle;
    box-shadow: 0 0 1px 0px #ececec inset, 0 0 1px 0px white;
  }

  span.manager-anchor {
    line-height: 37px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 7px;
  }

  div.center-block {
    margin: auto;
    width: 1366px;
  }
  div.setting-item {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    margin-bottom: 1em;
  }

  div.setting-item-name {
    font-size: 1em;
    height: 27px;
    color: #4f4f4f;
    display: block;
    margin-bottom: 4px;

    vertical-align: middle;
  }

  div.setting-item-name button {
    font-size: 0.8em;
    display: block;
    float:right;
  }
  div.setting-item-name span{
    display:block;
    float:left;
    padding-top: 4px;
    vertical-align: middle;
  }
  div.setting-item-name button:after {
    clear: both;
    content: "";
  }

  div.photo.setting-item {

  }

  input {
    font-size: 1em;
    border: none;
    outline: none;
  }

  textarea {
    border: none;
    outline: none;
    font-size: 1em;
    resize: none;
    font-family: none; /*should fix autosize textare plugin*/

    width: 794px;
  }

  div.input-wrapper {
    border-bottom: 1px solid #dfdfdf;
    margin: 5px 0px 5px 0px;
    padding-bottom: 5px;
  }

  div.input-wrapper input {
    width: 100%;
    margin-right: 30px;
  }


</style>
