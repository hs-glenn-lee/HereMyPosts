<template>
  <div class="me-settings" v-if="getIsSignedIn">
    <header class="top-header">
      <div class="left-block">
        <div @click="goHome" class="global-logo-inline psd-hover-cursor-pointer"><img src="@/assets/images/logo-200w30h-white.png" /></div>
      </div>

      <div class="right-block">
        <span class="username">{{getAccount.username}}</span>
        <span class="manager-anchor psd-hover-cursor-pointer" @click="goManager">글 관리로 이동</span>
      </div>
    </header>

    <div class="center-block">
      <div class="center-800">
        <h2>
          개인설정
        </h2>
      </div>


      <div class="profile-picture-item setting-item center-800">
        <div class="profile-picture-display">
          <div>
            <div v-if="accountSetting.profilePictureFileId" class="profile-picture" :style="profilePictureStyle"></div>
            <div v-else class="default-profile-picture profile-picture" :style="defaultProfilePictureStyle">{{accountSetting.penName.substr(0,1)}}</div>
          </div>

          <input type="file" id="profile-picture-input"
                 ref="file"
                 v-on:change="uploadProfilePictureFile"
                  style="display:none;">
          <button type="button"
                  @click="changeProfilePicture">변경</button>
        </div>
      </div>



      <div class="pen-name setting-item center-800">
        <table>
          <colgroup>
            <col width="15%"/>
            <col width="70%"/>
            <col width="15%"/>
          </colgroup>
          <tr>
            <td class="setting-item-name"><span>필명</span></td>
            <td class="setting-item-input"><input v-model="accountSetting.penName" type="text" placeholder="필명을 입력해 주세요."></td>
            <td class="setting-item-button"><button @click="savePenName" type="button">저장</button></td>
          </tr>
        </table>
      </div>


      <div class="introduction setting-item center-800">
        <table>
          <colgroup>
            <col width="15%"/>
            <col width="70%"/>
            <col width="15%"/>
          </colgroup>
          <tr>
            <td class="setting-item-name"><span>자기소개</span></td>
            <td class="setting-item-input">
              <div class="input-wrapper">
                <textarea-autosize
                  placeholder="자기소개를 입력해주세요."
                  :min-height="10"
                  v-model="accountSetting.introduction"
                ></textarea-autosize>
              </div>
            </td>
            <td class="setting-item-button"><button @click="saveIntroduction" type="button">저장</button></td>
          </tr>
        </table>
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
  import nameToColor from '@/components/nameToColor.js'

  import validator from '@/model/validator/validator.js'
  export default {
    name: 'Template',
    props: {

    },
    data() {
      return {
        profilePictureFile: '',
        accountSetting: {
          penName: '',
          introduction: '',
          profilePictureFileId: ''
        }
      }
    },
    methods: {
      ...mapActions([
        'syncSign'
      ]),
      ...mapMutations([
          'getIsSignedIn'
      ]),
      goHome() {
        window.location.href = '/';
      },
      goManager () {
        let routeData = this.$router.resolve({ name: "Manager", params: { username: this.getAccount.username }})
        window.open(routeData.href, '_self');
      },
      getMySettings () {
        api.getMySettings()
          .then(data => {
            this.accountSetting = data;
          })
      },
      uploadProfilePictureFile () {
        this.profilePictureFile = this.$refs.file.files[0];
        let formData = new FormData();
        try {
          validator.validate('MaxUploadImageSize', this.profilePictureFile);
        }catch(err) {
          alert(err.message);
          return;
        }


        formData.append('file', this.profilePictureFile);

        axios.post( '/api/account/setting/upload-profile-picture',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          .then(res => {
            this.accountSetting = res.data;
          })
          .catch( err => {
            alert('에러가 발생했습니다.');
          });
      },
      savePenName () {
        validator.validate('savePenName', this.accountSetting.penName, reject => {
          alert(reject.message);
          return;
        });

        api.savePenName(this.accountSetting.penName)
          .then( data => {
            this.accountSetting.penName = data.penName;
            alert('필명이 변경되었습니다.')
          })
      },
      saveIntroduction () {
        validator.validate('saveIntroduction', this.accountSetting.introduction, reject => {
          alert(reject.message);
        });

        if(!this.accountSetting.introduction) {
          this.accountSetting.introduction = ''
        }

        api.saveIntroduction(this.accountSetting.introduction)
          .then( data => {
            this.accountSetting.introduction = data.introduction;
            alert('자기소개가 변경되었습니다.')
          })
      },
      changeProfilePicture () {
        var element = document.querySelector('#profile-picture-input')
        element.click();
      }
    },
    computed: {
      ...mapGetters([
        'getAccount'
      ]),
      profilePictureUrl () {
        return '/uploaded-image/' + this.accountSetting.profilePictureFileId
      },
      profilePictureStyle () {
        if(this.accountSetting.profilePictureFileId) {
          let profilePictureUrl = '/uploaded-image/' + this.accountSetting.profilePictureFileId;
          return {
            'background-image' : 'url("' + profilePictureUrl + '")',
            'background-position' : 'center'
          }
        }
      },
      defaultProfilePictureStyle () {
        return {
          'background-color': '#'+nameToColor(this.accountSetting.penName)
        }
      }
    },
    components: {

    },
    created () {
      this.syncSign();
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
    text-align: center;
    font-family: NanumGothic;
    margin-bottom: 15px;
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

  div.center-block {
    margin: auto;
    width: 1280px;
  }

  div.setting-item.profile-picture-item {
    padding-bottom: 15px;
    padding-top: 25px;
    height: 140px;
    border-bottom: none;
  }

  div.setting-item {
    padding-bottom: 5px;
    padding-top: 10px;
    border-bottom: 1px solid #dfdfdf;
  }

  div.center-800 {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  div.setting-item table{
    width: 100%;
  }

  td.setting-item-name {
    font-size: 1.3em;
    height: 27px;
    color: #4f4f4f;
    vertical-align: top;
    padding-top: 14px;
  }
  td.setting-item-name span{
    font-family: NanumGothic;
  }
  td.setting-item-button {
    vertical-align: top;
    padding-top: 14px;
  }

  div.setting-item button {
    font-size: 16px;
    display: block;
    float:right;
    background-color: rgb(235,168,0);
    border: none;
  }

  div.setting-item input {
    font-size: 1.3em;
    border: none;
    outline: none;
    width: 100%;
    padding-top: 12px;
    font-family: NanumGothic;
  }

  div.setting-item textarea {
    border: none;
    outline: none;
    font-size: 1.3em;
    resize: none;
    font-family: inherit; /*should fix autosize textare plugin*/
    padding-top: 12px;
    width: 100%;
    font-family: NanumGothic;
  }

  div.profile-picture-display {
    width:100%;
  }

  /*div.profile-picture-display div.profile-picture-wrapper{
    display: block;
    margin-left:auto;
    margin-right: auto;
  }*/

  div.profile-picture-display button {
    position: relative;
    float:none;
    display: inline-block;
    left:420px;
    bottom: 18px;
  }

  div.profile-picture {
    height: 100px;
    width: 100px;
    background-size: 100px;
    background-position: center;
    background-repeat: no-repeat;

    margin: auto;

    font-size: 86px;
    line-height: 105px;
    text-align: center;
    color: #2a2a2a;
  }

</style>
