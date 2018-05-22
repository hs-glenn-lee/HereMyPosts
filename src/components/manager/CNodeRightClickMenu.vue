<template>
  <div :style="coordinate" class="rc-click-menu">
    <div class="rc-clicked-node-name"><span >{{categoryNode.name}}</span></div>
    <ul class="menu-list" v-if="operation === ''">
      <li class="menu-list-item"
          @click="showAddCnodeComp">아래에 새 카테고리 생성</li>
      <li class="menu-list-item">이 카테고리 삭제</li>

      <li v-if="categoryNode.isPublic" class="menu-list-item">비공개하기</li>
      <li v-else class="menu-list-item">공개하기</li>
    </ul>

    <add-cnode-comp
      v-if="operation ==='addCNode'"
      :category-node="categoryNode"></add-cnode-comp>
  </div>

</template>

<script>
import AddCNodeComp from './AddCNodeComp'
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
      showAddCnodeComp() {
        this.operation = 'addCNode'
      }
    },
    computed: {
      coordinate() {
        return 'top:'+(this.top)+'px;'+'left:'+(this.left)+'px;';
      }
    },
    components: {
      'add-cnode-comp': AddCNodeComp
    }

  }
</script>

<style scoped>
  div.rc-click-menu {
    background-color: #f8f8f8;
    border: 1px solid #ececec;
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
