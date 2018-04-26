export default class Account {
  id = ''
  username = ''
  password = ''
  email = ''
  validateUsername = function (target) {
    var pattern = /[^가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]/gi
    var outOfPattern = pattern.test(target)
    var falseMessage = '허용 되지 않은 문자가 있습니다.'
    var ret = { isValidate: true }
    console.log(outOfPattern)
    if (outOfPattern) {
      ret.isValidate = false
      ret.message = falseMessage
    }
    return ret
  }
}
