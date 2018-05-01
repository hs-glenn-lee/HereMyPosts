<template>
  <div class="category-root">
  </div>
</template>

<script>
import {axiosAppJson} from "../model/axios-instances";
import Category from '@/model/Category'

export default {
  name: 'Manage',
  data() {
    return {
      list: {},
      tree: {}
    }
  },
  methods: {
    getAll() {

    }
  }
}
</script>

<style scoped>
.category-root {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
