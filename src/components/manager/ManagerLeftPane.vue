<template>
  <div>
    <nav class="left-pane-menu">
      <div class="global-logo-picto" style="margin-top:10px; margin-bottom: 30px; margin-top: 20px;">
        <img src="@/assets/images/icon-picto-86w87h.png"/>
      </div>
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
      <!--<div class="left-pane-menu-item">PUB</div>-->
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/tag-icon-50w50h.png"
          @click="toggleTagPane"
          @mouseover="onMenuItemMouserOver"
          @mouseleave="onMenuItemMouserLeave"/>
      </div>
      <div class="left-pane-menu-item"
           @click="saveArticle"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/50w_saveicon.png"/>
      </div>


      <div class="intended-blank-space"></div>

      <div class="left-pane-menu-item user-menu-item"
           @click="goSettings"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/user-icon-50w50h.png"/>
      </div>

      <!--<div class="left-pane-menu-item">SETTINGS</div>-->
      <!--<button type="button" @click="test">test</button>-->
    </nav>
    <div class="">
      <category-pane></category-pane>
      <tag-pane></tag-pane>
    </div>

  </div>


</template>

<script>
import { mapMutations } from 'vuex';
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import categoryTreeComp from '@/components/CategoryTree.vue'

import CategoryPane from '@/components/manager/CategoryPane.vue'
import TagPane from '@/components/manager/TagPane.vue'

export default {
  name: 'ManageLeftPane',
  data () {
    return {
      upHere: false
    }
  },
  methods: {
    ...mapMutations([
      'setCategoryPaneIsShowing',
      'setIsTagPaneShowing'
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
    toggleTagPane (event) {
      event.stopPropagation();// because of check/mark pass
      console.log('???')
      var cur = this.isTagPaneShowing;
      this.setIsTagPaneShowing(!cur);
    },
    onMenuItemMouserOver (event ) {
      event.currentTarget.classList.add('up-here')
    },
    onMenuItemMouserLeave (event ) {
      event.currentTarget.classList.remove('up-here')
    },
    goSettings () {
      this.$router.push({ name: "MySetting" })
    }
  },
  computed: {
    ...mapGetters([
      'isCategoryPaneShowing',
      'isTagPaneShowing'
    ])
  },
  components: {
    'category-tree-comp': categoryTreeComp,
    'category-pane': CategoryPane,
    'tag-pane': TagPane
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
    width: 35px;
  }
  img.icon:hover{
    cursor: pointer;
  }

  div.left-pane-menu-item.up-here img.icon{
    background-color: #e6ffcc;
    transition: 0.5s;

    border-radius: 17px;
  }

  div.intended-blank-space:after{
    content:"";
    display: block;
    height: 200px;
  }
</style>
