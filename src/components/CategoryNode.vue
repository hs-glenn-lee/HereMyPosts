<template>
  <li class="category-node">
    <div
      :class="{bold: categoryNode.hasChild()}"
      v-on:click="toggle">

      <span v-if="categoryNode.hasChild()">
        <img :class="{hidden: open}" class="category-node-flag" src="@/assets/images/category/plus-icon-30.png">
        <img :class="{hidden: !open}" class="category-node-flag" src="@/assets/images/category/minus-icon-30.png">
      </span>
      <span v-else class="category-node-blank-flag">
        <img class="category-node-flag" src="@/assets/images/category/blank-icon.png"/>
      </span>

      <span class="node-name">{{categoryNode.name}}</span>

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
    toggle () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped>
  li.category-node {
    margin-left: 20px;
    font-size: 20px;
    height: 25px;


    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select:none;
    user-select:none;
    -o-user-select:none;


  }

  li.category-node > div {
    height: 100%;
  }

  li.category-node > div{
    height: 25px;
  }

  .hidden {
    display: none;
  }

  img.category-node-flag {
    width: 14px;
    height: 14px;
  }


</style>
