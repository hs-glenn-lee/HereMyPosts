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
        <!--{{getContent}}-->
      </div>

      <viewer-comment></viewer-comment>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import {mapActions} from 'vuex';
  import ViewerComment from './ViewerComment';
  export default {
    name: "ViewerRightPane",
    methods: {

    },
    computed: {
      ...mapGetters([
        'getContent'
      ])
    },
    created() {

    },
    components: {
      'viewer-comment': ViewerComment
    }
  }
</script>

<style scoped>
  div.right-pane {
    margin-left: 73px;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  div.content-container {
    height: 100%;
    /**/
    font: inherit;
  }
  div.article-meta {
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  div.center-block {
    margin: auto;
    width: 1366px;
  }

</style>
