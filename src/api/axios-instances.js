import axios from 'axios'
import NotSignedInError from './custom-server-exception/NotSignedInError'
import resolveCustomServerException from './custom-server-exception/resolveCustomServerException'
const axiosAppJson = axios.create({
  baseURL: 'http://localhost:8081'
})
axiosAppJson.defaults.headers.post['Accepts'] = 'application/json';

/*axios.interceptors.request.use(config => {
  console.log(config)
  return config // must return res not to block thread.
})*/
axiosAppJson.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const resolvedError = resolveCustomServerException(error);
  return Promise.reject(resolvedError);
});

const axiosMultipart = axios.create({
  baseURL: 'http://localhost:8081'
})
axiosMultipart.defaults.headers.post['Content-Type'] = 'multipart/form-data';

export { axiosAppJson, axiosMultipart }
