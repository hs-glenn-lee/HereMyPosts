<template>
    <router-view/>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'App',
    methods: {
      ...mapActions([
        'syncSign'
      ])
    },
    created () {
      this.syncSign()
    }

  }
</script>

<style>

</style>
