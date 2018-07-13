<template>
  <div v-if="getArticle" class="right-pane" >
    <div class="right-pane-wrapper" :style="rightPaneWrapperStyle">
      <div class="center-block">
        <div class="article-meta">

          <div class="article-meta-obj" @click="showCategoryPane">
              <label class="article-meta-label">카테고리</label>
              <span class="selected-category-name"
                    v-if="getSelectedNode">{{getSelectedNode.name}}
              </span>
          </div>
          <span class="h-gap"></span>
          <div class="article-meta-obj" @click="showTagPane">
              <label class="article-meta-label">태그</label>
              <span
                v-if="(getArticleTagCollection) && getArticleTagCollection.tagsArticles.length > 0"
                class="tag-list">
                <span
                  v-for="ta in getArticleTagCollection.tagsArticles.slice(0,4)"
                  class="tag tagged"
                  :key="ta.id">
                  {{ta.tag.name}}
                </span>
                <span v-if="getArticleTagCollection.tagsArticles.length > 4" class="ellipsis"><img style="width:16px;height:16px;vertical-align: middle;" src="@/assets/images/article-list-pane/more-icon-16w16h.png"></span>
              </span>
          </div>
          <div class="title">
            <input class="title-input"
                   type="text"
                   v-model="title"
                   placeholder="제목"/>
          </div>
        </div>

        <div class="editor-container" ><!--:style="editorContainerStyle"-->
          <editor ref="editorComp" :article="getArticle" :editorHeight="editorHeight"></editor>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import editorComp from './editor/Editor'
  import { mapMutations } from 'vuex'
  import { mapGetters } from 'vuex'


  export default {
    name: 'EditorComp',
    data () {
      return {
        'empty-input-style': 'border:none',
        rightPaneWrapperWidth: 0,
        editorHeight: 0
      }
    },
    methods: {
      ...mapMutations([
        'newArticle',
        'getArticle',
        'getCategoryTreeRoot',
        'setCategoryPaneIsShowing',
        'setIsTagPaneShowing'
      ]),
      calcRightPaneWidth () {
        var $divRightPane = window.document.querySelector('div.right-pane')
        this.rightPaneWrapperWidth = $divRightPane.offsetWidth - 60 /*left-pane-width*/;

      },
      calcEditorHeight () {
        console.log('calcEditorHeight')
        var $divRightPane = window.document.querySelector('div.right-pane');
        var $articleMetaDiv = window.document.querySelector('div.article-meta');
        var articleMetaHeight = Math.max( $articleMetaDiv.scrollHeight, $articleMetaDiv.offsetHeight );
        var rightPaneHeight = Math.max( $divRightPane.scrollHeight, $divRightPane.offsetHeight );
        var editorHeight = rightPaneHeight - articleMetaHeight-50 /*editor tool bar height and just a little space*/;
        this.editorHeight = (editorHeight < 0)? 50 : editorHeight;
      },
      showCategoryPane(e) {
        e.stopPropagation();
        this.setCategoryPaneIsShowing(true)

      },
      showTagPane(e) {
        e.stopPropagation();
        this.setIsTagPaneShowing(true)
      }
    },
    created () {

    },
    mounted () {
      this.calcRightPaneWidth();
      this.calcEditorHeight();
      var vm = this;
      window.onresize = function(event) {
          console.log('onresize')
          vm.calcRightPaneWidth();
          vm.calcEditorHeight();
      };
    },
    computed: {
      ...mapGetters([
        'getSelectedNode',
        'getArticleTagCollection'
      ]),
      title: {
        get() {
          return this.$store.getters.getTitle
        },
        set (value) {
          this.$store.commit('setTitle', value)
        }
      },
      rightPaneWrapperStyle () {
        return {
          'width': this.rightPaneWrapperWidth + 'px'
        }
      },
      editorContainerStyle () {
        return {
          'height' : this.editorHeight + 'px'
        }
      }
    },
    components: {
      'editor': editorComp
    },
    watch: {
      /*editorHeight:  function (val, oldVal) {
        console.log('??????????????????????????????????')
        if(val !== oldVal) {
          console.log('editorHeight')
          console.log(val);
          this.$refs.editorComp.setEditorHeight(val);
        }
      }*/
    }
  }
</script>

<style scoped>

  div.right-pane {
    margin-left: 60px;
    width: 100%;
    height: 100%;
    background-color: white;
  }
  div.editor-container {
    height: 100%;
    /**/
    font: inherit;
  }
  div.article-meta {
    position: relative;
    padding-top: 20px;
    padding-bottom: 10px;
  }

  div.center-block {
    margin: auto;
    width: 1366px;
  }

  div.article-meta-obj {
    display: inline-block;
    padding: 4px 8px 4px 5px;
    border-bottom: 1px solid white;
    vertical-align: middle;
  }
  div.article-meta-obj:hover {
    cursor: pointer;
    border-bottom: 1px solid #dfdfdf;
    transition: 0.3s;
  }

  label.article-meta-label {
    color: #5f5f5f;
    font-size: 1.3em;
    line-height: 1.3em;
    vertical-align: middle;

  }
  label.article-meta-label:hover {
    cursor: pointer;
  }
  span.selected-category-name {
    font-size: 1.3em;
    line-height: 1.3em;
    margin-left: 8px;
    vertical-align: middle;
  }
  span.selected-category-name:hover {
    cursor: pointer;
  }
  span.h-gap {
    display: inline-block;
    width:24px;
    height: 12px;
  }

  span.tag-list {
    display: inline;
    margin-left: 8px;

  }
  span.tag-list:hover {
    cursor: pointer;
  }
  span.tag {
    padding: 4px 4px 4px 4px;
    margin-right: 4px;
    border: 1px solid #c1d9ff;
    font-size: 14px;
    display:inline-block;
    background-color: #e7effb;
    border-radius: 6px;
  }
  span.tag:hover {
    cursor: pointer;
  }

  div.title {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  input.title-input {
    width:1352px;
    border: none;
    border-bottom: 1px solid white;
    border-radius: 0px;

    font-size: 1.3em;
    height: 1.3em;
  }
  input.title-input:hover{
    border-bottom: 1px solid #dfdfdf;
    transition: 0.3s;
  }

  input.title-input:focus {
    outline: none !important;
  }

</style>
<style>
  .mce-tinymce.mce-container.mce-panel {
    border: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
  div.mce-edit-area.mce-container.mce-panel.mce-stack-layout-item.mce-last {
    border-width: 0px 0px 0px !important;
  }
</style>
