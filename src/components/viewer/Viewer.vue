<template>
  <div class="viewer">
    <left-pane></left-pane>
    <right-pane></right-pane>
    <alert-comp v-if="getIsAlertShowing" key="getAlertCount"></alert-comp>
  </div>
</template>

<script>
  import ViewerLeftPaneComp from './ViewerLeftPane'
  import ViewerRightPaneComp from './ViewerRightPane'
  import alertComp from '@/components/Alert'
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: "Viewer",
    methods: {
      ...mapActions([
        'setSavedArticle'
      ])
    },
    computed: {
      ...mapGetters([
        'getAlertCount',
        'getAlertMessage',
        'getIsAlertShowing',
        'getAlert'
      ])
    },
    components: {
        'left-pane': ViewerLeftPaneComp,
        'right-pane': ViewerRightPaneComp,
        'alert-comp': alertComp
    },
    created() {
      this.setSavedArticle(this.$route.params.articleId);
    }
  }
</script>

<style scoped>
  div.viewer {
    position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
    overflow: hidden;
  }
</style>
