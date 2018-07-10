<template>
  <div class="tag-pane"
       v-show="isTagPaneShowing"
       @click.right="function(e){e.preventDefault()}"
       @click="markPass('TagPane')">
    <div class="pane-header">
      <span class="pane-header-title">태그</span>
    </div>

    <div class="close-icon" @click="closeTagPane(false)">
      <img src="@/assets/images/x-icon-30.png" style="width:20px;"/>
    </div>

    <div class="tagged-tag-list">
      <div class="tag-list-label">
        <span v-if="(getArticle)">
          {{getArticle.title}}
        </span>

        글의 태그</div>
      <div
        v-if="getArticleTagCollection"
        class="tag-list">
        <span
              v-for="ta in getArticleTagCollection.tagsArticles"
              class="tag tagged"
              :key="ta.id">{{ta.tag.name}}
          <img
            @click="removeTagFromTaggedList(ta.tag.name)"
            class="remove-tag"
            src="@/assets/images/x-icon-30.png">
        </span>
      </div>
    </div>

    <div class="context-switch-line"> </div>

    <div class="tagger" v-if="getIsSignedIn">
      <div class="tagger-label">
        <span>태그 등록하기</span>
      </div>
      <div v-if="getMyTags">
        <div class="find-tag-input-wrapper">
          <input v-model="inputTagName"
                 class="tag-name-input" type="text"
                 id="tag-name-input">
          <button @click="regTag" type="button" class="reg-tag-button">등록</button>
        </div>
        <div class="my-tag-list">
          <span
                v-bind:tag-name="tagname"
                @click="regTagFromMyTagList"
                v-for="tagname in findTagOfMyTags"
                class="tag tag-candidate">
            {{tagname}}
          </span>
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

      removeTagFromTaggedList (tagName) {
        console.log('removeTagFromTaggedList');

        let col = this.getArticleTagCollection;
        let tag = col.findTag(tagName);

        console.log(col);
        console.log(tag);
        if(tag) {
          this.removeTag(tag);
        }

      },

      regTagFromMyTagList (event) {
        console.log('regTagFromMyTagList')
        let clickedTag = event.currentTarget;
        let tagName = clickedTag.getAttribute('tag-name');
        this.addTag(new Tag(tagName));
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
    position: absolute; left: 60px; top: 0px; right: 0px; bottom: 0px;
    width: 400px;
    border-right: 2px solid #eaeaea;
    border-left: 2px solid #ececec;
    background-color: white;
    z-index: 199;
  }

  div.pane-header {
    margin: 30px 0px 20px 20px;
  }
  span.pane-header-title {
    color: #6A6A6A;
    font-size: 1.3em;
  }

  div.close-icon {
    position: absolute;
    opacity: 0.7;
    display: inline-block;
    top: 18px;
    right: 18px;
  }
  div.close-icon:hover {
    cursor: pointer;
  }

  div.tagged-tag-list {
    padding-left: 20px;
    padding-right: 20px;

    margin-bottom: 20px;

    word-break: break-word;

  }

  span.tag {
    padding: 4px 4px 4px 4px;
    margin: 2px 2px 2px 2px;
    border: 1px solid #c1d9ff;

    background-color: #c1d9ff;
    border-radius: 6px;
    display: inline-block;
  }


  div.tag-list-label {
    color: #6A6A6A;
    padding-bottom: 10px;
  }

  div.context-switch-line {
    border-bottom: 1px solid #aaaaaa;
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
  }

  div.tagger {
    padding-left: 20px;
    padding-right: 20px;
  }

  div.my-tag-list {
    word-break: break-word;
  }

  div.find-tag-input-wrapper {
    margin: 5px 0px 5px 0px;
  }

  #tag-name-input {
    font-size: 1em;
  }

  button.reg-tag-button {
    font-size: 1em;
  }

  img.remove-tag {
    width:  10px;
    height: 10px;
  }
  img.remove-tag:hover {
    cursor: pointer;
  }

</style>
