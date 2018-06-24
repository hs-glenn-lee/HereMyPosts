<template>
  <div class="tag-pane"
       v-show="isTagPaneShowing"
       @click.right="function(e){e.preventDefault()}"
       @click="markPass('TagPane')">
    <div class="close-icon" @click="closeTagPane(false)">
      <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
    </div>

    <div class="tagged-tag-list">
      <div class="tag-list-label">이 글의 태그</div>
      <div
        v-if="getArticleTagCollection"
        class="tag-list">
        <span v-for="ta in getArticleTagCollection.tagsArticles"
              class="tag"
              :key="ta.id">{{ta.tag.name}}
        </span>
      </div>
    </div>

    <div class="tagger" v-if="getIsSignedIn">
      <div class="tagger-label">
        <span>태그 등록하기</span>
      </div>
      <div v-if="getMyTags">
        <div class="find-tag-input-wrapper">
          <input v-model="inputTagName"
                 class="tag-name-input" type="text"
                 id="tag-name-input">
          <button @click="regTag" type="button">등록</button>
        </div>
        <div class="my-tag-list">
          <span v-for="tagname in findTagOfMyTags" class="tag">{{tagname}}</span>
        </div>
      </div>
    </div>
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
        inputTagName: ''
      }
    },
    methods: {
      ...mapActions([
        'markPass',
        'addTagToSavedArticle',
        'initMyTags',
        'initArticleTags'
      ]),
      ...mapMutations([
        'setIsTagPaneShowing',
        'addTag',
        'removeTag'
      ]),

      onArticleTitleClick(event) {

      },
      onArticleTitleDoubleClick(event) {

      },
      closeTagPane(event) {
        this.setIsTagPaneShowing(false)
      },

      regTag () {
        this.addTag(new Tag(this.inputTagName));
      },

      removeTag (tag) {
        this.removeTag(tag);
      }

    },
    created () {
    },
    computed: {
      ...mapGetters([
        'isTagPaneShowing',
        'getIsSignedIn',
        'getAccount',
        'getArticleTagCollection',
        'getArticle',
        'getMyTags'
      ]),
      findTagOfMyTags () {
        var word = this.inputTagName;
        var myTags = this.getMyTags;
        var ret = [];
        myTags.forEach(el => {
          if(el.indexOf(word) > -1 || word === '') {
            ret.push(el);
          }
        })
        return ret;
      }
    },
    components: {

    },
    watch: {
      getArticle (val, oldVal) {
        if(val)
          this.initArticleTags()
      },
      getIsSignedIn (val, oldVal) {
        if(val)
          this.initMyTags();
      }
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

</style>
