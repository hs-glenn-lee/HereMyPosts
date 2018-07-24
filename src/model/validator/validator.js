import api from '@/api/api'
export default {
  constraints: {
    'test': {
      check (val, reject) {
        if(val === undefined) {
          reject('value must not undefined');
        }
      }
    },
    'saveArticle': {
      check (val, reject) {
        var article = val;

        if(article === null || article === undefined) {
          reject('article is falsy.');
        }
        if(article.category === undefined || article.category === null) {
          reject('카테고리를 선택해 주세요')
        }
        if(article.author === undefined || article.author === null) {
          reject('로그아웃 되었습니다.')
        }
        if(article.title.length === 0) {
          reject('제목을 입력해 주세요.')
        }
      }
    },
    'writeComment': {
      check (val, reject) {
        var comment = val;
        if(comment === undefined || comment === null)
          reject('작성된 댓글이 없습니다.')

        if(comment.isAnonymous) {
          if(comment.authorName === undefined || comment.authorName == null || comment.authorName === '') {
            reject('댓글작성자 이름을 입력해주세요.')
          }
          if(comment.anonymousPassword === undefined || comment.anonymousPassword === '' || comment.anonymousPassword === null) {
            reject('댓글 비밀번호를 입력해주세요.')
          }
        }else {

        }

        if(comment.content) {
          if(comment.content === '')
            reject('댓글 내용을 입력해주세요.')
        }else {
          reject('댓글 내용을 입력해주세요.')
        }

      }
    },
    'validateUsername': {
      promisedCheck (val) {
        if(val === '' || val === undefined || val === null) {
          return Promise.reject('사용자명을 입력해주세요.');
        }

        if(val.length < 3) {
          return Promise.reject('사용자명은 세글자 이상되어야합니다.');
        }

        //policy white list : alphanumeric . - _
        //following regex return true if there is at leaset one invalid character
        var regex = /[^0-9A-Za-z_\-.]/;

        if(regex.test(val)) {
          return Promise.reject('허용되는 특수문자 : -_.')
        }

        return api.isUniqueNewUsername(val)
          .then(ret => {
            if(ret) {
              return Promise.resolve('good!')
            }else {
              return Promise.reject('이미 사용중인 사용자명입니다.');
            }
          })
      }
    },
    'validateEmail':  {
      promisedCheck (email) {
        var eRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        var valid = eRegex.test(String(email).toLowerCase())
        if(!valid) {
          return Promise.reject('적합한 이메일 형식이 아닙니다.')
        }

        return api.isUniqueNewEmail(email)
          .then(ret => {
            if(ret) {
              return Promise.resolve('good!')
            }else {
              return Promise.reject('이미 사용중인 이메일입니다.');
            }
          })
      }
    },
    'validatePassword': {
      promisedCheck (password) {
        if(password.length < 5 ) {
          return Promise.reject('비멀번호는 5글자 이상이어야합니다.');
        }else {
          return Promise.resolve('good');
        }
      }
    },
    'savePenName': {
      check (val, reject) {
        var penName = val;

        if( penName === '' || penName === undefined || penName === null ) {
          reject('필명을 입력해주세요.')
        }

        if( penName.length > 40 ) {
          reject('필명이 너무 깁니다.')
        }
      }
    },
    'saveIntroduction': {
      check (val, reject) {
        var introduction = val;
        if( introduction === '' || introduction === undefined || introduction === null ) {
          reject('자기소개를 입력해 주세요.')
        }
      }
    },
    'MaxUploadImageSize' : {
      check (val, reject) {
        var file = val;
        if(file === undefined || file === null) {
          reject('선택된 파일이 없습니다.')
        }

        if(file.size > (1024 * 1024 * 15)) {
          reject('파일이 너무 큽니다. 15mb 이하 크기만 업로드 할 수 있습니다.')
        }
      }
    },
    'createCategory': {
      check (val, reject) {
        var newCategory = val.newCategory;
        var parentCategoryNode = val.parentCategoryNode;

        console.log('[createCategory] validator')
        console.log(newCategory);
        console.log(parentCategoryNode);
        if( !(newCategory && parentCategoryNode) ) {
          reject('invalid parameters')
        }

        if(newCategory.name === '') {
          reject('이름을 입력해 주세요');
        }

        if(!parentCategoryNode.validNewCategoryNameAsChild(newCategory.name)) {
          reject('이미 하위에 있는 카테고리 이름입니다.');
        }

      }
    },
    'updateCategory' : {
      check (val, reject) {
        console.log('[validator] updateCategory');
        var tobeCategory = val.tobeCategory;
        var targetCategoryNode = val.targetCategoryNode;

        if( !(targetCategoryNode && tobeCategory) ) {
          reject('invalid parameters')
        }

        if(tobeCategory.seq !== targetCategoryNode.seq) {
          reject('여기서는 순서를 변경할 수 없습니다.')
        }
        if(tobeCategory.parentId !== targetCategoryNode.parentId) {
          reject('여기서는 부모 카테고리를 변경할 수 없습니다.')
        }
        if(tobeCategory.isDel !== targetCategoryNode.isDel) {
          reject('여기서는 카테고리를 삭제 할 수 없습니다.')
        }

        if(tobeCategory.name === '') {
          reject('변경할 이름을 입력해 주세요');
        }

        if(targetCategoryNode.parent) {//if not root
          if(!targetCategoryNode.parent.validNewCategoryNameAsChild(tobeCategory.name)) {
            reject('이미 있는 카테고리 이름입니다.');
          }
        }

      }
    }
  },
  validate(constraintKey, value, rejectCallback) {
    var constraint = this.findConstraint(constraintKey);
    try{
      constraint.check(value, this.reject.bind(this));

    }catch (exception) {
      if (exception instanceof ValidatorRejection) {
        if (rejectCallback) {
          console.error('[validator] process rejected during validation. constraint key: \"' + constraintKey + "\", " + exception.message);
          rejectCallback(exception)
        }
      }
      throw exception;

    }

  },
  promisedValidate(constraintKey, value) {
    var constraint = this.findConstraint(constraintKey);
    if(constraint === undefined) {
      throw new Error('[validator]' + 'constraint doesn\'t have promisedCheck Function.')
    }
    return constraint.promisedCheck(value);
  },
  findConstraint (constraintKey) {
    var constraint = this.constraints[constraintKey];
    if(constraint === undefined) {
      var err = new Error('[validator]'+ 'there\'s no matched constraint with key: "' + constraintKey+ '"')
      console.error(err);
      throw err;
    }
    return constraint;
  },
  reject (message) {
    console.log('validator rejected')
    console.log(this);
    throw new ValidatorRejection(message);
  }

}


function ValidatorRejection (message) {
  this.name = 'ValidatorRejection';
  this.message = message || "Validator Rejection";
}
ValidatorRejection.prototype = new Error();
ValidatorRejection.constructor = ValidatorRejection;


