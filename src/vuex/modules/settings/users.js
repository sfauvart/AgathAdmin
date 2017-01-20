import * as types from '../../mutation-types'
import Vue from 'vue'

const apiBase = 'api/users'

const mutations = {
  [types.SETTINGS_USERS_GRID_LOAD_REQUEST] (state) {
    state.grid.inProgress = true
  },
  [types.SETTINGS_USERS_GRID_LOAD] (state, response) {
    state.grid.rows = response.body.data
    state.grid.pagination = response.body.pagination
    state.grid.sort = response.body.sort
    state.grid.inProgress = false
  },
  [types.SETTINGS_USERS_GRID_LOAD_FAILURE] (state, error) {
    state.grid.inProgress = false
  },
  [types.SETTINGS_USERS_GRID_DELETE_REQUEST] (state, error) {
    state.grid.inProgress = true
  },
  [types.SETTINGS_USERS_GRID_DELETE_FAILURE] (state, error) {
    state.grid.inProgress = false
  },
  [types.SETTINGS_USERS_GRID_ROWS_CHECKED] (state, { rowsChecked }) {
    state.grid.rowsChecked = rowsChecked
  },
  [types.SETTINGS_USERS_SORT_CHANGE] (state, { column }) {
    if (column.data === state.grid.sort.property) {
      state.grid.sort.ascending = !(state.grid.sort.ascending)
    } else {
      state.grid.sort.property = column.data
      state.grid.sort.ascending = true
    }
  },
  [types.SETTINGS_USERS_ROWS_CHANGE] (state, { numberOfElements }) {
    state.grid.pagination.numberOfElements = numberOfElements
  },
  [types.SETTINGS_USERS_PAGE_CHANGE] (state, { page }) {
    state.grid.pagination.currentPage = page
  },
  [types.SETTINGS_USERS_PAGE_BEFORE] (state) {
    if (state.grid.pagination.currentPage > 1) {
      state.grid.pagination.currentPage = state.grid.pagination.currentPage - 1
    }
  },
  [types.SETTINGS_USERS_PAGE_NEXT] (state) {
    if (state.grid.pagination.currentPage < state.grid.pagination.totalPages) {
      state.grid.pagination.currentPage = state.grid.pagination.currentPage + 1
    }
  }
}

// initial State
const state = {
  grid: {
    inProgress: false,
    rows: [],
    rowsChecked: [],
    pagination: {
      currentPage: 1,
      firstPage: true,
      lastPage: true,
      numberOfElements: 10,
      totalElements: 4,
      totalPages: 1
    },
    sort: {
      ascending: true,
      property: 'id'
    }
  }
}

const actions = {
  'settings/users/load' ({ commit, state }) {
    commit(types.SETTINGS_USERS_GRID_LOAD_REQUEST)
    let settings = {
      'page': state.grid.pagination.currentPage,
      'size': state.grid.pagination.numberOfElements,
      'sort': (state.grid.sort.ascending ? '+' : '-') + state.grid.sort.property
    }
    Vue.http.get(apiBase, { params: settings })
      .then(response => commit(types.SETTINGS_USERS_GRID_LOAD, response))
      .catch((error) => commit(types.SETTINGS_USERS_GRID_LOAD_FAILURE, error))
  },
  'settings/users/submit' ({ dispatch, commit, state }, { userData }) {
    return Vue.http.post(
      apiBase,
      userData
    ).then((response) => {
      dispatch('settings/users/load')
    })
    .catch((error) => {
      console.log(error)
    })
  },
  'settings/users/edit' ({ dispatch, commit, state }, { userData }) {
    return Vue.http.put(
      apiBase + `/${userData.id}`,
      userData
    ).then((response) => {
      dispatch('settings/users/load')
    })
    .catch((error) => {
      console.log(error)
    })
  },
  'settings/users/delete' ({ dispatch, commit, state }) {
    commit(types.SETTINGS_USERS_GRID_DELETE_REQUEST)
    let ids = []
    state.grid.rowsChecked.forEach(function (row) {
      ids.push(row.id)
    })
    return Vue.http.delete(apiBase, { body: { ids } })
      .then((response) => {
        dispatch('settings/users/load')
      })
      .catch((error) => commit(types.SETTINGS_USERS_GRID_DELETE_FAILURE, error))
  }
}

export default {
  state,
  mutations,
  actions
}
