<template>
  <div class="me-settings" v-if="getIsSignedIn">
    <header class="top-header">
      <div class="left-block">
        <div class="global-logo-inline"><img src="@/assets/images/logo_height_52px_white.png" /></div>
      </div>

      <div class="right-block">
        <span class="username">{{getAccount.username}}</span>
        <span class="manager-anchor" @click="goManager">글 관리로 이동</span>
      </div>
    </header>

    <div class="center-block">
      <h2 style="text-align:center;">
        개인설정
      </h2>

      <div class="photo setting-item">
        <div>
          <img style="width:100px; height: 100px; display: block; margin: auto; border-radius: 60px; border: 1px solid grey; box-shadow: none;"
          :src="'/uploaded-image/' + profilePictureFileId">
        </div>
        <input type="file" id="file"
               ref="file"
              v-on:change="uploadProfilePictureFile">
      </div>

      <div class="pen-name setting-item">
        <div class="setting-item-name">
          <span>필명</span>
          <button @click="savePenName" type="button">저장</button>
        </div>
        <div class="input-wrapper">
          <input v-model="penName" type="text" placeholder="필명을 입력해 주세요.">
        </div>
      </div>

      <div class="introduction setting-item">
        <div class="setting-item-name">
          <span>자기소개</span>
          <button @click="saveIntroduction" type="button">저장</button>
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
  import api from '@/api/api'
  import axios from 'axios'

  import validator from '@/model/validator/validator.js'
  export default {
    name: 'Template',
    props: {

    },
    data() {
      return {
        penName: '',
        introduction: '',
        profilePictureFileId: '',
        profilePictureFile: ''
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
      },
      saveIntroduction () {
        validator.validate('saveIntroduction', this.introduction, rejectMessage => {
          alert(rejectMessage);
        })
        api.saveIntroduction(this.introduction)
          .then( data => {
            this.introduction = data.introduction;
          })
      },
      savePenName () {
        validator.validate('savePenName', this.penName, rejectMessage => {
          alert(rejectMessage);
          return;
        })
        api.savePenName(this.penName)
          .then( data => {
            this.penName = data.penName;
          })
      },
      getMySettings () {
        api.getMySettings()
          .then(data => {
              this.penName = data.penName;
              this.introduction = data.introduction;
              this.profilePictureFileId = data.profilePictureFileId;
          })
      },
      uploadProfilePictureFile () {
        this.profilePictureFile = this.$refs.file.files[0];
        let formData = new FormData();
        formData.append('file', this.profilePictureFile);
        axios.post( '/api/account/setting/upload-profile-picture',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        ).then(function(){
          console.log('SUCCESS!!');
        })
          .catch(function(){
            console.log('FAILURE!!');
          });
      }
    },
    computed: {
      ...mapGetters([
        'getAccount'
      ])
    },
    components: {

    },
    created () {
      this.getMySettings();
    }
  }
</script>

<style scoped>

  div.me-settings {
    color: #4f4f4f;
  }

  h2 {
    font-size: 1.7em;
    margin-top: 20px;
    margin-bottom: 1em;
  }

  header.top-header {
    border-bottom: 1px solid rgb(235,168,0);
    margin-bottom: 15px;
    height: 38px;
    background-color : rgb(250,185,5);
  }

  div.left-block {
    float:left;
  }
  div.right-block {
    float:right;
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
    display: inline-block;
    vertical-align: middle;
    color: white;

    margin-right: 8px;
    margin-top: 7px;
  }

  span.manager-anchor {
    display: inline-block;
    vertical-align: middle;
    font-size: 0.8em;
    color: white;

    margin-right: 8px;
    margin-top: 8px;

    border-radius: 6px;
    padding: 5px 5px 5px 5px;
    background-color: rgb(235,168,0); /*rgb(255,228,51);*/
  }

  span.manager-anchor:hover {
    cursor: pointer;
  }
  div.center-block {
    margin: auto;
    width: 1366px;
  }

  div.setting-item.photo {
    padding-bottom: 1.4em;
  }

  div.setting-item {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    margin-bottom: 2em;

    padding-bottom: 5px;
    border-bottom: 1px solid #dfdfdf;
  }

  div.setting-item-name {
    font-size: 1.3em;
    height: 27px;
    color: #4f4f4f;
    display: block;
    margin-bottom: 1em;


    vertical-align: middle;
  }

  div.setting-item-name button {
    font-size: 13px;
    display: block;
    float:right;
    background-color: rgb(235,168,0);
    border: none;
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
    font-size: 1.3em;
    border: none;
    outline: none;
  }

  textarea {
    border: none;
    outline: none;
    font-size: 1.3em;
    resize: none;
    font-family: none; /*should fix autosize textare plugin*/

    width: 794px;
  }

  div.input-wrapper {

    margin: 5px 0px 5px 0px;

  }

  div.input-wrapper input {
    width: 792px;
    padding-left: 2px;

  }


</style>
