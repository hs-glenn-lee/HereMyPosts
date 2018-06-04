<template>
  <li class="comment-list-item">
    <div class="authorName">{{comment.authorName}}</div>
    <div class="content">{{comment.content}}</div>
  </li>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: "CommentListItem",
    props: {
      comment: Object
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

    },
    created() {
      console.log(this.comment)
    }
  }
</script>

<style scoped>
  div.viewer {
    position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
    overflow: hidden;
  }
</style>
