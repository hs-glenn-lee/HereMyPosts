<template>
  <div class="manager user-select-none"
    @click="checkPass">
    <left-pane ref="leftPane"></left-pane>
    <right-pane
      @clickCategoryMeta="onClickCategoryMeta"
      @clickTagMeta="onClickTagMeta"
      v-if="getArticle"></right-pane>
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
    ]),
    onClickCategoryMeta (evt) {
      evt.stopPropagation()
      this.$refs.leftPane.showCategoryPaneExc(evt)
    },
    onClickTagMeta (evt) {
      evt.stopPropagation()
      this.$refs.leftPane.showTagPaneExc(evt)
    }
  },
  computed: {
    ...mapGetters([
      'getAlertMessage',
      'getIsAlertShowing',
      'getArticle',
      'isManagerLoading'
    ])
  },
  created () {
    var currentPath = this.$route.path
    var paths = currentPath.split("/");
    var articleIdInPath = paths[3];
    var usernameInPath = paths[1];
    var managerInitParam = {};
    managerInitParam.articleId = articleIdInPath;
    managerInitParam.username = usernameInPath;

    if(articleIdInPath) {
      //this is just for convention.
      //do not over use.
      this.$router.replace({ name:'Manager', params: {username:usernameInPath} })
    }

    this.initManager(managerInitParam)
      .catch( error => {
        if(error.name === 'NotSignedInError') {
          let routeData = this.$router.resolve({ name:'OnNotSignedInError'})
          window.open(routeData.href, '_self');
        }else if( error.name === 'BadRequest') {
          let routeData = this.$router.resolve({ name:'OnBadRequest'})
          window.open(routeData.href, '_self');
        }else {
          throw error;
        }
      })

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

