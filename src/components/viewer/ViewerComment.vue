<template>
  <div class="viewer-comments">
    <comment-writer></comment-writer>
  </div>
</template>

<script>
  import CommentWriter from '@/components/comment/CommentWriter.vue'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: "ViewerComments",
    methods: {
      ...mapActions([

      ])
    },
    computed: {
      ...mapGetters([

      ])
    },
    components: {
        'comment-writer': CommentWriter
    },
    created() {

    }
  }
</script>

<style scoped>
  div.viewer-comments {

  }
</style>
