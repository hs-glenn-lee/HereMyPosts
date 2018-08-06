<template>
  <li class="comment-list-item">
    <div class="comment-meta">
      <div class="authorName">{{comment.authorName}}</div>
      <div class="create-time">{{new Date(comment.createTimestamp).toLocaleDateString()}}</div>
    </div>
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
  li.comment-list-item {
    margin-bottom: 8px;

    background-color: #fff;

    /*border: 1px solid #4a4a4a;
    border-radius: 4px;*/

    padding: 8px;
  }
  div.comment-meta {
    display:flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 8px;
  }
  div.comment-meta > div.authorName{
    color: #000000;
    margin-right: 8px;
  }
  div.comment-meta > div.create-time {
    font-size: 0.7em;
  }
</style>
