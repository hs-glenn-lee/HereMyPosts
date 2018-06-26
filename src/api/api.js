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
    console.log('sign-up');
    console.log(account)
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
  isUniqueNewEmail ( email ) {
    return axiosAppJson.post('/api/isUniqueNewEmail',{
      'email':email
    })
      .then(res => {
        console.log(res)
        return res.data.isUniqueNewEmail
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
    console.log( 'api.saveArticle')

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
        console.log('getArticle!')
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
    console.log('writeComment!')
    console.log(comment)
    return axiosAppJson.put('api/comment/write', comment)
      .then(res => {
        console.log(res)
        return res.data })
      .catch( err => {throw err})
  },
  getCommentsOfArticle (articleId) {
    return axiosAppJson.get('api/article/' + articleId + '/comments')
      .then(res=> {
        console.log('getCommentsOfArticle')
        console.log(res.data)
        return res.data;
      })
      .catch( err => {throw err});


  },


  //---tag
  getMyTags () {
    return axiosAppJson.get('api/tag/myTags')
      .then(res => {
        console.log('getMyTags')
        console.log(res.data)
        return res.data;
      })
      .catch(err => {throw err});
  },
  getTagArticlesOfArticle (articleId) {
    return axiosAppJson.get('api/article/' + articleId +'/tags')
      .then(res => {
        console.log('getTagArticlesOfArticle')
        console.log(res.data)
        return res.data;
      })
      .catch( err => {throw err})
  },
  saveTagsArticlesOfArticle (articleId, tagArticle) {
    console.log(tagArticle);
    return axiosAppJson.put('api/article/save-tag/'+articleId, tagArticle)
      .then(res => {
        console.log(res.data) // data is supposed to be tagArticle
        return res.data;
      })
      .catch( err => {throw err})
  },

  //---settings
  getMySettings () {
    return axiosAppJson.get('api/account/my-settings')
      .then(res => {
        return res.data;
      })
      .catch( err => {throw err})
  },
  saveIntroduction (introduction) {
    return axiosAppJson.put('api/account/setting/save-introduction', {introduction})
      .then(res => {
        return res.data;
      })
      .catch( err => {throw err})
  },
  savePenName (penName) {
    return axiosAppJson.put('api/account/setting/save-pen-name', {penName})
      .then(res => {
        return res.data;
      })
      .catch( err => {throw err})
  }
}
