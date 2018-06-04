<template>
  <div class="comment-list-container">
    <ul class="comment-list">
      <comment-list-item
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
  export default {
    name: "CommentList",
    props: {
      comments: Array
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions([

      ])
    },
    computed: {
      ...mapGetters([

      ])
    },
    components: {
        'comment-list-item': CommentListItem
    },
    created() {

    }
  }
</script>

<style scoped>
  div.viewer {
    position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
    overflow: hidden;
  }
</style>
