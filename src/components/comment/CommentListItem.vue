<template>
  <li class="comment-list-item" v-bind:id="comment.id" :class="{'focused': isFocused }">
    <div class="comment-meta">
      <div class="author-profile-picture" :style="authorProfilePictureStyle"></div>
      <div>
        <div class="author-name user-select-text">{{comment.authorName}}</div>
        <div class="create-time">{{new Date(comment.createTimestamp).toLocaleDateString()}}</div>
      </div>
      <div class="buttons">
        <div v-if="!isDeleteFormActive" @click="setIsDeleteFormActive(true)"
             class="delete-button button"></div>
      </div>
      <div v-if="isDeleteFormActive" class="delete-form">
        <div v-if="comment.isAnonymous">
          <input class="password-for-deletion" type="password" placeholder="비밀번호" >
          <button class="delete-button" type="button">삭제</button>
        </div>
        <div v-else>
          <span>댓글을 삭제하시겠습니까?</span>
          <button class="delete-button" type="button">삭제</button>
        </div>
      </div>
    </div>
    <div class="content user-select-text">{{comment.content}}</div>
  </li>
</template>

<script>
  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  export default {
    name: "CommentListItem",
    data() {
      return {
        isDeleteFormActive: false
      }
    },
    props: {
      comment: Object,
      focusingComment: Object
    },
    methods: {
      ...mapActions([

      ]),
      setIsDeleteFormActive(bool) {
        this.isDeleteFormActive = bool;
      }
    },
    computed: {
      ...mapGetters([
      ]),
      authorProfilePictureStyle () {
        return {
          'background-image': 'url("' + this.profilePictureUrl + '")'
        }
      },
      profilePictureUrl () {
        if(this.comment.profilePictureFileId) {
          return '/uploaded-image/' + this.comment.profilePictureFileId
        }else {
          return ''
        }
      },
      isFocused () {
        if(this.focusingComment) {
          this.focusingComment.id === this.comment.id;
        }else {
          return false;
        }
      }
    },
    components: {

    },
    created() {
      console.log(this.comment)
    }
  }
</script>

<style scoped>
  li.comment-list-item {
    margin-bottom: 1px;
    /*background-color: #fff;*/
    padding: 16px;
    border-bottom: 1px solid #EFEB95;
  }
  li.comment-list-item:first-child {
    border-top: 1px solid #EFEB95;
  }
  li.comment-list-item.focused {
    background-color: #EFEB95;
    transition: 1s;
  }
  div.comment-meta {
    display:flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 16px;
  }

  div.comment-meta > div.author-profile-picture{
    background: #9e9e9e no-repeat center;
    background-size: 40px;
    border-radius: 50%;
    height: 40px;
    width: 40px;

    margin-right: 8px;

    display: inline-block;
  }

  div.comment-meta  div.author-name{
    color: #4a4a4a;
    margin-right: 8px;
    margin-bottom: 4px;
  }

  div.comment-meta  div.create-time {
    font-size: 0.7em;
    color: #8a8a8a;
  }

  div.buttons {
    margin-left: 16px;
  }

  div.delete-button {
    background-size: 14px 14px;
    background-image: url(../../assets/images/article-list-pane/trash-24w24h.png);
    width: 14px;
    height: 14px;

    cursor: pointer;

    opacity: 0.5;
  }
  div.delete-button:hover {
    background-image: url(../../assets/images/article-list-pane/trash-on-hover-24w24h.png);
    opacity: 0.7;
  }
  input.password-for-deletion {
    font-size: 1em;
    padding: 4px;
    border-radius: 4px;
  }



  button.delete-button {
    font-size: 1em;
    background-color: #fff;
    color: #4a4a4a;
    border: 1px solid #bcbcbc;
  }

</style>
