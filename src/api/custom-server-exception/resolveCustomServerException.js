import NotSignedInError from "./NotSignedInError";
//if occured error is Customized error, return Custom js Error
//if not return as axiosError is.
export default function (axiosError) {
  if(axiosError.response.status === 403) {
    if(axiosError.response.data) {
      if(axiosError.response.data.exception === 'web.exceptions.NotSignedInException') {
        var error = new NotSignedInError(axiosError.response.data.message)
        return error;
      }
    }

    if(axiosError.response.data) {
      if(axiosError.response.data.exception === 'web.exceptions.PrivateArticleException') {
        var error = new NotSignedInError(axiosError.response.data.message)
        return error;
      }
    }
  }

  return axiosError;
}
