<template>
  <div>
    <h1>test</h1>
    <button @click="test" type="button" value="test">test</button>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {
    name: 'Test',
    data() {
      return {

      }
    },
    methods: {
      ...mapActions([
        'test'
      ])
    },
    components: {

    },
  }
</script>

<style scoped>
.category-root {
  position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;

  z-index: 200;
  height: 100%;
}
</style>
