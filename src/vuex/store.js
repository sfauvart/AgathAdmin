import Vue from 'vue'
import Vuex from 'vuex'

import auth from './modules/auth'
import user from './modules/user'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    menu,
    user
  }
})
