import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home'
import Community from '@/components/Community/Community'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landingpage',
      component: Home
    },
    {
      path: '/community',
      name: 'Community',
      component: Community
    }

  ]
})
