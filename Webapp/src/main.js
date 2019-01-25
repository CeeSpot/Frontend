// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import {API_PORT, API_URL, JSON_TOKEN} from './constants'
import translationsNLJSON from './assets/i18n/translationsNl.json'
import translationsENJSON from './assets/i18n/translationsEn.json'

import App from './App'
import router from './router'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Datetime from 'vue-datetime'
import vuexI18n from 'vuex-i18n'

import BootstrapVue from 'bootstrap-vue' // Imports bootstrap vue library
import FullCalendar from 'vue-full-calendar'
import SocialSharing from 'vue-social-sharing'

import 'bootstrap/dist/css/bootstrap.css' // Imports the Bootstrap CSS
import 'bootstrap-vue/dist/bootstrap-vue.css' // Imports the bootstrap-vue css
import './assets/css/main.css'
import 'fullcalendar/dist/fullcalendar.css'
import 'vue-datetime/dist/vue-datetime.css'

import {library} from '@fortawesome/fontawesome-svg-core' // Imports svg core

import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch' // Imports Fa search
import {faPlus} from '@fortawesome/free-solid-svg-icons/faPlus'
import {faChevronDown} from '@fortawesome/free-solid-svg-icons/faChevronDown' // Imports Fa chevron down
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons/faChevronLeft' // Imports Fa chevron left
import {faChevronRight} from '@fortawesome/free-solid-svg-icons/faChevronRight' // Imports Fa chevron right
import {faTrash} from '@fortawesome/free-solid-svg-icons/faTrash' // Imports Fa trash
import {faTimes} from '@fortawesome/free-solid-svg-icons/faTimes'
import {faUsers} from '@fortawesome/free-solid-svg-icons/faUsers'
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook'
import {faTwitter} from '@fortawesome/free-brands-svg-icons/faTwitter'
import {faLinkedin} from '@fortawesome/free-brands-svg-icons/faLinkedin'
import {faSave} from '@fortawesome/free-solid-svg-icons/faSave'
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck'
import {fab} from '@fortawesome/free-brands-svg-icons' // Imports brand icons
import {far} from '@fortawesome/free-regular-svg-icons'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome' // Imports the font awesome core js

import Toasted from 'vue-toasted' // Toast messages

library.add(faChevronDown)
library.add(fab) // Add the brand icons to the library
library.add(far) // Add the regular icons to the library
library.add(fas) // Add the regular icons to the library
library.add(faSearch) // Add the brand icons to the library
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faTrash)
library.add(faTimes)
library.add(faFacebook)
library.add(faTwitter)
library.add(faLinkedin)
library.add(faSave)
library.add(faCheck)
library.add(faPlus)
library.add(faUsers)

Vue.component('font-awesome-icon', FontAwesomeIcon) // create the vue-component so you can use it

Vue.config.productionTip = false // production release
Vue.use(Vuex)
Vue.use(VueAxios, axios)
Vue.use(SocialSharing)
Vue.use(BootstrapVue) // Let vue use bootstrap vue across the whole project
Vue.use(FullCalendar)
Vue.use(Datetime)

// Set baseURL and some other stuff to trigger sourcetree
// let baseURL = 'http://localhost:3000'
let baseURL = 'https://vps437.directvps.nl:3000'
axios.defaults.baseURL = baseURL
Vue.prototype.imageBaseURL = baseURL + '/images'

Vue.prototype.language = JSON.parse(localStorage.getItem('CCLanguage'))

window.Emitter = new Vue()

export const store = new Vuex.Store({
  state: {
    jwt: JSON.parse(localStorage.getItem(JSON_TOKEN)),
    // user: jwtDecode(jwt),
    endpoints: {
      obtainJWT: baseURL + '/api/users/authenticate',
      refreshJWT: baseURL + '/api/users/refresh'
    }
  },
  getters: {
    getUser: state => {
      if (!state.jwt) {
      //  console.log("hi")
        return null
      }
    //  console.log("hi2")
      return jwtDecode(state.jwt)
    }
  },
  mutations: {
    updateToken (state, newToken) {
      localStorage.setItem(JSON_TOKEN, JSON.stringify(newToken))
      this.state.jwt = newToken
    },
    removeToken (state) {
      localStorage.removeItem(JSON_TOKEN)
      this.state.jwt = null
    }
  },
  actions: {
    logout () {
      this.commit('removeToken')
      window.location.href = '/lr'
    },
    obtainToken (context, data) {
      return axios.post(this.state.endpoints.obtainJWT + '/' + data[0], {
        username: data[1],
        password: data[2]
      })
    },
    updateToken (context, newToken) {
      this.commit('updateToken', newToken)
    },
    refreshToken (context) {
      const payload = {
        token: this.state.jwt
      }
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    inspectToken () {
      const token = this.state.jwt
      if (token) {
        const decoded = jwtDecode(token)
        console.log(JSON.stringify(decoded))
        const exp = decoded.exp
        const origIat = decoded.orig_iat
        if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - origIat < 628200) {
          this.dispatch('refreshToken')
        } else if (exp - (Date.now() / 1000) < 1800) {
          // DO NOTHING, DO NOT REFRESH
          return true
        } else {
          // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
        }
      }
    }
  }
})

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.use(vuexI18n.plugin, store)

Vue.i18n.add('en', translationsENJSON)
Vue.i18n.add('nl', translationsNLJSON)

Vue.i18n.set('en')
Vue.use(Toasted)

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
}).$mount(document.querySelector('#app'))
