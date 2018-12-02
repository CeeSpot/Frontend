import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home'
import User from '@/components/Community/User'
import Community from '@/components/Community/Community'
import Spaces from '@/components/Spaces/Spaces'
import Events from '@/components/Events/Events'
import Contact from '@/components/Contact/Contact'

// Admin
import Users from '@/components/Admin/Users'

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
      path: '/user/:id',
      name: 'User',
      component: User
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
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
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: Users
    }
  ]
})
