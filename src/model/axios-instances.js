import axios from 'axios'

const axiosAppJson = axios.create({
  baseURL: 'http://localhost:8081/api',
  headers: {
    'Content-Type': 'application/json'
  },
  json: true
})

//axiosAppJson.defaults.headers.common['SOMETHING'] = 'something'

export { axiosAppJson }
