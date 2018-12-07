import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home' // Home base page
import Community from '@/components/Community/Community' // Community base page
import Spaces from '@/components/Spaces/Spaces' // Spaces base page
import Events from '@/components/Events/Events' // Events base page
import Contact from '@/components/Contact/Contact' // Contact base page
import User from '@/components/Community/User'

//Authentication
import Register from '@/components/Core/Authentication/RegisterAndLogin'

// User
import Profile from '@/components/UserProfile/Profile'
import Settings from '@/components/UserProfile/Settings'

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
      path: '/lr',
      name: 'Register',
      component: Register
    },
    {
      path: '/account',
      name: 'User',
      component: Profile
    },
    {
      path: '/account/settings',
      name: 'User',
      component: Settings
    },
    {
      path: '/admin/users',
      name: 'Users',
      component: Users
    }
  ]
})
