<template>
  <div class="viewer-comments">
    <div class="comment-list-title"><span>댓글</span></div>
    <comment-writer
      :article="article"></comment-writer>
    <comment-list
      v-if="isShowingComments"
      :article="article"></comment-list>
    <div
      v-else
      class="alt-comment-list">
      <div @click="showComments" class="show-comment-button psd-hover-cursor-pointer">
        <span> - 개의 댓글이 있습니다. 모든 댓글 보기</span>
      </div>
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
    margin-bottom: 16px;
  }
  div.alt-comment-list {
    margin-bottom: 16px;
  }
  div.show-comment-button {
    background-color: #fff;
    color: #4a4a4a;
    border: 1px solid #EFEB95;
    border-radius: 4px;

    font-size: 1em;

    text-align: center;
    vertical-align: middle;

    height: 64px;
    line-height: 64px;

    box-shadow: 0 1px 4px #FBF9D0;
  }

</style>
