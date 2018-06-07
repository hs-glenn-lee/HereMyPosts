<template>
  <li class="series-list-item">
    <div class="series-name">{{series.name}}</div>
  </li>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'

  export default {
    name: "SeriesListItem",
    props: {
      series: Object
    },
    data () {
      return {}
    },
    methods: {
      ...mapActions([

      ])
    },
    computed: {
      ...mapGetters([

      ])
    },
    created() {

    }
  }
</script>

<style scoped>

</style>
