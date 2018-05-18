<template>
  <li class="category-node">
    <div
      class="node-info"
      v-on:click="onNodeClick">

      <span v-if="categoryNode.hasChild()">
        <img :class="{hidden: open}" class="category-node-flag" src="@/assets/images/category/plus-icon-30.png">
        <img :class="{hidden: !open}" class="category-node-flag" src="@/assets/images/category/minus-icon-30.png">
      </span>
      <span v-else class="category-node-blank-flag">
        <img class="category-node-flag" src="@/assets/images/category/blank-icon.png"/>
      </span>

      <span class="node-name">{{categoryNode.name}}</span>

      <span v-if="categoryNode.isPublic" class="node-is-pub">public</span>

    </div>

    <ul v-show="open" v-if="categoryNode.hasChild()">
      <category-node-comp
        class="item"
        v-for="cnode in categoryNode.children"
        :key="cnode.id"
        :categoryNode="cnode">
      </category-node-comp>
    </ul>
  </li>
</template>

<script>

export default {
  name: 'category-node-comp',
  props: [
    'categoryNode'
  ],
  data() {
    return {
      open: false,
    }
  },
  methods: {
    onNodeClick(e) {
      e.currentTarget.parentElement.classList.add('selected');
      this.toggle()
    },
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
  li.category-node {
    margin-left: 22px;

    min-height: 30px;


    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select:none;
    user-select:none;
    -o-user-select:none;

  }

  .hidden {
    display: none;
  }

  img.category-node-flag {
    width: 14px;
    height: 14px;
  }

  li.selected > div.node-info {
    color: #004e8c;
    font-weight: bold;
  }

  div.node-info {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    line-height: 25px;
    height: 28px;
    padding-left: 5px;
    padding-right: 5px;

    color: #AAAAAA;
  }

  ul {
    margin-top: 1px;
  }
</style>
