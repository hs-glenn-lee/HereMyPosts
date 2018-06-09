<template>
  <div class="series-pane"
       v-show="isTagPaneShowing"
       @click.right="function(e){e.preventDefault()}"
       @click="markPass('TagPane')">
    <div class="close-icon" @click="closeTagPane(false)">
      <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
    </div>

<!--
    <div class="series-list-container">
      <series-list
        v-if="seriesList.length > 0"
        :seriesList="seriesList"
        :onSeriesNameRightClick="onSeriesNameRightClick"
        :onSeriesNameClick="onSeriesNameClick"></series-list>
    </div>
-->

   <!-- <c-node-right-click-menu v-bind:is="rightClickMenu"
                             :category-node="rightClickedCategoryNode"
                             :top="rightClickedTop"
                             :left="rightClickedLeft">
    </c-node-right-click-menu>-->

<!--    <div>
      <article-list-pane :onArticleTitleClick="onArticleTitleClick"
                         :onArticleTitleDoubleClick="onArticleTitleDoubleClick"></article-list-pane>
    </div>-->
  </div>
</template>

<script>

  import api from '@/api/api'
  import PageParameter from '@/model/PageParameter'

  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';

  export default {
    name: "TagPane",
    data () {
      return {
        tagToCreate: new Series()
      }
    },
    methods: {
      ...mapActions([
        'markPass'
      ]),
      ...mapMutations([
        'setIsTagPaneShowing'
      ]),

      onTagNameRightClick (event) {

      },
      onTagNameClick (event) {

      },
      onArticleTitleClick(event) {

      },
      onArticleTitleDoubleClick(event) {

      },
      closeTagPane(event) {
        this.setIsTagPaneShowing(false)
      }
    },
    created () {

    },
    computed: {
      ...mapGetters([
        'isTagPaneShowing',
        'getIsSignedIn'
      ])
    },
    components: {

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
/*  div.series-list-container {
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
  }*/
</style>
