<template>
  <div class="block-container" :style="menuPositionStyle" style="width:360px;">
      <input v-model="newCategoryName"
             type="text"
             placeholder="카테고리 이름">
      <button @click="addChildCategoryNode" type="button">생성</button>
      <span class="validating-msg"
            :class="{blink:isValid}">&nbsp{{validatingMsg}}</span>
  </div>
</template>

<script>
  import api from '@/api/api'
  import Category from '@/model/Category'
  import CategoryNodeClass from '@/model/category-tree/category-node'
  export default {
    name: 'CNodeRightClickMenu',
    props: [
      'categoryNode'
    ],
    data () {
      return {
        newCategoryName: '',
        errorMessage: ' ',
        isValid: false
      }
    },
    methods: {
      addChildCategoryNode() {
        if(this.newCategoryName === '') {
          var vm =  this;
          this.validatingMsg = '이름을 입력해 주세요';
          this.isValid = false;
          return;
        }

        var parentNode = this.categoryNode;
        var newCategory = new Category(null, parentNode.id, this.newCategoryName, parentNode.children.length, false, false);


        if(!this.categoryNode.validNewCategoryNameAsChild(newCategory)) {
          var vm =  this;
          this.validatingMsg = '이미 하위에 있는 카테고리 이름입니다.';
          this.isValid = false;
        }


        api.createCategory(newCategory)
          .then( data => {
            parentNode.addChild(new CategoryNodeClass(data, parentNode));
          });

        this.$emit('newCategoryCreated');
      }
    },
    computed: {
      menuPositionStyle() {
        return 'top:'+(this.top)+'px;'+'left:'+(this.left)+'px;';
      }
    }

  }
</script>

<style scoped>
  input {
    display: inline-block;
    background-color: white;
    width: 280px;
  }
  button {
    display: inline-block;
  }

  span.validating-msg {
    display: block;
    margin-top: 5px;
    font-color: red;
  }

</style>
