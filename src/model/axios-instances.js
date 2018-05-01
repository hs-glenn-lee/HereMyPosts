import axios from 'axios'

const axiosAppJson = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  json: true
})

axiosAppJson.defaults.headers.common['SOMETHING'] = 'something'

export { axiosAppJson }
