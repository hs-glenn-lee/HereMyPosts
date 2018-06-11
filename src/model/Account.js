export default class Account {

  constructor(id,username,password,email) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }


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
