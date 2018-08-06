<template>
  <div class="viewer-comments">
    <comment-writer
      :article="article"></comment-writer>
    <div class="comment-list-title"><span>댓글</span></div>
    <comment-list
      v-if="isShowingComments"
      :article="article"></comment-list>
    <div
      v-else
      class="alt-comment-list">
      <span> - 개의 댓글이 있습니다.</span>
      <button class="show-comment-button" type="button" @click="showComments">댓글 보기</button>
    </div>

  </div>
</template>

<script>
  import CommentWriter from '@/components/comment/CommentWriter.vue'
  import CommentList from '@/components/comment/CommentList.vue'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'



  export default {
    name: "ViewerComments",
    props: {
      article: Object
    },
    data () {
      return {
        comments: [],
        isShowingComments: false
      }
    },
    methods: {
      ...mapActions([

      ]),
      showComments () {
        this.isShowingComments = true;
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
      article (article) {
        this.isShowingComments = false;
      }
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
    margin-bottom: 8px;
  }
  div.alt-comment-list {
    margin-bottom: 16px;
  }
  button.show-comment-button {
    background-color: #fff;
    color: #4a4a4a;
    border: 1px solid #4a4a4a;

    font-size: 0.9em;
  }
</style>
