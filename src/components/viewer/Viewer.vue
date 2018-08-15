<template>
  <div class="viewer user-select-none" @click="checkPass">
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
  import { mapMutations } from 'vuex'

  export default {
    name: "Viewer",
    methods: {
      ...mapActions('viewer',[
        'initViewer',
        'checkPass',
        'onChangeRoute'
      ]),
      ...mapMutations([

      ])
    },
    computed: {
      ...mapGetters([
        /*alert start*/
        'getAlertCount',
        'getAlertMessage',
        'getIsAlertShowing',
        'getAlert'
        /*alert end*/
      ])
    },
    watch : {
      '$route' (to, from) {
        this.onChangeRoute(to);
      }
    },
    components: {
        'left-pane': ViewerLeftPaneComp,
        'right-pane': ViewerRightPaneComp,
        'alert-comp': alertComp
    },
    created() {
      this.initViewer(this.$route);
    }
  }
</script>

<style scoped>
  div.viewer {
    position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
    overflow: hidden;
  }
</style>
