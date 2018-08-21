<template>
  <div class="manager-left-pane">
    <nav class="left-pane-menu">
      <div class="flex-menu">
        <div class="flex-menu-group">
          <div class="menu-group">
            <div @click="goHome"class="global-logo-picto psd-hover-cursor-pointer" style="margin-top:8px; margin-bottom: 16px;">
              <img src="@/assets/images/logo-initial-55w55h.png"/>
            </div>
            <div class="left-pane-menu-item"
                 @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
              <img
                id="new-document-icon"
                @click="onClickNewDocumentMenu"
                class="icon psd-hover-cursor-pointer"
                src="@/assets/images/left-pane-icons/new-document-icon-40w40h.png"
              />
            </div>
            <div class="left-pane-menu-item"
                 @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
              <img
                id="category-icon"
                @click="onClickCategoryMenu"
                class="icon psd-hover-cursor-pointer"
                src="@/assets/images/left-pane-icons/category-icon-40w40h.png"/>
            </div>

            <div class="left-pane-menu-item"
                 @mouseover="onMenuItemMouserOver"
                 @mouseleave="onMenuItemMouserLeave">
              <img
                id="tag-icon"
                class="icon psd-hover-cursor-pointer"
                src="@/assets/images/left-pane-icons/tag-icon-40w40h.png"
                @click="onClickTagMenu"
                @mouseover="onMenuItemMouserOver"
                @mouseleave="onMenuItemMouserLeave"/>
            </div>
            <div
              id="save-icon"
              class="left-pane-menu-item"
              :class="{'need-to-save':needToSave}"
              @click="onClickSaveMenu"
              @mouseover="onMenuItemMouserOver"
              @mouseleave="onMenuItemMouserLeave">
              <img
                class="icon psd-hover-cursor-pointer"
                src="@/assets/images/left-pane-icons/save-icon-40w40h.png"/>
            </div>
          </div>
        </div>

        <div class="flex-menu-group">
          <div class="menu-group">
            <div class="left-pane-menu-item user-menu-item flex-bottom"
                 @click="goSettings"
                 @mouseover="onMenuItemMouserOver"
                 @mouseleave="onMenuItemMouserLeave">
              <img
                id="setting-icon"
                class="icon psd-hover-cursor-pointer"
                src="@/assets/images/left-pane-icons/settings-icon-40w40h.png"/>
            </div>
          </div>
        </div>

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
      'setIsTagPaneShowing',
      'showAlert'
    ]),
    ...mapActions([
      'test',
      'saveArticle',
      'initManager',
      'updateArticleTags',
      'newArticle',
      'loadSavedArticle',
      'initManager'
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
        .catch( err => {
          this.showAlert(err.message);
        })
    },
    onClickCategoryMenu (event) {
      //toggle category pane show
      event.stopPropagation();//because of check/mark pass
      var cur = this.isCategoryPaneShowing;
      this.setCategoryPaneIsShowing(!cur);
      this.hideOtherSubPane('category-pane');
    },
    onClickTagMenu (event) {
      //toggle tag pane show
      event.stopPropagation();//because of check/mark pass
      var cur = this.isTagPaneShowing;
      this.setIsTagPaneShowing(!cur);
      this.hideOtherSubPane('tag-pane');
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
    goHome () {
      window.location.href = '/'
    },
    showTagPaneExc (evt) {
      evt.stopPropagation();
      this.setIsTagPaneShowing(true);
      this.hideOtherSubPane('tag-pane');
    },
    showCategoryPaneExc (evt) {
      evt.stopPropagation();
      this.setCategoryPaneIsShowing(true);
      this.hideOtherSubPane('category-pane');
    },
    hideOtherSubPane( showingTarget ) {
      if(showingTarget === 'tag-pane') {
        this.setCategoryPaneIsShowing(false)

      }else if(showingTarget === 'category-pane') {
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
  div.manager-left-pane {
    left: 0;
    width: 60px;
    border-right: 1px solid #ececec;
    height: 100%;
    z-index: 200;
    position: absolute;
    background-color: #f8f8f8;
  }

  nav.left-pane-menu {
    height: 100%;
  }

  div.flex-menu {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    height: 100%; /*TODO set computed height*/
  }

  .flex-menu-group {
    display:flex;
  }
  div.menu-group {
    margin: auto;
  }

  div.left-pane-menu-item {
    display: block;
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  img.icon {
    height: 40px;
    width: 40px;
    opacity: 0.6;
  }

  #save-icon.need-to-save img.icon{
    background-color: indianred;
    transition: 0.5s;
    opacity:0.9;
    border-radius: 18px;

  }

  div.left-pane-menu-item.up-here img.icon{
    background-color: #fff;
    transition: 0.5s;
    opacity: 1;
    border-radius: 21px;
  }

</style>
