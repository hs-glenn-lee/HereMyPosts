<template>
  <div class="manager"
    @click="checkPass">
    <left-pane></left-pane>
    <right-pane v-if="getArticle"></right-pane>
    <alert-comp v-if="getIsAlertShowing"></alert-comp>
    <loading-comp></loading-comp>
  </div>
</template>

<script>

import leftPaneComp from './ManagerLeftPane'
import rightPaneComp from './ManagerRightPane'
import alertComp from '@/components/Alert'
import loadingComp from '@/components/Loading'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'ManagerComp',
  methods: {
    ...mapActions([
      'initManager',
      'checkPass'
    ])
  },
  computed: {
    ...mapGetters([
      'getAlertMessage',
      'getIsAlertShowing',
      'getArticle',
      'isLoading'
    ])
  },
  created () {
    var currentPath = this.$route.path
    var paths = currentPath.split("/");
    var articleIdInPath = paths[3];

    if(articleIdInPath) {
      //this is just for convention.
      //do not over use.
      this.$router.replace({ name:'Manager', params: {username:paths[1]} })
      this.initManager(articleIdInPath)
    }else {
      this.initManager()
    }

    /*this.initManager()*/
  },
  components: {
    'left-pane': leftPaneComp,
    'right-pane': rightPaneComp,
    'alert-comp': alertComp,
    'loading-comp': loadingComp,
  }
}
</script>

<style scoped>
.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
  overflow: hidden;
}
</style>

