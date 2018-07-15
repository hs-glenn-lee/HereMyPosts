// ref https://medium.com/@xjamundx/custom-javascript-errors-in-es6-aa891b173f87
// ref2 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#ES6_Custom_Error_Class
export default class NotSignedInError extends Error{
  constructor(...args) {
    super(...args)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotSignedInError);
      this.name = 'NotSignedInError'
    }
  }
}
