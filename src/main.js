import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import { sync } from 'vuex-router-sync'
import VueI18n from 'vue-i18n'

import './assets/styles.scss'
import 'material-design-lite/material.js'

import App from './App'
import Directives from './directives/'
import routes from './routes/'
import locales from './locales'
import store from './vuex/store'

import progress from './plugins/progress'

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
require('moment/locale/fr')
moment.locale('fr')
require('datatables.net')
require('imports-loader?define=>false!drmonty-datatables-plugins/dataRender/datetime.js')
require('imports-loader?define=>false!drmonty-datatables-plugins/sorting/datetime-moment.js')
import dataTablesFr from 'drmonty-datatables-plugins/i18n/French.json'

$.extend(true, $.fn.dataTable.defaults, {
  language: dataTablesFr
})

Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VueI18n)
Vue.use(progress)

for (let key in Directives) {
  Vue.directive(key, Directives[key])
}

// Vue.http.headers.common['X-CSRF-TOKEN'] = document.getElementsByName('csrf-token')[0].getAttribute('content')
Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
Vue.http.options.root = 'http://127.0.0.1:3000'

var router = new VueRouter({
  routes: routes,
  mode: 'history',
  saveScrollPosition: true
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.bodyClass)) {
    document.body.className = to.meta.bodyClass
  } else {
    document.body.className = ''
  }
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.state.auth.authenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

export { router }

sync(store, router)

Object.keys(locales).forEach(function (lang) {
  Vue.locale(lang, locales[lang])
})
Vue.config.lang = 'fr'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})

store.dispatch('check')
