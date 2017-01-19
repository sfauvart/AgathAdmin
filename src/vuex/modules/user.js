import { USER_OBJECT } from '../mutation-types'

const mutations = {
  [USER_OBJECT] (state, data) {
    if (data && typeof data === 'object') {
      state.user = data
    }
  }
}

const state = {
  user: {
    userId: -1,
    userName: '',
    first_name: '',
    last_name: ''
  }
}

const actions = {
  setUser ({ commit }, data) {
    commit(mutations.USER_OBJECT, data)
  }
}

const getters = {
  getUserObject: state => state.user.user
}

export default {
  state,
  mutations,
  actions,
  getters
}
