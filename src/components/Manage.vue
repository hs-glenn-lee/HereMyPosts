<template>
  <div class="manager">
    <nav class="side-bar">
    </nav>
    <div style="width: 100%; height: 100%;">
      <button @click="getMyAccount">test</button>
    </div>

  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Manage',
  methods: {
    ...mapActions([
      'getMyAccount'
    ])
  }
}
</script>

<style scoped>
.manager {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
}
</style>
