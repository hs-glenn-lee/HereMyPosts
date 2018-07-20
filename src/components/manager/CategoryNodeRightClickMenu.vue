<template>
  <div :style="menuPositionStyle"
       class="rc-click-menu"
       @click="markPass('CategoryNodeRightClickMenu')">
    <div class="rc-clicked-node-name"><span >{{categoryNode.name}}</span></div>
    <ul class="menu-list" v-if="operation === ''">
      <li class="menu-list-item"
          @click="showCreateCategoryNodeComp">아래에 새 카테고리 생성</li>
      <li class="menu-list-item">이 카테고리 삭제</li>

      <li v-if="categoryNode.isPublic" class="menu-list-item">비공개하기</li>
      <li v-else class="menu-list-item">공개하기</li>
    </ul>

    <create-category-node-comp
      @newCategoryCreated="propagateVueEvent"
      v-if="operation ==='createCategoryNode'"
      :category-node="categoryNode"></create-category-node-comp>
  </div>

</template>

<script>
import CreateCategoryNodeComp from './CreateCategoryNodeComp'
import {mapActions} from 'vuex'
  export default {
    name: 'CNodeRightClickMenu',
    props: [
      'categoryNode',
      'top',
      'left'
    ],
    data () {
      return {
        operation: ''
      }
    },
    methods: {
      ...mapActions([
        'markPass'
      ]),
      propagateVueEvent () {
        this.$emit('newCategoryCreated')
      },
      showCreateCategoryNodeComp() {
        this.operation = 'createCategoryNode'
      }
    },
    computed: {
      menuPositionStyle() {
        return 'top:'+(this.top)+'px;'+'left:'+(this.left)+'px;';
      }
    },
    components: {
      'create-category-node-comp': CreateCategoryNodeComp
    },
    watch: {
      categoryNode (val, oldVal) {
        if(val !== oldVal) {
          this.operation = ''
        }
      }
    }

  }
</script>

<style scoped>
  div.rc-click-menu {
    background-color: #f8f8f8;
    border: 1px solid #ececec;

    z-index: 201;
    position: absolute;

  }

  div.rc-click-menu{
    padding: 10px 10px 5px 10px;
  }

  li.menu-list-item {
    /*font, line-height*/
    font-size: 0.9em;
    height: 0.9em;
    vertical-align: middle;

    margin-bottom:7px;
    margin-top: 7px;
  }

  div.rc-clicked-node-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }
</style>
