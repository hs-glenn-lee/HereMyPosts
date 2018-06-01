<template>
  <div class="right-pane">
    <div class="center-block">
      <div class="article-meta">
        <span>카테고리</span>
        <!--<span class="selected-category-name">{{getAritcle.getCategory().name}}</span>-->
        <div class="title">
          <span>{{getTitle}}</span>
        </div>
      </div>

      <div v-html="getContent" class="content-container">
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  export default {
    name: "ViewerRightPane",
    methods: {

    },
    computed: {
      ...mapGetters([
        'getArticle',
        'getTitle',
        'getContent',
        'getAuthor'
      ])
    },
    created() {
      this.getArticle();
    }
  }
</script>

<style scoped>

</style>
