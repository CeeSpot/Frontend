import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home' // Home base page
import Community from '@/components/Community/Community'
import Spaces from '@/components/Spaces/Spaces'
import Space from '@/components/Spaces/Space'
import Events from '@/components/Events/Events'
import Event from '@/components/Events/Event'
import Contact from '@/components/Contact/Contact'
import Success from '@/components/Contact/Success'
import About from '@/components/About/About'
import PrivacyStatement from '@/components/PrivacyStatement/PrivacyStatement'
import User from '@/components/Community/User'
import Blogs from '@/components/Blog/Blogs'
import Blog from '@/components/Blog/Blog'
import ForgotPassword from '@/components/Core/forgotPassword/forgotPassword'
import EditPassword from '@/components/Core/forgotPassword/editPassword'

// Authentication
import Register from '@/components/Core/Authentication/RegisterAndLogin'

// User
import Profile from '@/components/UserProfile/Profile'
import Settings from '@/components/UserProfile/Settings'

// Company
import Company from '@/components/Community/Company'
import CompanyProfile from '@/components/Community/CompanyProfile'

// Admin
import AdminUsers from '@/components/Admin/Users/Users'
import AdminUser from '@/components/Admin/Users/User'
import AdminEvents from '@/components/Admin/Events/Events'
import AdminEvent from '@/components/Admin/Events/Event'
import AdminCompanies from '@/components/Admin/Companies/Companies'
import AdminCompany from '@/components/Admin/Companies/Company'
import AdminBlogs from '@/components/Admin/Blogs/Blogs'
import AdminAddBlog from '@/components/Admin/Blogs/Addblog'
import AdminEditBlog from '@/components/Admin/Blogs/Editblog'
import AdminSpaces from '@/components/Admin/Spaces/Spaces'
import AdminSpace from '@/components/Admin/Spaces/Space'
import AdminRequests from '@/components/Admin/Requests/Requests'
import AdminSettings from '@/components/Admin/Settings/Settings'
import AdminTags from '@/components/Admin/Tags/Tags'
import AdminWebsite from '@/components/Admin/Website/Website'
import AdminEditWebsite from '@/components/Admin/Website/Editwebsite'

import Test from '@/components/Test/Test'

// 404
import NotFoundComponent from '@/components/Core/Other/NotFoundComponent'

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
      path: '/user/:id/:naam',
      name: 'User',
      component: User
    },
    {
      path: '/company/:id/:name',
      name: 'Company',
      component: Company
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
      path: '/spaces/:id/:title',
      name: 'Space',
      component: Space
    },
    {
      path: '/events',
      name: 'Events',
      component: Events
    },
    {
      path: '/event/:id/:title',
      name: 'Event',
      component: Event
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/contact/success',
      name: 'Success',
      component: Success
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
      path: '/account/company',
      name: 'Company',
      component: CompanyProfile
    },
    {
      path: '/admin/',
      name: 'Users',
      component: AdminUsers
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
    },
    {
      path: '/admin/spaces',
      name: 'Spaces',
      component: AdminSpaces
    },
    {
      path: '/admin/spaces/:id',
      name: 'Space',
      component: AdminSpace
    },
    {
      path: '/admin/companies',
      name: 'Companies',
      component: AdminCompanies
    },
    {
      path: '/admin/requests',
      name: 'Requests',
      component: AdminRequests
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
      path: '/blog/:id/:title',
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
    {
      path: '/admin/settings',
      name: 'AdminSettings',
      component: AdminSettings
    },
    {
      path: '/admin/tags',
      name: 'AdminTags',
      component: AdminTags
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/privacy-statement',
      name: 'PrivacyStatement',
      component: PrivacyStatement
    },
    {
      path: '/admin/website',
      name: 'AdminWebsite',
      component: AdminWebsite
    },
    {
      path: '/admin/website/edit/:id',
      name: 'AdminEditWebsite',
      component: AdminEditWebsite
    },
    {
      path: '*',
      name: 'NotFoundComponent',
      component: NotFoundComponent
    },
    {
      path: '/forgot-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
    {
      path: '/forgot-password-edit/:type/:id',
      name: 'EditPassword',
      component: EditPassword
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
