<template>
  <div class="article-tags">
    <div class="title">태그</div>
    <div
      class="tags">
        <span
          v-for="ta in tagsArticles"
          class="tag"
          :key="ta.id">{{ta.tag.name}}
        </span>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'

  export default {
    name: "ArticleTagList",
    props : {
      article: Object
    },
    data () {
      return {
        tagsArticles: []
      }
    },
    methods: {
      getTagsOfArticle () {
        api.getTagArticlesOfArticle(this.article.id)
          .then( data => {
            console.log('!!!')

            this.tagsArticles = data;
            console.log(this.tagsArticles)
          })
      }
    },
    created () {

    },
    watch : {
      article: function (val) {
        if(val)
          this.getTagsOfArticle();
      }
    }

  }
</script>

<style scoped>
  div.article-tags {
    margin-bottom: 32px;
  }
  div.title {
    margin-bottom: 8px;
    font-weight: bold;
    color: #4a4a4a;
  }
  div.tags {
    margin-bottom: 16px;
  }
  span.tag {
    padding: 4px 4px 4px 4px;
    margin: 2px 2px 2px 2px;
    border: 1px solid #c1d9ff;
    background-color: #e7effb;
    border-radius: 6px;
    display: inline-block;
  }
</style>
