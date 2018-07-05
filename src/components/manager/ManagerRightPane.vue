<template>
  <div v-if="getArticle" class="right-pane">
    <div class="center-block">
      <div class="article-meta">

        <div class="article-meta-category">
          <span class="article-meta-category-wrapper">
            <label class="article-meta-label">카테고리</label>
            <span class="selected-category-name">default</span>
            <label class="article-meta-label">태그</label>
            <span class="tags">
              <span class="tag">태그1</span>
            </span>
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
</template>

<script>
  import editorComp from './editor/Editor'
  import { mapMutations } from 'vuex'


  export default {
    name: 'EditorComp',
    data () {
      return {
        'empty-input-style': 'border:none'
      }
    },
    methods: {
      ...mapMutations([
        'newArticle',
        'getArticle',
        'getCategoryTreeRoot'
      ])
    },
    created () {

    },
    computed: {
      title: {
        get() {
          return this.$store.getters.getTitle
        },
        set (value) {
          this.$store.commit('setTitle', value)
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

  div.article-meta-category {
    height:2em;
  }

  span.article-meta-category-wrapper {
    padding: 4px 8px 4px 5px;
    border-bottom: 1px solid white;
  }
  span.article-meta-category-wrapper:hover {
    border-bottom: 1px solid #dfdfdf;
    transition: 0.3s;
  }

  span.selected-category-name {
    font-size: 1.4em;
    line-height: 1.5em;
    margin-left: 8px;
  }

  label.article-meta-label{
    color: #5f5f5f;
    font-size: 1.2em;
    height: 1.3em;

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
