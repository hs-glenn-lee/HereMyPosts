<template>
  <textarea id="editor">{{getContent}}</textarea>
</template>

<script>
  import tinymce from 'tinymce/tinymce'

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

export default {
  name: 'Manage',
  data () {
    return {}
  },
  mounted() {
    this.init()
  },
  computed : {
    ...mapGetters([
      'getContent'
    ])
  },
  methods: {

    init () {
      /*console.log(this)*/

      langpack(tinymce) //set Laguage

      var vm = this;

      tinymce.init({
        selector: '#editor',
        laguage: 'ko_KR',
        height: 822,
        width: 1366,
        branding: false,
        theme: 'modern',
        plugins: 'preview fullpage autolink visualblocks fullscreen image link media codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists textcolor wordcount imagetools  contextmenu colorpicker textpattern help',
        toolbar1: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | fontselect fontsizeselect | removeformat',
        statusbar: false,
        image_advtab: true,
        font_formats: '나눔손글씨=NanumBrush;나눔고딕=NanumGothic;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings,zapf dingbats',
        content_css: [
          //'//@/assets/css/fonts/nanumgothic/font-nanumbrush.css',
          //`static/css/fonts/nanumgothic/font-nanumbrush.css`
          //'font-nanumbrush.css'
          //'.'+t
        ],//iframe을 뚫기 때문에 content_css에 ifr안에 적용되는 css를 넣어야한다.

        images_upload_url: 'http://localhost:8080/article/resources/image',


        image_title: true,
        // enable automatic uploads of images represented by blob or data URIs
        automatic_uploads: false,

        file_picker_types: 'image',
        // and here's our custom image picker
        file_picker_callback: function(cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('accept', 'image/*');

          // Note: In modern browsers input[type="file"] is functional without
          // even adding it to the DOM, but that might not be the case in some older
          // or quirky browsers like IE, so you might want to add it to the DOM
          // just in case, and visually hide it. And do not forget do remove it
          // once you do not need it anymore.

          input.onchange = function() {
            var file = this.files[0];

            var reader = new FileReader();
            reader.onload = function () {
              // Note: Now we need to register the blob in TinyMCEs image blob
              // registry. In the next release this part hopefully won't be
              // necessary, as we are looking to handle it internally.
              var id = 'blobid' + (new Date()).getTime();
              var blobCache =  tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);

              // call the callback and populate the Title field with the file name
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
          };

          input.click();
        },
        init_instance_callback: function(editor) {
          const _contentCssText = require('!!css-to-string-loader!css-loader!./content.css')
          editor.dom.addStyle(_contentCssText);
        },
        setup: function(editor) {
          // init tinymce
          editor.on('init', function () {
            //console.log(vm.getContent);
            //tinymce.get('editor').setContent(vm.$store.getters.getArticle);
            /*console.log(vm.$store.getters.getArticle)*/
          });

          // when typing keyup event
          editor.on('keyup', function () {
            vm.$store.commit('setContent',editor.getContent({ format: 'raw' }));
            /*console.log(editor.getContent({ format: 'raw' }))*/
          });

        }

      });


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
