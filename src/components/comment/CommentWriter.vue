<template>
  <div class="comment-writer-comp">
    <div class="comment-writer-title">
      <span>댓글 쓰기</span>
    </div>

    <div v-if="getIsSignedIn"
         class="signed-up-user-comment-writer comment-writer">
      <form class="comment-writer-form">
        <div class="author-info">
          <span class="author-name">작성자이름</span>
        </div>
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
      </form>
    </div>

    <div
      v-else
      class="anonymous-user-comment-writer comment-writer">
      <form class="comment-writer-form">
        <input
            v-model="authorName"
            placeholder="작성자 이름"
            class="anonymous-author-name"
            type="text">
        <input
          v-model="anonymousPassword"
          placeholder="비밀번호"
          class="anonymous-password"
          type="password">
        <textarea-autosize
          placeholder="댓글 내용을 입력해주세요."
          :min-height="120"
          v-model="content"
          class="content-input"
        ></textarea-autosize>
        <button
          @click="writeComment"
          type="button">쓰기</button>
      </form>
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
      article: Object
    },
    data() {
      return {
        commentToWrite: new Comment(),
        content: '',
        authorName: '',

        anonymousPassword: '',
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
          comment.authorName = this.authorName;
          comment.authorId = null;
        }else {
          var signAccount = this.getAccount;
          comment.authorId = signAccount.id;
          comment.authorName = signAccount.username;
        }

        validator.validate('writeComment', comment, exception => {
          this.setAlert({
            message: exception.message,
            isShowing: true
          })
        });

        api.writeComment(comment)
          .then(data => {

          })

      }
    },
    computed: {
      ...mapGetters([
        'getIsSignedIn',
        'getAccount'
      ])
    },
    components: {

    }
  }
</script>

<style scoped>
  div.comment-writer {
    background: #fff;
    padding: 8px;
    margin-bottom: 16px;
  }
  div.comment-writer-title {
    margin-bottom: 8px;
    font-weight: bold;
    color: #4a4a4a;
  }

  textarea {
    border: none;
    outline: none;
    font-size: 1em;
    resize: none;
    font-family: inherit; /*should fix autosize textare plugin*/

    font-family: NanumGothic;

    width: 1264px;
    padding: 8px 0px 0px 0px;
  }

  button.write-comment-button {
    font-size: 1em;
    background-color: #fff;
    color: #000;
    border: 1px solid #4a4a4a;
  }
  button.write-comment-button:hover {
    background-color: #ececec;
    transition: 0.5s;
  }

  input.anonymous-author-name {
    font-size: 1em;
    padding: 4px;
    border-radius:0;
  }

  input.anonymous-password {
    font-size: 1em;
    padding: 4px;
    border-radius:0;
  }
</style>
