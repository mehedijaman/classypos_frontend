// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueSweetAlert from 'vue-sweetalert'

import App from './App'
import router from './router'
import store from './store'

// TODO - register service worker

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log(`Service Worker registered! Scope: ${registration.scope}`)
      })
      .catch(err => {
        console.log(`Service Worker registration failed: ${err}`)
      })
  })
}

Vue.use(BootstrapVue)
Vue.use(VueSweetAlert)
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  baseUrl: 'http://techlab.classy.pos/Api', // Your API domain
  providers: {
    github: {
      clientId: '',
      redirectUri: 'http://localhost:8080/auth/callback' // Your client app URL
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
