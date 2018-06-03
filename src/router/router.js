import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import ManagerComp from '@/components/manager/Manager'
import Viewer from '@/components/viewer/Viewer'
import Test from '@/components/Test'
import UserHome from '@/components/user/home/UserHome.vue'

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
      path: '/sign/sign-in',
      component: SignIn
    },
    {
      path: '/sign/sign-up',
      component: SignUp
    },
    {
      path: '/:username/manage',
      component: ManagerComp
    },
    {
      path: '/:username/article/:articleId',
      component: Viewer
    },
    {
      path: '/:username',
      component: UserHome
    },
    {
      path: '/test',
      component: Test
    }
  ]
})
