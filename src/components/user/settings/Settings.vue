<template>
  <div class="me-settings center-block">
    <h1 style="text-align:center;">설정</h1>
    <div class="photo setting-item">
      <div>
        <img style="width:120px; height: 120px; display: block; margin: auto;">
      </div>
    </div>

    <div class="pen-name setting-item">
      <label class="setting-item-name">필명
        <button type="button">저장</button>
      </label>

      <div class="input-wrapper">
        <input type="text">

      </div>

    </div>

    <div class="introduction setting-item">
      <label class="setting-item-name">자기소개
        <button type="button">저장</button>
      </label>
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

      ])
    },
    computed: {
      ...mapGetters([

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
  div.center-block {
    margin: auto;
    width: 1366px;
  }
  div.setting-item {
    width: 800px;
    margin-left: auto;
    margin-right: auto;
    background-color: white;
    margin-bottom: 2em;


  }

  label.setting-item-name {
    font-size: 1.5em;
    color: #4f4f4f;
    display: block;
    margin-bottom: 10px;

  }

  div.photo.setting-item {

  }

  input {
    border: none;
    outline: none;
  }


  textarea {
    border: none;
    outline: none;
    font-size: 1.5em;
    resize: none;
    font-family: none; /*should fix autosize textare plugin*/

    margin-right: 35px;
    width: 700px;
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
