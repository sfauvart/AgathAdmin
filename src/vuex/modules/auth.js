import * as types from '../mutation-types'
import Vue from 'vue'
import { router } from '../../main.js'
import jwtDecode from 'jwt-decode'

// initial State
const state = {
  id_token: null,
  authenticated: false,
  inRequest: null,
  error_messages: '',
  notif_messages: '',
  error: false,
  payload: {}
}

// mutations
const mutations = {

  [types.AUTHENTICATE] (state, response) {
    localStorage.setItem('id_token', response.data.id_token)
    Vue.http.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('id_token')
    state.id_token = response.data.id_token
    state.payload = jwtDecode(state.id_token)
    state.authenticated = true
    state.inRequest = false
    state.error = false

    if (router.currentRoute.query.redirect !== undefined) {
      router.replace({ path: router.currentRoute.query.redirect })
    } else {
      router.push({
        name: 'home'
      })
    }
  },

  [types.AUTHENTICATE_REQUEST] (state) {
    state.inRequest = true
    state.error = false
    state.id_token = null
    state.payload = {}
    state.notif_messages = ''
  },

  [types.AUTHENTICATE_FAILURE] (state, error) {
    state.error = true
    state.inRequest = false
    if (error.status !== 0 && error.data !== undefined && error.data.error !== undefined && error.data.error.code !== undefined) {
      state.error_messages = error.data.error.code
    } else if (error.status === 404) {
      state.error_messages = 'login.errors.not_found'
    } else {
      state.error_messages = 'general.error_api'
    }

    router.push({ name: 'login' })
  },

  [types.FORGOT_PASSWORD] (state, response) {
    state.inRequest = false
    state.error = false
    state.notif_messages = 'login.notifications.reset_password_token_send'
  },
  [types.FORGOT_PASSWORD_CONFIRM] (state, response) {
    state.inRequest = false
    state.error = false
    state.notif_messages = 'login.notifications.reset_password_token_confirm'
    router.push({ name: 'login' })
  },
  [types.FORGOT_PASSWORD_REQUEST] (state) {
    state.inRequest = true
    state.error = false
    state.notif_messages = ''
  },
  [types.FORGOT_PASSWORD_FAILURE] (state, error) {
    state.error = true
    state.inRequest = false
    if (error.status !== 0 && error.data !== undefined && error.data.error !== undefined && error.data.error.code !== undefined) {
      state.error_messages = error.data.error.code
    } else {
      state.error_messages = 'general.error_api'
    }
  }
}

const actions = {
  signin ({ commit, state }, { email, password }) {
    commit(types.AUTHENTICATE_REQUEST)
    Vue.http.post(
      'auth/signin',
      {
        email: email,
        password: password
      }
    ).then(response => commit(types.AUTHENTICATE, response))
    .catch((error) => commit(types.AUTHENTICATE_FAILURE, error))
  },
  check ({ commit, state }) {
    if (localStorage.getItem('id_token') !== null) {
      commit(types.AUTHENTICATE_REQUEST)
      Vue.http.post(
          'auth/check',
      ).then(response => commit(types.AUTHENTICATE, response))
      .catch((error) => commit(types.AUTHENTICATE_FAILURE, error))
    }
  },
  forgot ({ commit, state }, { email, token, password }) {
    commit(types.FORGOT_PASSWORD_REQUEST)
    Vue.http.post(
      'auth/forgot_password',
      {
        email
      }
    ).then(response => commit(types.FORGOT_PASSWORD, response))
    .catch((error) => commit(types.FORGOT_PASSWORD_FAILURE, error))
  },
  forgot_confirm ({ commit, state }, { email, token, password }) {
    commit(types.FORGOT_PASSWORD_REQUEST)
    Vue.http.post(
      'auth/forgot_password_confirm',
      {
        email,
        token,
        password
      }
    ).then(response => commit(types.FORGOT_PASSWORD_CONFIRM, response))
    .catch((error) => commit(types.FORGOT_PASSWORD_FAILURE, error))
  },
  signup ({ commit, state }, { firstname, lastname, email, password }) {
    commit(types.SIGNUP_REQUEST)
    Vue.http.post(
      'api/users/signup',
      {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      }
    ).then(response => commit(types.SIGNUP, response))
    .catch((error) => commit(types.SIGNUP_FAILURE, error))
  },
  signout ({ commit, state }) {
    localStorage.removeItem('id_token')
    state.id_token = null
    state.payload = {}
    state.authenticated = false
    state.inRequest = null
    state.error_messages = null

    router.push({
      name: 'login'
    })
  }
}

export default {
  state,
  mutations,
  actions
}
