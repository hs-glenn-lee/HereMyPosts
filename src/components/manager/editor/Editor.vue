<template>
  <div>
    <textarea id="editor">{{getContent}}</textarea>
  </div>
</template>

<script>
  import tinymce from 'tinymce/tinymce'
  import api from '@/api/api'

  import 'tinymce/themes/modern/theme';

  // Any plugins you want to use has to be imported
  import 'tinymce/plugins/advlist';
  import 'tinymce/plugins/wordcount';
  import 'tinymce/plugins/autolink';
  import 'tinymce/plugins/autosave';
  import 'tinymce/plugins/charmap';
  import 'tinymce/plugins/codesample';
  import 'tinymce/plugins/contextmenu';
  import 'tinymce/plugins/emoticons';
  import 'tinymce/plugins/fullscreen';
  import 'tinymce/plugins/hr';
  import 'tinymce/plugins/imagetools';
  import 'tinymce/plugins/insertdatetime';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/noneditable';
  import 'tinymce/plugins/paste';
  import 'tinymce/plugins/print';
  import 'tinymce/plugins/searchreplace';
  import 'tinymce/plugins/tabfocus';
  import 'tinymce/plugins/template';
  import 'tinymce/plugins/textpattern';
  import 'tinymce/plugins/visualblocks';
  import 'tinymce/plugins/anchor';
  import 'tinymce/plugins/autoresize';
  import 'tinymce/plugins/bbcode';
  import 'tinymce/plugins/code';
  import 'tinymce/plugins/colorpicker';
  import 'tinymce/plugins/directionality';
  import 'tinymce/plugins/fullpage';
  import 'tinymce/plugins/help';
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/importcss';
  import 'tinymce/plugins/legacyoutput';
  import 'tinymce/plugins/lists';
  import 'tinymce/plugins/nonbreaking';
  import 'tinymce/plugins/pagebreak';
  import 'tinymce/plugins/preview';
  import 'tinymce/plugins/save';
  import 'tinymce/plugins/spellchecker';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/textcolor';
  import 'tinymce/plugins/toc';
  import 'tinymce/plugins/visualchars';

  import 'tinymce/skins/lightgray/skin.min.css'

  import langpack from './ko_KR'

  //import nanumGothicFontURL from '@/assets/css/fonts/nanumgothic/font-nanumbrush.css'
  import { mapGetters } from 'vuex'
  import validator from '@/model/validator/validator.js'
export default {
  name: 'Manage',
  data () {
    return {
      tinymceEditor: null,
      editorWidth: 1280+33
    }
  },
  props: ['editorHeight'],
  mounted() {
    this.init()
  },
  computed : {
    ...mapGetters([
      'getContent',
      'getArticle'
    ])
  },
  watch: {
    getArticle () {
      if(this.tinymceEditor) {
        tinyMCE.execCommand('mceRemoveEditor', false, 'editor');
        this.init();
      }
    }
  },
  methods: {
    init () {

      langpack(tinymce) //set Laguage

      var vm = this;
      var codesample_content_css_ = require('!!css-to-string-loader!css-loader!@/assets/prism/prism.css')

      tinymce.init({
        selector: '#editor',
        laguage: 'ko_KR',
        height: 300,
        width: vm.editorWidth,
        branding: false,
        theme: 'modern',
        menu: {
          //: {title: 'Insert', items: 'link media | template hr'}
        },
        plugins: 'preview fullpage autolink visualblocks fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools  contextmenu colorpicker textpattern help code',
        toolbar1: 'insert | fontselect fontsizeselect | bold italic strikethrough forecolor backcolor | alignleft aligncenter alignright alignjustify | formatselect | removeformat | codesample | code | link ',
        statusbar: false,
        image_advtab: true,
        font_formats: '나눔손글씨=NanumBrush;나눔고딕=NanumGothic;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',

        codesample_languages: [
          {text: 'JavaScript', value: 'javascript'},
          {text: 'PHP', value: 'php'},
          {text: 'Ruby', value: 'ruby'},
          {text: 'Python', value: 'python'},
          {text: 'Java', value: 'java'},
          {text: 'C', value: 'c'},
          {text: 'C#', value: 'csharp'},
          {text: 'C++', value: 'cpp'}
        ],
        codesample_content_css: '/front-assets/default-prism.css',
        images_upload_url: '/api/article/resources/image',
        image_title: true,
        automatic_uploads: true,
        file_picker_types: 'image',
        relative_urls : false,
        images_upload_handler: function(blobInfo, success, failure) {
          var formData = new FormData();
          var targetFile = blobInfo.blob();
          validator.validate('MaxUploadImageSize',targetFile);
          formData.append('file', blobInfo.blob(), blobInfo.filename());

          var article = vm.getArticle;
          api.uploadArticleImage(formData, article.id)
            .catch( err => {
              failure(err);
            })
            .then( data => {
              success(data.location);
            })

        },
        init_instance_callback: function(editor) {
          //set content css
          const _contentCssText = require('!!css-to-string-loader!css-loader!./content.css')
          editor.dom.addStyle(_contentCssText);

          vm.tinymceEditor = editor;
          vm.setEditorHeight();
        },
        setup: function(editor) {
          // init tinymce
          editor.on('init', function () {
            tinymce.get('editor').setContent(vm.$store.getters.getContent);
          });

          // when typing keyup event
          /*editor.on('keyup', function () {
            vm.$store.commit('setContent',editor.getContent({ format: 'raw' }));
          });*/

          editor.on('Change', function (e) {
            vm.$store.commit('setContent',editor.getContent({ format: 'raw' }));
          });

        }

      });
    },
    setEditorHeight() {
      console.log('setEditorHeight!!!')
      if(this.tinymceEditor) {
        console.log('setEditorHeight!!!22222222222')
        console.log(this.editorHeight)
        this.tinymceEditor.theme.resizeTo (this.editorWidth, this.editorHeight);
      }
    }
  }
}
</script>

<style scoped>
  .mce-tinymce.mce-container.mce-panel {
    border: 2px dashed blue !important;
  }
  #editor {

  }

</style>
