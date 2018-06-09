<template>
  <div class="series-list-container">
    <ul class="series-list">
      <series-list-item
        v-for="series in seriesList"
        :series="series"
        :key="series.id"
        :onSeriesNameRightClick="onSeriesNameRightClick"
        :onSeriesNameClick="onSeriesNameClick">
      </series-list-item>
    </ul>
  </div>
</template>

<script>
  import SeriesListItem from './SeriesListItem'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: "SeriesItem",
    props: {
      seriesList: Array,
      onSeriesNameRightClick: Function,
      onSeriesNameClick: Function
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
    components: {
        'series-list-item': SeriesListItem
    },
    created() {

    }
  }
</script>

<style scoped>
  div.series-list-container {
    /*position: absolute; left: 0px; top: 0px; right: 0px; bottom: 0px;
    overflow: hidden;*/
  }
</style>
