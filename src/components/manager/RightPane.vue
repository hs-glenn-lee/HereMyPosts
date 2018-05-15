<template>
  <div class="right-pane">
    <div class="center-block">
      <div class="article-meta">
        <span>span</span>
        <button>button</button>
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
  name: 'Manage',
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
  }

  div.center-block {
    margin: auto;
    width: 1366px;
  }

</style>
<style>
  .mce-tinymce.mce-container.mce-panel {
    border: 2px dashed blue !important;
  }
</style>
