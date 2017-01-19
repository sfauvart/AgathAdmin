import menu from '../../routes/sidebar'
import { router } from '../../main.js'
import { MENU_OBJECT, MENU_REFRESH, MENU_EXPAND_TOGGLE } from '../mutation-types'

const mutations = {
  [MENU_OBJECT] (state, data) {
    if (data && typeof data === 'object') {
      state.user = data
    }
  },
  [MENU_REFRESH] (state) {
    // Expand the sidemenu tree to the current path
    let currentPath = router.currentRoute.path
    state.sidemenu.forEach(function (item) {
      let toExpand = false
      if (typeof (item.children) === 'object') {
        item.children.forEach(function (child) {
          if (item.path + '/' + child.path === currentPath) {
            item.meta.expanded = true
            toExpand = true
          }
        })
      }
      if (item.path === currentPath || toExpand) {
        item.meta.expanded = true
      }
    })
  },
  [MENU_EXPAND_TOGGLE] (state, path) {
    state.sidemenu.forEach(function (item) {
      if (item.path === path) {
        item.meta.expanded = !item.meta.expanded
        return
      }
    })
  }
}

// initial State
const state = {
  sidemenu: menu
}

const actions = {
  'menu/toggle' ({ commit, state }, { path }) {
    commit(MENU_EXPAND_TOGGLE, path)
  },
  'menu/refresh' ({ commit, state }, { path }) {
    commit(MENU_EXPAND_TOGGLE, path)
  }
}

export default {
  state,
  mutations,
  actions
}
