<template>
  <div class="comment-writer">
    <div v-if="getIsSignedIn"
         class="signed-up-user-comment-writer">
      <input class="content" type="text">
      <button type="button">쓰기</button>
    </div>

    <div
      v-else
      class="anonymous-user-comment-writer">
      <input class="author-name" type="text">
      <input class="anonymous-password" type="password">
      <input class="content" type="text">
      <button type="button">쓰기</button>
    </div>

  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: "Viewer",
    props: {
      article: Object
    },
    data() {
      return {};
    },
    methods: {

    },
    computed: {
      ...mapGetters([
        'getIsSignedIn'
      ])
    },
    components: {

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
