<template>
  <li>
    <div
      :class="{bold: categoryNode.hasChild()}"
      @click="toggle">
      {{categoryNode.name}}
      <span v-if="categoryNode.hasChild()">[{{open ? '-' : '+'}}]</span>
    </div>
    <ul v-show="open" v-if="categoryNode.hasChild()">
      <item
        class="item"
        v-for="cnode in categoryNode.children"
        :categoryNode="cnode">
      </item>
    </ul>
  </li>
</template>

<script>
import CategoryTree from './CategoryNode'
export default {
  name: 'CategoryNode',
  props: [
    'categoryNode'
  ],
  data() {
    return {
      open: false
    }
  },
  method: {
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
