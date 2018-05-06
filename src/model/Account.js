export default class Account {
  id = ''
  username = ''
  password = ''
  email = ''

  isValidUsername = function(val) {
    var ret = {
      isValid: false,
      message: ''
    }

    if(val === '' || val === undefined || val === null) {
      ret.message = '';
      return ret
    }

    if(val.length < 3) {
      ret.message = '사용자명은 세글자 이상되어야합니다.';
      return ret
    }

    //policy white list : alphanumeric . - _
    //following regex return true if there is at leaset one invalid character
    var regex = /[^0-9A-Za-z_\-.]/;

    if(regex.test(val)) {
      ret.message = '허용되는 특수문자 : -_.';
      return ret
    }

    ret.isValid = true;
    ret.message = 'good!';
    return ret
  };

  isValidEmil = function(email) {
    let ret = {
      isValid: false,
      message: ''
    };

    var eRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    var valid = eRegex.test(String(email).toLowerCase())
    if(!valid) {
      ret.message = '적합한 이메일 형식이 아닙니다.';
      return ret
    }

    ret.isValid = true;
    return ret
  };
  isValidPassword = function(password) {
    let ret = {
      isValid: false,
      message: ''
    };

    if(password.length < 5 ) {
      ret.message = '비멀번호는 5글자 이상이어야합니다.';
      return ret
    }

    ret.isValid = true;
    return ret
  }
}
