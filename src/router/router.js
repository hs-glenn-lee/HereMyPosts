import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import ManagerComp from '@/components/manager/Manager'
import Viewer from '@/components/viewer/Viewer'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sign-in',
      component: SignIn
    },
    {
      path: '/sign-up',
      component: SignUp
    },
    {
      path: '/manage',
      component: ManagerComp
    },
    {
      path: '/users/:username/article/:articleId',
      component: Viewer
    },
    {
      path: '/test',
      component: Test
    }
  ]
})
