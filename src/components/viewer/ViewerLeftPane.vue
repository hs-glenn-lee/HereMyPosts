<template>
  <div>
    <nav class="left-pane-menu" style="margin-top:10px; margin-bottom: 30px;">
      <div class="global-logo-picto" ><img src="@/assets/images/icon-picto-86w87h.png" style="width:50px;"/></div>
      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
        <img
          @click="toggleCategoryPane"
          class="icon"
          src="@/assets/images/left-pane-icons/50w_category_icon.png"/>
      </div>

      <!--<button type="button" @click="test">test</button>-->
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
    name: 'Manage',
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
