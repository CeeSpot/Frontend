import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home' // Home base page
import Community from '@/components/Community/Community' // Community base page
import Spaces from '@/components/Spaces/Spaces' // Spaces base page
import Space from '@/components/Spaces/Space' // Space base page
import Events from '@/components/Events/Events' // Events base page
import Event from '@/components/Events/Event' // Event base page
import Contact from '@/components/Contact/Contact' // Contact base page
import User from '@/components/Community/User'
import Blogs from '@/components/Blog/Blogs' // Community base page
import Blog from '@/components/Blog/Blog' // Community base page

//Authentication
import Register from '@/components/Core/Authentication/RegisterAndLogin'

// User
import Profile from '@/components/UserProfile/Profile'
import Settings from '@/components/UserProfile/Settings'

// Admin
import AdminUsers from '@/components/Admin/Users/Users'
import AdminUser from '@/components/Admin/Users/User'
import AdminEvents from '@/components/Admin/Events/Events'
import AdminEvent from '@/components/Admin/Events/Event'
import AdminCompanies from '@/components/Admin/Companies/Companies'
import AdminCompany from '@/components/Admin/Companies/Company'
import AdminBlogs from '@/components/Admin/Blogs/Blogs'
import AdminAddBlog from '@/components/Admin/Blogs/AddBlog'
import AdminEditBlog from '@/components/Admin/Blogs/EditBlog'

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
      path: '/spaces/:id',
      name: 'Space',
      component: Space
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/event/:id',
      name: 'Event',
      component: Event
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
      component: AdminUsers
    },
    {
      path: '/admin/users/:id',
      name: 'User',
      component: AdminUser
    },
    {
      path: '/admin/events',
      name: 'Events',
      component: AdminEvents
    },
    {
      path: '/admin/events/:id',
      name: 'Event',
      component: AdminEvent
    }
    ,
    {
      path: '/admin/companies',
      name: 'Companies',
      component: AdminCompanies
    },
    {
      path: '/admin/companies/:id',
      name: 'Company',
      component: AdminCompany
    },
    {
      path: '/blogs',
      name: 'Blogs',
      component: Blogs
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: Blog
    },
    {
      path: '/admin/blogs',
      name: 'Blogs',
      component: AdminBlogs
    },
    {
      path: '/admin/blogs/add',
      name: 'addBlog',
      component: AdminAddBlog
    },
    {
      path: '/admin/blogs/edit/:id',
      name: 'editBlog',
      component: AdminEditBlog
    },
  ]
})
