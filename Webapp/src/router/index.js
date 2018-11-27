import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Landingpage/Home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Landingpage',
      component: Home
    }
  ]
})
