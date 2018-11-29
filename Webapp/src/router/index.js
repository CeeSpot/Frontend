import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home'
import Spaces from '@/components/Spaces/Spaces'
import Events from '@/components/Events/Events'
import Contact from '@/components/Contact/Contact'

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
      path: '/spaces',
      name: 'Spaces',
      component: Spaces
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    }
  ]
})
