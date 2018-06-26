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
          src="@/assets/images/left-pane-icons/newdocument-icon-50w50h.png"
        />
      </div>
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
        <img
          id="category-icon"
          @click="onClickCategoryMenu"
          class="icon"
          src="@/assets/images/left-pane-icons/category-icon-50w50h.png"/>
      </div>
      <!--<div class="left-pane-menu-item">PUB</div>-->
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
          <img
            id="tag-icon"
            class="icon"
            src="@/assets/images/left-pane-icons/tag-icon-50w50h.png"
            @click="onClickTagMenu"
            @mouseover="onMenuItemMouserOver"
            @mouseleave="onMenuItemMouserLeave"/>
      </div>
      <div class="left-pane-menu-item"
           id="save-icon"
           @click="onClickSaveMenu"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          class="icon"
          src="@/assets/images/left-pane-icons/save-icon-50w50h.png"/>
      </div>


      <div class="intended-blank-space"></div>

      <div class="left-pane-menu-item user-menu-item"
           @click="goSettings"
           @mouseover="onMenuItemMouserOver"
           @mouseleave="onMenuItemMouserLeave">
        <img
          id="setting-icon"
          class="icon"
          src="@/assets/images/left-pane-icons/user-icon-50w50h.png"/>
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
      'saveArticleTags'
    ]),
    onClickNewDocumentMenu (event) {
      let account = this.getAccount;
      this.$router.push({
        name: "Manager",
        params: { 'username': account.username}
      });
      this.initManager();
    },
    onClickSaveMenu (event) {
      this.saveArticle().
        then( savedArticle => {
          console.error('after save article');
          this.saveArticleTags(savedArticle)
            .then( () => {
              //router push to saved article and initManager
              let account = this.getAccount;
              this.$router.push({
                name: "ManagerSavedArticle",
                params: { 'username': account.username, 'articleId': savedArticle.id }
              });
              this.initManager(savedArticle.id);
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
      'getAccount'
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
    height: 35px;
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
