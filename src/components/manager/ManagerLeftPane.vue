<template>
  <div>
    <nav class="left-pane-menu">
      <div class="global-logo" ><img src="@/assets/images/logo_height_30px.png" style="width:50px;"/></div>
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/50w_newdocument.png"
        />
      </div>
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
        <img
          @click="toggleCategoryPane"
          class="icon"
          src="@/assets/images/left-pane-icons/50w_category_icon.png"/>
      </div>
      <div class="left-pane-menu-item">PUB</div>
      <div class="left-pane-menu-item">SER</div>
      <div class="left-pane-menu-item"
           @click="saveArticle"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/50w_saveicon.png"/>
      </div>

      <div class="left-pane-menu-item">SETTINGS</div>
      <button type="button" @click="test">test</button>
    </nav>
    <div>
      <category-pane></category-pane>
    </div>

  </div>


</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import categoryTreeComp from '@/components/CategoryTree.vue'
import CategoryPane from '@/components/manager/CategoryPane.vue'

export default {
  name: 'ManageLeftPane',
  data () {
    return {
      upHere: false
    }
  },
  methods: {
    ...mapMutations([
      'setCategoryPaneIsShowing'
    ]),
    ...mapActions([
      'test',
      'saveArticle'
    ]),
    toggleCategoryPane (event) {
      event.stopPropagation();// because of check/mark pass

      var cur = this.isCategoryPaneShowing;
      this.setCategoryPaneIsShowing(!cur);
    },
    onMenuItemMouserOver (event ) {
      event.currentTarget.classList.add('up-here')
    },
    onMenuItemMouserLeave (event ) {
      event.currentTarget.classList.remove('up-here')
    }
  },
  computed: {
    ...mapGetters([
      'isCategoryPaneShowing'
    ])
  },
  components: {
    'category-tree-comp': categoryTreeComp,
    'category-pane': CategoryPane
  }
}
</script>

<style scoped>
  .left-pane-menu {
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
  div.left-pane-menu-item {
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

  div.left-pane-menu-item.up-here {
    background-color: #e6ffcc;
    transition: 0.5s;
  }
</style>
