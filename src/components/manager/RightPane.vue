<template>
  <div class="right-pane">
    <div class="center-block">
      <div class="article-meta">
        <span>카테고리</span>
        <span class="selected-category-name">default</span>
      </div>
      <div class="editor-container">
        <editor></editor>
      </div>
    </div>

  </div>
</template>

<script>
  import editorComp from './editor/Editor'
  export default {
    name: 'EditorComp',
    components: {
      'editor': editorComp
    }
  }
</script>

<style scoped>

  div.right-pane {
    margin-left: 73px;
    width: 100%;
    height: 100%;
  }
  div.editor-container {
    height: 100%;
    /**/
    font: inherit;
  }
  div.article-meta {
    position: relative;
    padding-top: 20px;
    padding-bottom: 20px;
  }

  div.center-block {
    margin: auto;
    width: 1366px;
  }

  span.selected-category-name {
    display: inline-block;
    min-width: 150px;
    height: 2em;
    line-height: 2em;

    text-align: center;
    background-color: #eaeaea;
  }


</style>
<style>
  .mce-tinymce.mce-container.mce-panel {
    border: 0px solid white;
  }
</style>
