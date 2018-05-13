<template>
  <li>
    <div
      :class="{bold: categoryNode.hasChild()}"
      v-on:click="toggle">
      {{categoryNode.name}}
      <span v-if="categoryNode.hasChild()">[{{open ? '-' : '+'}}]</span>
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
      open: false
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
.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
