<template>
  <div>
    <nav class="left-pane">
      <div class="global-logo" ><img src="@/assets/images/logo_height_30px.png" style="width:50px;"/></div>
      <div class="left-pane-item"
           @mouseover="onMouserOver" @mouseleave="onMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/50w_newdocument.png"/>
      </div>
      <div class="left-pane-item"
           @mouseover="onMouserOver" @mouseleave="onMouserLeave">
        <img
          @click="toggleShowCSLP"
          class="icon"
          src="@/assets/images/left-pane-icons/50w_category_icon.png"/>
      </div>
      <div class="left-pane-item">PUB</div>
      <div class="left-pane-item">SER</div>
      <div class="left-pane-item"
           @mouseover="onMouserOver" @mouseleave="onMouserLeave">
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
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import categoryTreeComp from '@/components/CategoryTree.vue'
import CategorySubLeftPane from '@/components/manager/CategorySubLeftPane.vue'
export default {
  name: 'Manage',
  data () {
    return {
      upHere: false
    }
  },
  methods: {
    ...mapMutations([
      'setCategorySubLeftPaneIsShow'
    ]),
    toggleShowCSLP () {
      var cur = this.getCategorySubLeftPaneIsShow;
      this.setCategorySubLeftPaneIsShow(!cur);
    },
    onMouserOver ( event ) {
      event.currentTarget.classList.add('up-here')
    },
    onMouserLeave ( event ) {
      event.currentTarget.classList.remove('up-here')
    }
  },
  computed: {
    ...mapGetters([
      'getCategorySubLeftPaneIsShow'
    ])
  },
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

    background-color: #f8f8f8;

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

  div.left-pane-item.up-here {
    background-color: black;
  }
</style>
