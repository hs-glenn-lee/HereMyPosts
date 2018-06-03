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


