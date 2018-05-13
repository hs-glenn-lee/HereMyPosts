import { axiosAppJson } from "@/api/axios-instances";
export default {
  getMyAccount () {
    return axiosAppJson.get('/api/getMyAccount')
      .then(res => { return res.data })
      .catch(err=>{ throw err.message })
      .then(data => {
        if(data.status === 'success') {
          return data.data
        }else {
          return reject( data.message )
        }
      })
  },
  signIn (payload) {
    return axiosAppJson.post('/api/sign-in', payload)
      .then(res => {
        console.log(res.data)
        return res.data
      })
      .catch(err => {
        console.log(err)
      })
      .then(data => {
        if(data.status === 'success') {
          return data.data;
        }else {
          return Promise.reject(data.message);
        }
      })
  },
  signUp (account) {
    return axiosAppJson.put('/api/sign-up', account)
      .then(res => { return res })
      .catch(err=>{
        console.log(err)
        throw err
      })
  },
  isUniqueNewUsername ( username ) {
    return axiosAppJson.post('/api/isUniqueNewUsername',{
      'username':username
    })
      .then(res => {
        console.log(res)
        return res.data.isUniqueNewUserName
      })
      .catch(err => console.log(err) );

  },

  //---related to category
  getAllMyCategory () {
    return axiosAppJson.get('/api/category/all')
      .then(res => { return res.data} )
      .catch( err => console.log(err) ) //403 가능
  }


}
