<template>
  <li
      :id="categoryNode.id"
      class="category-node"
      :class="isSelected">
    <div
      class="node-info">
      <span v-if="categoryNode.hasChild()" class="node-open-flag" @click="onNodeOpenFlagClick">
        <img :class="{hidden: open}" class="category-node-flag" src="@/assets/images/category/close-icon-30w30h.png">
        <img :class="{hidden: !open}" class="category-node-flag" src="@/assets/images/category/open-icon50w50h.png">
      </span>
      <span v-else class="category-node-blank-flag node-open-flag">
        <img class="category-node-flag" src="@/assets/images/category/blank-icon.png"/>
      </span>

      <span class="node-name"
            v-on:click="onNodeNameClick"
            @click.right="onNodeNameRightClick">{{categoryNode.name}}</span>

      <span v-if="!categoryNode.isPublic" class="node-pub">
        <img class="node-pub-icon" src="@/assets/images/category/icons8-lock-30.png"/>
      </span>
    </div>

    <ul v-show="open" v-if="categoryNode.hasChild()">
      <category-node-comp
        class="item"
        v-for="cnode in categoryNode.children"
        :ref="cnode.id"
        :key="cnode.id"
        :categoryNode="cnode"
        :onNodeNameClick="onNodeNameClick"
        :onNodeNameRightClick="onNodeNameRightClick">
      </category-node-comp>
    </ul>
  </li>
</template>

<script>

import {mapMutations} from 'vuex'
import {mapGetters} from 'vuex'


export default {
  name: 'category-node-comp',
  props: {
    'categoryNode': Object,
    onNodeNameClick: Function,
    onNodeNameRightClick: Function
  },
  mounted () {

  },
  data() {
    return {
      open: false
    }
  },
  methods: {
    onNodeOpenFlagClick() {
      this.toggleOpen()
    },
    toggleOpen () {
      this.open = !this.open
    },
    openMe () {
      this.open = true;
    },
    closeMe () {
      this.open = false;
    },
    openChildren () {
      for(var childrenCompRef in this.$refs) {
        this.$refs[childrenCompRef][0].openMe(); /* [0] --- something wrong with v-for and ref ...*/
        this.$refs[childrenCompRef][0].openChildren();
      }
    },
    closeChildren () {
      for(var childrenCompRef in this.$refs) {
        this.$refs[childrenCompRef][0].closeMe();
        this.$refs[childrenCompRef][0].closeChildren();
      }
    }
  },
  computed: {
    ...mapGetters([
      'getSelectedNode'
    ]),
    isSelected () {
      return {
        'selected': this.getSelectedNode === this.categoryNode
      }
    },

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
    width: 10px;
    height: 10px;
  }


  div.node-info {
    display: inline-block;
    vertical-align: middle;
    font-size: 20px;
    line-height: 25px;
    height: 28px;
    padding-left: 5px;
    padding-right: 5px;

    color: #3A3A3A;


    /*nobreak*/
    overflow: visible;
    text-overflow: clip;
    white-space: nowrap;
  }

  li.selected > div.node-info > span.node-name {
    color: #fefefe;
    font-weight: bold;
    background-color: #888888;
    font-size: 20px;
    border-radius: 3px;
  }

  span.node-name{
    padding: 1px 2px 1px 2px;
  }

  ul {
    margin-top: 1px;
    padding-right: 15px;
  }

  span.node-pub {
    vertical-align: middle;
  }
  img.node-pub-icon {
    width: 15px;
    height: 15px;
    opacity: 0.6;
  }
</style>
