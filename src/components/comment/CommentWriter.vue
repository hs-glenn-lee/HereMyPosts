<template>
  <div class="comment-writer-comp">
    <div @click="letsWriteComment">
      <div class="comment-writer">

        <div class="ready-to-write" v-if="!isGoingToWriteComment"><span>댓글 쓰기 ...</span></div>

        <div class="author-info invisible"
             :class="{'visible-ease-in-1s':isGoingToWriteComment}">
          <div v-if="getIsSignedIn"
               class="signed-up-author-info">
            <span v-if="authorSetting" class="author-name">{{authorSetting.penName}}</span>
          </div>
          <div v-else
               class="anonymous-author-info">
            <input
              v-model="anonymousAuthorName"
              placeholder="작성자 이름"
              class="anonymous-input anonymous-author-name"
              type="text">
            <input
              v-model="anonymousPassword"
              placeholder="비밀번호"
              class="anonymous-input anonymous-password"
              type="password">
          </div>
        </div>

        <div
          :class="{'visible-ease-in-1s':isGoingToWriteComment}"
          class="invisible">
          <textarea-autosize
            placeholder="댓글 내용을 입력해주세요."
            :min-height="120"
            v-model="content"
            class="content-input"
          ></textarea-autosize>
          <button
            @click="writeComment"
            class="write-comment-button"
            type="button">쓰기</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import { mapMutations } from 'vuex'

  import { mapGetters } from 'vuex'
  import Comment from '@/model/Comment'

  import api from '@/api/api'
  import validator from '@/model/validator/validator.js'

  export default {
    name: "Viewer",
    props: {
      article: Object,
      onCommentWritten: Function
    },
    data() {
      return {
        commentToWrite: new Comment(),
        content: '',
        anonymousAuthorName: '',
        anonymousPassword: '',
        isGoingToWriteComment: false,

        authorSetting: null
      };
    },
    methods: {
      ...mapMutations([
        'setAlert'
      ]),
      writeComment () {
        //console.log('writeComment')

        var comment = this.commentToWrite;
        comment.content = this.content;
        comment.isAnonymous = !this.getIsSignedIn;
        comment.article = this.article;

        console.log(comment.isAnonymous)
        if(comment.isAnonymous) {
          comment.anonymousPassword = this.anonymousPassword;
          comment.anonymousAuthorName = this.anonymousAuthorName;
        }else {
          var signAccount = this.getAccount;
          comment.author = signAccount;
        }

        validator.validate('writeComment', comment, exception => {
          this.setAlert({
            message: exception.message,
            isShowing: true
          })
        });

        api.writeComment(comment)
          .then(data => {
            this.onCommentWritten(data);

            //reset data
            this.isGoingToWriteComment = false;
            this.commentToWrite = new Comment();
            this.content = ''
          })

      },
      letsWriteComment () {
        this.isGoingToWriteComment = true;
      }
    },
    computed: {
      ...mapGetters([
        'getIsSignedIn',
        'getAccount'
      ])
    },
    components: {

    },
    created () {
      api.getMySettings()
        .then( data => {
          this.authorSetting = data;
        })
    }
  }
</script>

<style scoped>
  div.comment-writer {
    background: #fff;
    padding: 8px;
    margin-bottom: 16px;

    box-shadow: 0 1px 4px #FBF9D0;
    border-radius: 4px;
    border: 1px solid #EFEB95;
  }
  div.ready-to-write {
    padding-top: 8px;
    padding-bottom: 8px;
    color: #4a4a4a;
    height:100%;
    vertical-align: middle;
  }

  textarea {
    border: none;
    outline: none;
    font-size: 1em;
    resize: none;
    font-family: inherit; /*should fix autosize textare plugin*/

    font-family: NanumGothic;

    width: 1260px;
    padding: 8px 0px 0px 0px;
    margin-top: 8px;
  }

  button.write-comment-button {
    font-size: 1em;
    background-color: #fff;
    color: #4a4a4a;
    border: 1px solid #bcbcbc;
  }
  button.write-comment-button:hover {
    background-color: #ececec;
    transition: 0.5s;
  }

  div.signed-up-author-info {
    padding-top: 8px;
    font-weight: bold;
  }


  input.anonymous-input {
    font-size: 1em;
    padding: 4px;
    border-radius: 4px;
  }
  input.anonymous-author-name {

  }

  input.anonymous-password {

  }

  div.invisible {
    visibility:hidden;
    opacity: 0;
    height:0;
  }
  div.invisible.visible-ease-in-1s {
    visibility: visible;
    opacity: 1;
    height: auto;
    transition: visibility 0s, height 1s, opacity 0.5s linear;
  }

</style>
