import axios from 'axios'
const instance = axios.create({
  baseURL: 'http://localhost:8081'
})
instance.defaults.headers.post['Accepts'] = 'application/json';

/*axios.interceptors.request.use(config => {
  console.log(config)
  return config // must return res not to block thread.
})
axios.interceptors.response.use(res => {
  console.log(res)
  return res // must return res not to block thread.
})*/

const axiosMultipart = axios.create({
  baseURL: 'http://localhost:8081'
})
axiosMultipart.defaults.headers.post['Content-Type'] = 'multipart/form-data';

const axiosAppJson = instance
export { axiosAppJson, axiosMultipart }
