<template>
  <div class="manager">
    <left-pane></left-pane>
    <right-pane></right-pane>
    <alert-comp></alert-comp>
  </div>
</template>

<script>

import leftPaneComp from './ManagerLeftPane'
import rightPaneComp from './ManagerRightPane'
import alertComp from '@/components/Alert'
import { mapActions } from 'vuex'
export default {
  name: 'ManagerComp',
  methods: {
    ...mapActions([
      'initSign'
    ])
  },
  created () {
    this.initSign()//todo if error occcur redirect to sign-in
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
