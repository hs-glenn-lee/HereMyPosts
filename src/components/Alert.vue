<template>
  <div class="alert">
    <span>{{message}}</span>
  </div>
</template>

<script>
  // alternative for window.alert
export default {
  name: 'Alert',
  props: ['message']
}
</script>

<style scoped>
.alert {

}
</style>
