<template>
  <div v-html="content" class="article-content user-select-text"></div>
</template>

<script>
  export default {
    name: "ArticleContent",
    props: {
      content: String
    },
    computed: {

    }
  }
</script>

<style scoped>
  @import url(../../components/manager/editor/content.css);

</style>
