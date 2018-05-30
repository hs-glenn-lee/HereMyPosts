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


