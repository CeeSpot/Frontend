// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import {API_PORT, API_URL, JSON_TOKEN} from './constants'
import translationsNLJSON from './assets/i18n/translationsNl.json'
import translationsENJSON from './assets/i18n/translationsEn.json'

import App from './App'
import router from './router'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import Datetime from 'vue-datetime'
import vuexI18n from 'vuex-i18n';

import BootstrapVue from 'bootstrap-vue' // Imports bootstrap vue library
import FullCalendar from 'vue-full-calendar'
import SocialSharing from 'vue-social-sharing'

import 'bootstrap/dist/css/bootstrap.css' // Imports the Bootstrap CSS
import 'bootstrap-vue/dist/bootstrap-vue.css' // Imports the bootstrap-vue css
import './assets/css/main.css'
import 'fullcalendar/dist/fullcalendar.css'
import 'vue-datetime/dist/vue-datetime.css'

import { library } from '@fortawesome/fontawesome-svg-core' // Imports svg core

import { faCoffee } from '@fortawesome/free-solid-svg-icons' // Imports base icons
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch' // Imports Fa search
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown' // Imports Fa chevron down
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons/faChevronLeft' // Imports Fa chevron left
import { faChevronRight } from '@fortawesome/free-solid-svg-icons/faChevronRight' // Imports Fa chevron right
import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash' // Imports Fa trash
import { faTimes } from '@fortawesome/free-solid-svg-icons/faTimes'
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook'
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faSave } from '@fortawesome/free-solid-svg-icons/faSave'
import { fab } from '@fortawesome/free-brands-svg-icons' // Imports brand icons
import { far } from '@fortawesome/free-regular-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // Imports the font awesome core js

library.add(faChevronDown);
library.add(faCoffee); // add svg icons to the library
library.add(fab); // Add the brand icons to the library
library.add(far); // Add the regular icons to the library
library.add(fas); // Add the regular icons to the library
library.add(faSearch); // Add the brand icons to the library
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faTrash);
library.add(faTimes);
library.add(faFacebook);
library.add(faTwitter);
library.add(faLinkedin);
library.add(faSave);

Vue.component('font-awesome-icon', FontAwesomeIcon); // create the vue-component so you can use it

Vue.config.productionTip = false; // production release
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(SocialSharing);
Vue.use(BootstrapVue); // Let vue use bootstrap vue across the whole project
Vue.use(FullCalendar);
Vue.use(Datetime);

// Set baseURL
axios.defaults.baseURL = 'http://localhost:3000';

window.Emitter = new Vue();


export const store = new Vuex.Store({
  state: {
    jwt:JSON.parse(localStorage.getItem(JSON_TOKEN)),
    // user: jwt_decode(jwt),
    endpoints: {
      obtainJWT: API_URL + API_PORT + '/api/users/authenticate',
      refreshJWT: API_URL + API_PORT + '/api/users/refresh'
    }
  },
  getters : {
    getUser: state => {
      if(!state.jwt){
        return null;
      }
      return jwt_decode(state.jwt);
    }
  },
  mutations: {
    updateToken(state, newToken) {
      localStorage.setItem(JSON_TOKEN, JSON.stringify(newToken));
      this.state.jwt = newToken;
    },
    removeToken(state) {
      localStorage.removeItem(JSON_TOKEN);
      this.state.jwt = null;
    }
  },
  actions: {
    logout(){
      this.commit('removeToken');
      window.location.href = '/lr';
    },
    obtainToken(context, data) {
      return axios.post(this.state.endpoints.obtainJWT, {
        username: data[0],
        password: data[1]
      });
    },
    updateToken(context, newToken){
      console.log(newToken);
      this.commit('updateToken', newToken)
    },
    refreshToken(context) {
      const payload = {
        token: this.state.jwt
      };
      axios.post(this.state.endpoints.refreshJWT, payload)
        .then((response) => {
          this.commit('updateToken', response.data.token)
        })
        .catch((error) => {
          console.log(error)
        });
    },
    inspectToken() {
      const token = this.state.jwt;
      if (token) {
        const decoded = jwt_decode(token);
        console.log(JSON.stringify(decoded));
        const exp = decoded.exp;
        const orig_iat = decoded.orig_iat;
        if (exp - (Date.now() / 1000) < 1800 && (Date.now() / 1000) - orig_iat < 628200) {
          this.dispatch('refreshToken')
        } else if (exp - (Date.now() / 1000) < 1800) {
          // DO NOTHING, DO NOT REFRESH
          return true;
        } else {
          // PROMPT USER TO RE-LOGIN, THIS ELSE CLAUSE COVERS THE CONDITION WHERE A TOKEN IS EXPIRED AS WELL
        }
      }
    }
  }
});

Vue.use(vuexI18n.plugin, store);

Vue.i18n.add('en', translationsENJSON);
Vue.i18n.add('nl', translationsNLJSON);

Vue.i18n.set('en');

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
}).$mount(document.querySelector('#app'));
