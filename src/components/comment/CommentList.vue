<template>
  <div class="comment-list-container">
    <div
      v-if="comments.length < 1"
      class="alt-comment-list">
      <div @click="showComments" class="show-comment-button psd-hover-cursor-pointer" >
        <span>{{altCommentListMessage}}</span>
      </div>
    </div>

    <ul ref="$commentList" class="comment-list">
      <comment-list-item
        v-if="comments.length > 0"
        v-for="comment in comments"
        v-bind:id="comment.id"
        :focusedComment="focusing"
        :comment="comment"
        :key="comment.id"></comment-list-item>
    </ul>

  </div>
</template>

<script>
  import CommentListItem from './CommentListItem'

  import { mapActions } from 'vuex'
  import { mapGetters } from 'vuex'
  import api from '@/api/api'

  export default {
    name: "CommentList",
    props: {
      article: Object
    },
    data () {
      return {
        countComments: -1,
        comments: [],
        focusing: null
      }
    },
    methods: {
      ...mapActions([

      ]),
      showComments () {
        return this.getCommentsOfArticle();
      },
      getCountCommentsOfArticle () {
        return api.getCountCommentsOfArticle(this.article.id)
          .then( data => {
            this.countComments = data.count;
          })
      },
      getCommentsOfArticle () {
        return api.getCommentsOfArticle(this.article.id)
          .then(data => {
            this.comments = data;
            this.comments.sort( (a, b) => {
              return (a.createTimestamp > b.createTimestamp) ? 1 : ((a.createTimestamp === b.createTimestamp)) ? 0 : -1;
            });
          })
          .catch(err => {console.error(err)})
      },
      addComment (comment) {
        this.focusing = comment;

        if(this.comments.length > 0) {
          this.comments.push(comment);
          var vm = this;
          this.$nextTick(function () {
            vm.focusOnComment();
          })
        }else {
          this.showComments()
            .then( () => {
              var vm = this;
              this.$nextTick(function () {
                vm.focusOnComment();
              })
            })
        }
      },
      focusOnComment () {
        if(this.focusing) {
          var target = this.$refs.$commentList.querySelector('li[id="'+this.focusing.id+'"]');
          if(target) {
            var container = window.document.querySelector("div.right-pane-wrapper");
            container.scrollTop = target.offsetTop;
          }
        }
      }

    },
    computed: {
      ...mapGetters([

      ]),
      altCommentListMessage () {
        if(this.countComments < 0 ) {
          return ' ';
        }else if(this.countComments == 0){
          return '댓글이 없습니다. 댓글을 작성해 주세요.';
        }else {
          return this.countComments + ' 개의 댓글이 있습니다. 모든 댓글 보기';
        }
      }
    },
    watch: {
      article: function(val,oldVal) {
        if(val) {
          this.getCountCommentsOfArticle();
          this.comments = [];
          this.focusing = null;
        }
      }
    },
    components: {
        'comment-list-item': CommentListItem
    },
    created () {
      this.getCountCommentsOfArticle();
    }
  }
</script>

<style scoped>
  div.comment-list-container {
    min-height: 40px;
    margin-bottom: 16px;
  }

  div.alt-comment-list {
    margin-bottom: 16px;
  }
  div.show-comment-button {
    background-color: #fff;
    color: #4a4a4a;
    border: 1px solid #EFEB95;
    border-radius: 4px;

    font-size: 1em;

    text-align: center;
    vertical-align: middle;

    height: 64px;
    line-height: 64px;

    box-shadow: 0 1px 4px #FBF9D0;
  }
</style>
