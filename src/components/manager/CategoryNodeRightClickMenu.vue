<template>
  <div :style="menuPositionStyle"
       class="rc-click-menu"
       @click="markPass('CategoryNodeRightClickMenu')">

    <div class="main-menu">
      <div class="rc-clicked-node-name"><span >{{categoryNode.name}}</span></div>
      <ul class="menu-list" v-if="operation === ''">
        <li class="menu-list-item psd-hover-cursor-pointer"
            @click="operate('create')">아래에 새 카테고리 생성</li>
        <li
          @click="operate('updateName')"
          class="menu-list-item psd-hover-cursor-pointer">이 카테고리 이름 변경</li>
        <li v-if="categoryNode.isPublic" class="menu-list-item psd-hover-cursor-pointer" @click="toggleIsPublic">비공개하기</li>
        <li v-else class="menu-list-item psd-hover-cursor-pointer" @click="toggleIsPublic">공개하기</li>
        <li class="menu-list-item psd-hover-cursor-pointer" @click="removeThisCategory">이 카테고리 삭제</li>
      </ul>
    </div>

    <div class="menu-details">
      <div v-show="operation === 'create'"
           class="detail">
        <div class="block-container"
             :style="menuPositionStyle"
             style="width:360px;">
          <input v-model="newCategoryName"
                 type="text"
                 placeholder="카테고리 이름">
          <button @click="addChildCategoryNode" type="button">생성</button>
          <span class="validating-msg"
                :class="{blink:isValid}">&nbsp{{errorMessage}}</span>
        </div>
      </div>
      <div
        v-show="operation === 'updateName'"
        class="detail">
        <div class="block-container" :style="menuPositionStyle" style="width:360px;">
          <input v-model="newCategoryName"
                 type="text"
                 placeholder="카테고리 이름">
          <button @click="updateCategoryName" type="button">변경</button>
          <span class="validating-msg"
                :class="{blink:isValid}">&nbsp{{errorMessage}}</span>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import CreateCategoryNodeComp from './CreateCategoryNodeComp'
import Category from '@/model/Category'
import CategoryNodeClass from '@/model/category-tree/category-node'

import _ from 'lodash'

import {mapActions, mapGetters} from 'vuex'
  export default {
    name: 'CNodeRightClickMenu',
    props: [
      'categoryNode',
      'top',
      'left'
    ],
    data () {
      return {
        operation: '',
        newCategoryName: '',
        errorMessage: ' ',


        isValid: false
      }
    },
    methods: {
      ...mapActions([
        'markPass',
        'createCategoryNode',
        'updateCategory',
        'removeCategory'
      ]),
      operate(operation) {
        this.operation = operation
      },
      addChildCategoryNode: _.throttle(
        function () {
          this.createCategoryNode({
            newCategoryName: this.newCategoryName,
            parentId: this.categoryNode.id,
            username: this.getAccount.username
          })
            .then(() => {
              this.$emit('operated');
            })
            .catch( err => {
              this.errorMessage = err.message;
            });
        },
        200
      ),
      updateCategoryName: _.throttle(
        function () {
          var tobeCategory = this.categoryNode.cloneAsCategory();
          tobeCategory.name = this.newCategoryName;

          this.updateCategory({
            tobeCategory,
            username: this.getAccount.username
          })
            .then(() => {
              this.$emit('operated');
            })
            .catch( err => {
              this.errorMessage = err.message;
            });
        },
        200
      ),
      toggleIsPublic: _.throttle(
        function () {
          var tobeCategory = this.categoryNode.cloneAsCategory();
          tobeCategory.isPublic = !tobeCategory.isPublic;

          this.updateCategory({
            tobeCategory,
            username: this.getAccount.username
          })
            .then(() => {
              this.$emit('operated');
            })
            .catch( err => {
              this.errorMessage = err.message;
            });
        },
        200
      ),
      removeThisCategory: _.throttle(
        function () {
          var confirm = window.confirm('카테고리를 삭제하시겠습니까? 카테고리를 삭제하면 하위의 카테고리와 포스트가 모두 삭제됩니다.');
          if(confirm) {
            this.removeCategory({
              categoryId:this.categoryNode.id,
              username: this.getAccount.username
            })
              .then(() => {
                this.$emit('operated');
              })
              .catch( err => {
                this.errorMessage = err.message;
                console.error(err)
              });
          }
        },
        200
      )
    },

    computed: {
      ...mapGetters([
        'getAccount'
      ]),
      menuPositionStyle() {
        return 'top:'+(this.top)+'px;'+'left:'+(this.left)+'px;';
      }
    },
    components: {
      'create-category-node-comp': CreateCategoryNodeComp
    },
    watch: {
      categoryNode (val, oldVal) {
        if(val !== oldVal) {
          this.operation = ''
        }
      }
    }

  }
</script>

<style scoped>
  div.rc-click-menu {
    background-color: #f8f8f8;
    border: 2px solid #ececec;
    border-radius: 3px;
    z-index: 201;
    position: absolute;
  }

  div.rc-click-menu{
    padding: 8px;
  }

  li.menu-list-item {
    /*font, line-height*/
    font-size: 0.9em;
    height: 0.9em;
    vertical-align: middle;

    padding-bottom: 4px;
    padding-top: 4px;

    margin-bottom:4px;
    margin-top: 4px;
  }
  li.menu-list-item:hover {
    background-color: #ececec;
  }
  div.rc-clicked-node-name {
    font-size: 1.2em;
    font-weight: bold;
    margin-bottom: 10px;
  }



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
