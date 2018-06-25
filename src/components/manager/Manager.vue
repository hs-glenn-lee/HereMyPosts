<template>
  <div class="manager"
    @click="checkPass">
    <left-pane></left-pane>
    <right-pane v-if="getArticle"></right-pane>
    <alert-comp v-if="getIsAlertShowing"></alert-comp>
  </div>
</template>

<script>

import leftPaneComp from './ManagerLeftPane'
import rightPaneComp from './ManagerRightPane'
import alertComp from '@/components/Alert'
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
      'getArticle'
    ])
  },
  created () {
    /*this.syncSign()*///todo if error occcur redirect to sign-in
    var currentPath = this.$route.path
    var paths = currentPath.split("/");
    this.initManager(paths[3]);//
  },
  components: {
    'left-pane': leftPaneComp,
    'right-pane': rightPaneComp,
    'alert-comp': alertComp
  }
}
</script>

<style scoped>
.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
  overflow: hidden;
}
</style>

