import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home'
import User from '@/components/Community/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  hash: false,
  routes: [
    {
      path: '/',
      name: 'Landingpage',
      component: Home
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})
