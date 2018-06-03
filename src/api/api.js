import { axiosAppJson } from "@/api/axios-instances";
export default {
  getMyAccount () {
    return axiosAppJson.get('/api/getMyAccount')
      .then(res => { return res.data })
      .catch(err=>{ throw err.message })
  },
  signIn (payload) {
    return axiosAppJson.post('/api/sign-in', payload)
      .then(res => {

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
      .then(res => {
        console.log(res)
        return res.data} )
      .catch( err => { throw err } ) //403 가능
  },

  createCategory (category) {
    return axiosAppJson.put('/api/category/create', category)
      .then( res => { return res.data } )
      .catch( err => { throw err } )
  },


  //---article
  saveArticle (compositeArticle) {

    console.log( '!!???!')
    var x = JSON.stringify(compositeArticle);

    return axiosAppJson.post('/api/article/save', compositeArticle)
      .then( res => { return res.data })
      .catch( err => { throw err })
  },

  getArticlesOfCategory (categoryId) {
    return axiosAppJson.get('api/category/'+categoryId+'/articles')
      .then(res => { return res.data })
      .catch( err => {throw err})
  },

  getArticle(articleId) {
    return axiosAppJson.get('api/article/'+articleId)
      .then(res => {
        console.log(res)
        return res.data })
      .catch( err => {throw err})
  },

  getRecentArticles(username) {
    return axiosAppJson.get('api/'+username+'/recent-articles')
      .then(res => {
        console.log(res)
        return res.data })
      .catch( err => {throw err})
  },


  //---comment
  writeComment (comment) {
    return axiosAppJson.put('api/comment/write', comment)
      .then(res => {
        console.log(res)
        return res.data })
      .catch( err => {throw err})
  }
}
