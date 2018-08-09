<template>
  <div class="viewer-comments">
    <div class="comment-list-title"><span>댓글</span></div>
    <comment-writer
      :article="article"
      :onCommentWritten="onCommentWritten"></comment-writer>
    <comment-list
      ref="commentListComp"
      :article="article"></comment-list>

  </div>
</template>

<script>
  import CommentWriter from '@/components/comment/CommentWriter.vue'
  import CommentList from '@/components/comment/CommentList.vue'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  import api from '@/api/api.js'



  export default {
    name: "ViewerComments",
    props: {
      article: Object
    },
    data () {
      return {
        comments: []
      }
    },
    methods: {
      ...mapActions([

      ]),
      onCommentWritten (newComment) {
        this.$refs.commentListComp.addComment(newComment);
      }
    },
    computed: {
      ...mapGetters([

      ])
    },
    components: {
        'comment-writer': CommentWriter,
        'comment-list': CommentList
    },
    created() {

    },
    watch: {
    }
  }
</script>

<style scoped>
  div.viewer-comments {

  }

  div.comment-list-title {
    font-size: 1em;
    font-weight: bold;
    color: #4a4a4a;
    margin-bottom: 16px;
  }


</style>
