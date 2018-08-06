<template>
  <div class="comment-list-container">

    <ul class="comment-list">
      <comment-list-item
        v-if="comments.length > 0"
        v-for="comment in comments"
        :comment="comment"
        :key="comment.id"></comment-list-item>
    </ul>
  </div>
</template>

<script>
  import CommentListItem from './CommentListItem'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  import api from '@/api/api'

  export default {
    name: "CommentList",
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
        return api.getCommentsOfArticle(this.article.id)
          .then(data => {
            this.comments = data;
          })
          .catch(err => {console.error(err)})
      },
    },
    computed: {
      ...mapGetters([

      ])
    },
    components: {
        'comment-list-item': CommentListItem
    },
    mounted() {
      this.getCommentsOfArticle ()
    }
  }
</script>

<style scoped>
  div.comment-list-container {
    min-height: 40px;
    margin-bottom: 16px;
  }

</style>
