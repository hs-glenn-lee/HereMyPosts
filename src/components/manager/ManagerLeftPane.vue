<template>
  <div>
    <nav class="left-pane-menu">
      <div class="global-logo-picto" style="margin-top:10px; margin-bottom: 30px; margin-top: 20px;">
        <img src="@/assets/images/icon-picto-86w87h.png"/>
      </div>
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
        <img
          id="new-document-icon"
          @click="onClickNewDocumentMenu"
          class="icon"
          src="@/assets/images/left-pane-icons/new-document-icon-40w40h.png"
        />
      </div>
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
        <img
          id="category-icon"
          @click="onClickCategoryMenu"
          class="icon"
          src="@/assets/images/left-pane-icons/category-icon-40w40h.png"/>
      </div>

      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
          <img
            id="tag-icon"
            class="icon"
            src="@/assets/images/left-pane-icons/tag-icon-40w40h.png"
            @click="onClickTagMenu"
            @mouseover="onMenuItemMouserOver"
            @mouseleave="onMenuItemMouserLeave"/>
      </div>
      <div class="left-pane-menu-item"
           :class="{'need-to-save':needToSave}"
           id="save-icon"
           @click="onClickSaveMenu"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/save-icon-40w40h.png"/>
      </div>


      <div class="intended-blank-space"></div>

      <div class="left-pane-menu-item user-menu-item"
           @click="goSettings"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          id="setting-icon"
          class="icon"
          src="@/assets/images/left-pane-icons/settings-icon-40w40h.png"/>
      </div>

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
      'saveArticle',
      'initManager',
      'updateArticleTags',
      'newArticle',
      'loadSavedArticle'
    ]),
    onClickNewDocumentMenu (event) {
      this.newArticle();
    },
    onClickSaveMenu (event) {
      this.saveArticle().
        then( savedArticle => {
          console.error('after save article');
          this.updateArticleTags(savedArticle)
            .then( () => {
              this.loadSavedArticle(savedArticle.id);
            });
        })
    },
    onClickCategoryMenu (event) {
      //toggle category pane show
      event.stopPropagation();// because of check/mark pass
      var cur = this.isCategoryPaneShowing;
      this.setCategoryPaneIsShowing(!cur);

      this.hideOtherSubPane(event);
    },
    onClickTagMenu (event) {
      //toggle tag pane show
      event.stopPropagation();// because of check/mark pass
      var cur = this.isTagPaneShowing;
      this.setIsTagPaneShowing(!cur);

      this.hideOtherSubPane(event);
    },
    onMenuItemMouserOver (event ) {
      event.currentTarget.classList.add('up-here')
    },
    onMenuItemMouserLeave (event ) {
      event.currentTarget.classList.remove('up-here')
    },
    goSettings () {
      let routeData = this.$router.resolve({ name: "MySetting" })
      window.open(routeData.href, '_self');
    },
    hideOtherSubPane( event ) {
      if(event.currentTarget.id === 'tag-icon') {
        this.setCategoryPaneIsShowing(false)

      }else if(event.currentTarget.id === 'category-icon') {
        this.setIsTagPaneShowing(false)

      }else {
        this.setIsTagPaneShowing(false)
        this.setCategoryPaneIsShowing(false)
      }

    }
  },
  computed: {
    ...mapGetters([
      'isCategoryPaneShowing',
      'isTagPaneShowing',
      'getAccount',
      'needToSave'
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
    width: 60px;

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
    height: 40px;
    width: 40px;
  }
  img.icon:hover{
    cursor: pointer;
  }

  #save-icon.need-to-save img.icon{
    background-color: indianred;
    transition: 0.5s;
    border-radius: 18px;
  }

  div.left-pane-menu-item.up-here img.icon{
    background-color: #e6ffcc;
    transition: 0.5s;

    border-radius: 21px;
  }

  div.intended-blank-space:after{
    content:"";
    display: block;
    height: 200px;
  }


</style>
