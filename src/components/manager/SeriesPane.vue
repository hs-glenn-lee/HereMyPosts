<template>
  <div class="series-pane"
       v-show="isSeriesPaneShowing"
       @click.right="function(e){e.preventDefault()}"
       @click="markPass('SeriesPane')">
    <div class="close-icon" @click="closeSeriesPane(false)">
      <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
    </div>

    <div class="series-finder">
      <input class="series-name-input" type="text">
      <button type="button">찾기</button>
    </div>

    <div class="series-creator-container"
        v-if="getIsSignedIn">
      <div class="active-series-creator"
          v-if="isSeriesCreatorActive">
        <input class="series-name-input"
               type="text"
               v-model="seriesToCreate.name">
        <button type="button"
                @click="createSeries">생성</button>
      </div>

      <div v-else
          class="inactive-series-creator">
        <span
          @click="setIsActiveSeriesCreator(true)">새 시리즈 만들기 (+)</span>
      </div>
    </div>

    <div class="series-list-container">
      <series-list
        v-if="seriesList.length > 0"
        :seriesList="seriesList"
        :onSeriesNameRightClick="onSeriesNameRightClick"
        :onSeriesNameClick="onSeriesNameClick"></series-list>
    </div>

   <!-- <c-node-right-click-menu v-bind:is="rightClickMenu"
                             :category-node="rightClickedCategoryNode"
                             :top="rightClickedTop"
                             :left="rightClickedLeft">
    </c-node-right-click-menu>-->

    <div>
      <article-list-pane :onArticleTitleClick="onArticleTitleClick"
                         :onArticleTitleDoubleClick="onArticleTitleDoubleClick"></article-list-pane>
    </div>
  </div>
</template>

<script>
  import SeriesList from '@/components/series/SeriesList.vue';
  import ArticleListPane from '@/components/manager/ArticleListPane.vue'
  import Series from '@/model/Series';
  import api from '@/api/api'
  import PageParameter from '@/model/PageParameter'

  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';

  export default {
    name: "SeriesPane",
    data () {
      return {
        seriesToCreate: new Series(),
        seriesList: [],
        isSeriesCreatorActive: false
      }
    },
    methods: {
      ...mapActions([
        'markPass'
      ]),
      ...mapMutations([
        'setIsSeriesPaneShowing'
      ]),
      setIsActiveSeriesCreator( bool ) {
        this.isSeriesCreatorActive = bool;
      },
      onSeriesNameRightClick (event) {

      },
      onSeriesNameClick (event) {

      },
      onArticleTitleClick(event) {

      },
      onArticleTitleDoubleClick(event) {

      },
      closeSeriesPane(event) {
        this.setIsSeriesPaneShowing(false)
      },
      createSeries () {
        api.createNewSeries(this.seriesToCreate)
          .then( data => {
            this.seriesList.push(data);
            this.setIsActiveSeriesCreator(false);
          })
          .catch( err => {throw err})
      },
      getMySeriesByPage (pageParameter) {
        api.getMySeriesByPage(pageParameter)
          .then(data => {
            this.seriesList = data;
          })
      }
    },
    created () {
      this.getMySeriesByPage(new PageParameter(0,10));
    },
    computed: {
      ...mapGetters([
        'isSeriesPaneShowing',
        'getIsSignedIn'
      ])
    },
    components: {
      'series-list': SeriesList,
      'article-list-pane': ArticleListPane
    }
  }
</script>

<style scoped>
  div.series-pane {
    position: absolute; left: 73px; top: 0px; right: 0px; bottom: 0px;
    width: 400px;
    border-right: 2px solid #eaeaea;
    border-left: 2px solid #ececec;
    background-color: white;
    z-index: 199;
  }
  div.close-icon {
    float:right;
    margin-right: 10px;
    margin-top: 10px;
    opacity: 0.7;

  }
  div.close-icon:hover {
    cursor: pointer;
  }
  div.series-list-container {
    margin-top: 70px;
  }

  div.series-finder {
    margin: 10px 0px 10px 10px;
  }

  div.series-finder input.series-name-input {
    font-size: 1em;
    width: 200px;

    border-color: #eaeaea;

  }

  div.series-finder button {
    font-size: 1em;
  }
</style>
