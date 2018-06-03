<template>
  <div class="comment-writer">
    <div v-if="getIsSignedIn"
         class="signed-up-user-comment-writer">
      <form class="comment-writer-form">
        <input
          v-model="content"
          class="content" type="text">
        <button
          @click="writeComment"
          type="button">쓰기</button>
      </form>
    </div>

    <div
      v-else
      class="anonymous-user-comment-writer">
      <form class="comment-writer-form">
        <input
            v-model="authorName"
            class="author-name"
            type="text">
        <input
          v-model="anonymousPassword"
          class="anonymous-password"
          type="password">
        <input
          v-model="content"
          class="content"
          type="text">
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
        isAnonymous: false,
        anonymousPassword: '',
      };
    },
    methods: {
      ...mapMutations([
        'setAlert'
      ]),
      writeComment () {
        //console.log(this.commentToWrite)
        console.log('writeComment')
        var comment = this.commentToWrite;
        comment.content = this.content;
        comment.isAnonymous = this.isAnonymous;
        comment.article = this.article;

        console.log(this.article)
        if(this.isAnonymous) {
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

    },
    created() {
      this.isAnonymous = !this.getIsSignedIn
    }
  }
</script>

<style scoped>

</style>
