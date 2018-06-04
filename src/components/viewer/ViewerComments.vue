<template>
  <div class="viewer-comments">
    <comment-writer
      :article="article"></comment-writer>
    <comment-list
      v-if="comments.length > 0"
    :comments="comments"></comment-list>
  </div>
</template>

<script>
  import CommentWriter from '@/components/comment/CommentWriter.vue'
  import CommentList from '@/components/comment/CommentList.vue'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'

  import api from '@/api/api'

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
      getCommentsOfArticle () {
        api.getCommentsOfArticle(this.article.id)
          .then(data => {
            this.comments = data;
          })
          .catch(err => {console.error(err)})
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
      if(this.article.id) {
        this.getCommentsOfArticle(this.article.id);
      }
    },
    watch: {
      article (article) {
        this.getCommentsOfArticle(article.id);
      }
    }
  }
</script>

<style scoped>
  div.viewer-comments {

  }
</style>
