<template>
  <div class="tag-pane"
       v-show="isTagPaneShowing"
       @click.right="function(e){e.preventDefault()}"
       @click="markPass('TagPane')">
    <div class="close-icon" @click="closeTagPane(false)">
      <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
    </div>

    <div
      v-if="getIsSignedIn && (getArticle) "
      class="tagged-tag-list">
      <div class="tag-list-label">이 글의 태그</div>
        <span v-for="tag in getArticleTags" class="tag" :key="tag.id">{{tag.name}}</span>
    </div>

    <div class="tagger">
      <div class="tagger-label">
        <span>태그 등록하기</span>
      </div>
      <div class="find-tag-input-wrapper">
        <input v-model="tagNameInput"
               class="tag-name-input" type="text"
               id="tag-name-input">
        <button @click="addNewTagToArticle" type="button">등록</button>
      </div>
      <div class="my-tag-list">
        <!--<span class="tag"></span>-->
      </div>
    </div>


<!--    <div>
      <article-list-pane :onArticleTitleClick="onArticleTitleClick"
                         :onArticleTitleDoubleClick="onArticleTitleDoubleClick"></article-list-pane>
    </div>-->
  </div>
</template>

<script>

  import api from '@/api/api'
  import PageParameter from '@/model/PageParameter'
  import Tag from '@/model/tag/Tag.js'
  import TagArticle from '@/model/tag/TagArticle.js'
  import { mapMutations } from 'vuex';
  import { mapGetters } from 'vuex';
  import { mapActions } from 'vuex';

  export default {
    name: "TagPane",
    data () {
      return {
        tagNameInput: ''
      }
    },
    methods: {
      ...mapActions([
        'markPass',
        'addTagToArticle'
      ]),
      ...mapMutations([
        'setIsTagPaneShowing',
        'addTagToArticleTags'
      ]),

      onArticleTitleClick(event) {

      },
      onArticleTitleDoubleClick(event) {

      },
      closeTagPane(event) {
        this.setIsTagPaneShowing(false)
      },

      addNewTagToArticle () {
        var tag = new Tag(undefined, this.tagNameInput, undefined, this.account);
        if(this.getArticle.id) {
          let tagArticle = new TagArticle(undefined, this.getArticle, tag);
          this.addTagToArticle(tagArticle)
        }else {
          this.addTagToArticleTags(tag);
        }
      }
    },
    created () {
      if(this.getArticle && this.getIsSignedIn ) {

      }
    },
    computed: {
      ...mapGetters([
        'isTagPaneShowing',
        'getIsSignedIn',
        'getAccount',
        'getArticleTags',
        'getArticle'
      ])
    },
    components: {

    }
  }
</script>

<style scoped>
  div.tag-pane {
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
