<template>
  <div>
    <nav class="left-pane-menu">
      <div class="global-logo-picto" style="margin-top:8px; margin-bottom: 16px;">
        <img src="@/assets/images/logo-initial-55w55h.png"/>
      </div>

      <div class="left-pane-menu-item"
           @mouseover="onMenuItemMouserOver" @mouseleave="onMenuItemMouserLeave">
        <img
          tool-tip="카테고리"
          @click="onClickCategoryMenu"
          class="icon psd-hover-cursor-pointer"
          src="@/assets/images/left-pane-icons/category-icon-40w40h.png"/>
        <!--<span class="r-tool-tip">카테고리</span>-->
      </div>
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

  import CategoryPane from '@/components/viewer/CategoryPane.vue'

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

      ]),
      onClickCategoryMenu (event) {
        event.stopPropagation();// because of check/mark pass

        var cur = this.isCategoryPaneShowing;
        this.setCategoryPaneIsShowing(!cur);
      },
      onMenuItemMouserOver (event ) {
        event.currentTarget.classList.add('up-here')
        /*event.currentTarget.querySelector('span.r-tool-tip').classList.add('active')*/
      },
      onMenuItemMouserLeave (event ) {
        event.currentTarget.classList.remove('up-here')
        /*event.currentTarget.querySelector('span.r-tool-tip').classList.remove('active')*/
      }
    },
    computed: {
      ...mapGetters([
        'isCategoryPaneShowing'
      ])
    },
    components: {
      'category-pane': CategoryPane
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
  nav.left-pane-menu {
    height: 100%;
  }
  div.left-pane-menu-item {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;
  }

  div.left-pane-menu-item img.icon{
    border-radius: 50%;
  }

  div.left-pane-menu-item.up-here > img.icon{
    background-color: #fff;
    transition: 0.5s;
    border-radius: 50%;
  }

  /*span.r-tool-tip {
    display:none;
    position: absolute;
    left: 92%;
    width: 100px;
    height: 1em;

    background-color: black;
    color: #fff;

    padding: 5px 0;
    border-radius: 6px;
    text-align: center;

    margin-top: 6px;
    opacity: 0.5;
    visibility: hidden;
  }

  div.left-pane-menu-item > span.r-tool-tip.active {
    visibility: visible;
    display: inline;
    opacity:1;
    transition: visibility 0s, opacity 0.5s linear;
  }*/


  img.icon {
    height: 40px;
    width: 40px;
  }

</style>
