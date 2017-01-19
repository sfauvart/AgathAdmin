import * as types from '../mutation-types'
import Vue from 'vue'
import { router } from '../../main.js'
import jwtDecode from 'jwt-decode'

// initial State
const state = {
  id_token: null,
  authenticated: false,
  inRequest: null,
  messages: null,
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
  },

  [types.AUTHENTICATE_FAILURE] (state, error) {
    state.error = true
    state.inRequest = false
    if (error.status !== 0 && error.data !== undefined && error.data.error !== undefined && error.data.error.code !== undefined) {
      state.messages = error.data.error.code
    } else if (error.status === 404) {
      state.messages = 'login.errors.not_found'
    } else {
      state.messages = 'general.error_api'
    }

    router.push({ name: 'login' })
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
    } else {
      router.push({ name: 'login' })
    }
  },
  forgot ({ commit, state }, { email }) {
    commit(types.FORGOT_PASSWORD_REQUEST)
    Vue.http.post(
      'api/users/forgot_password',
      {
        email: email
      }
    ).then(response => commit(types.FORGOT_PASSWORD, response))
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
    state.messages = null

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
