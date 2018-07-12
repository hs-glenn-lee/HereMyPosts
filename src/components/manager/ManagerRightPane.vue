<template>
  <div v-if="getArticle" class="right-pane" >
    <div class="right-pane-wrapper" :style="rightPaneWrapperStyle">
      <div class="center-block">
        <div class="article-meta">

          <div class="article-meta-obj">
              <label class="article-meta-label">
                카테고리
              </label>
              <span class="selected-category-name"
                    v-if="getSelectedNode">{{getSelectedNode.name}}
              </span>
              <span class="h-gap"></span>
          </div>
          <div class="article-meta-obj">
              <label class="article-meta-label">태그</label>
              <span class="tags">
                  <div
                    v-if="getArticleTagCollection"
                    class="tag-list">
                    <span
                      v-for="ta in getArticleTagCollection.tagsArticles"
                      class="tag tagged"
                      :key="ta.id">
                      {{ta.tag.name}}
                    </span>
                  </div>
              </span>
          </div>
          <div class="title">
            <input class="title-input"
                   type="text"
                   v-model="title"
                   placeholder="제목"/>
          </div>
        </div>

        <div class="editor-container">
          <editor :article="getArticle"></editor>
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
        rightPaneHeight: 0
      }
    },
    methods: {
      ...mapMutations([
        'newArticle',
        'getArticle',
        'getCategoryTreeRoot'
      ]),
      calcRightPaneWidth() {
        var $divRightPane = window.document.querySelector('div.right-pane')
        this.rightPaneWrapperWidth = $divRightPane.offsetWidth - 60 /*left-pane-width*/;
        this.rightPaneHeight = $divRightPane.offsetHeight;
      }
    },
    created () {

    },
    mounted () {
      this.calcRightPaneWidth();
      var vm = this;
      window.onresize = function(event) {
        vm.$nextTick(function() {
          vm.calcRightPaneWidth();
        })

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
      }
    },
    components: {
      'editor': editorComp
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
  }
  div.article-meta-obj:hover {
    border-bottom: 1px solid #dfdfdf;
    transition: 0.3s;
  }

  label.article-meta-label{
    color: #5f5f5f;
    font-size: 1.2em;
    height: 1.3em;
  }
  span.selected-category-name {
    font-size: 1.4em;
    line-height: 1.5em;
    margin-left: 8px;
  }
  span.h-gap {
    display: inline-block;
    width:24px;
    height: 12px;
  }

  div.tag-list {
    display: inline-block;
  }
  span.tag {
    padding: 4px 4px 4px 4px;
    margin: 2px 2px 2px 2px;
    border: 1px solid #c1d9ff;

    background-color: #c1d9ff;
    border-radius: 6px;
    display: inline-block;
  }


  div.title {
    margin-top: 10px;
    margin-bottom: 5px;
  }
  input.title-input {
    width:1352px;
    border: none;
    border-bottom: 1px solid white;

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
