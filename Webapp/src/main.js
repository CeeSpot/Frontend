// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Datetime from 'vue-datetime'

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
import { fab } from '@fortawesome/free-brands-svg-icons' // Imports brand icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome' // Imports the font awesome core js

library.add(faChevronDown);
library.add(faCoffee); // add svg icons to the library
library.add(fab); // Add the brand icons to the library
library.add(faSearch); // Add the brand icons to the library
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faTrash);
library.add(faTimes);
library.add(faFacebook);
library.add(faTwitter);
library.add(faLinkedin);

Vue.component('font-awesome-icon', FontAwesomeIcon); // create the vue-component so you can use it

Vue.config.productionTip = false; // production release

Vue.use(SocialSharing);
Vue.use(BootstrapVue); // Let vue use bootstrap vue across the whole project
Vue.use(FullCalendar);
Vue.use(Datetime);

// Set baseURL
axios.defaults.baseURL = 'http://localhost:3000';

window.Emitter = new Vue();

/* eslint-disable no-new */
window.App = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount(document.querySelector('#app'));
