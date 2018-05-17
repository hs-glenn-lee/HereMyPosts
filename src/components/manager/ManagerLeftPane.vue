<template>
  <div>
    <nav class="left-pane">
      <div class="global-logo" ><img src="@/assets/images/logo_height_30px.png" style="width:50px;"/></div>
      <div class="left-pane-item">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/50w_newdocument.png"/>
      </div>
      <div class="left-pane-item">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/50w_category_icon.png"/>
      </div>
      <div class="left-pane-item">PUB</div>
      <div class="left-pane-item">SER</div>
      <div class="left-pane-item">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/50w_saveicon.png"/>
      </div>
      <div class="left-pane-item">SAVE</div>
      <div class="left-pane-item">SETTINGS</div>
    </nav>
    <div>
      <category-sub-left-pane></category-sub-left-pane>
    </div>
  </div>


</template>

<script>
import { mapActions } from 'vuex';
import categoryTreeComp from '@/components/CategoryTree.vue'
import CategorySubLeftPane from '@/components/manager/CategorySubLeftPane.vue'
export default {
  name: 'Manage',
  components: {
    'category-tree-comp': categoryTreeComp,
    'category-sub-left-pane': CategorySubLeftPane
  }
}
</script>

<style scoped>
  .left-pane {
    left: 0;
    width: 73px;

    /**/
    border-right: 1px solid #ececec;
    height: 100%;
    float: left;
    z-index: 200;
    position: absolute;

  }
  div.left-pane-item {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  img.icon {
    height:auto;
    width: 40px;
  }
  img.icon:hover{
    cursor: pointer;
  }
</style>
