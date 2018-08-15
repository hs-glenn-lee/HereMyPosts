import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import SignUp from '@/components/SignUp'
import ManagerComp from '@/components/manager/Manager'
import Viewer from '@/components/viewer/Viewer'
import Test from '@/components/Test'
import UserHome from '@/components/user/home/UserHome.vue'
import Settings from '@/components/user/settings/Settings.vue'
import TermsOfService from '@/components/TermsOfService.vue'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
import NotSignedInExceptionComp from '@/components/Exceptions/custom/NotSignedInException.vue'
import BadRequest400 from '@/components/Exceptions/BadRequest400.vue';

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
      name: 'Manager',
      path: '/:username/manager',
      component: ManagerComp
    },
    {
      name: 'ManagerSavedArticle',
      path: '/:username/manager/:articleId',
      component: ManagerComp
    },
    {
      name: 'Viewer',
      path: '/:username/article/:articleId',
      component: Viewer
    },
    {
      path: '/:username',
      name: 'UserHome',
      component: UserHome
    },
    {
      path: '/test',
      component: Test
    },
    {
      name: 'MySetting',
      path: '/me/settings',
      component: Settings
    },
    {
      name:'TermsOfService',
      path: '/agreements/terms-of-service',
      component: TermsOfService
    },
    {
      name: 'PrivacyPolicy',
      path: '/agreements/privacy-policy',
      component: PrivacyPolicy
    },
    {
      name: 'OnNotSignedInError',
      path: '/error/not-signed-in',
      component: NotSignedInExceptionComp
    },
    {
      name: 'OnBadRequest',
      path: '/error/bad-request',
      component: BadRequest400
    }
  ]
})
