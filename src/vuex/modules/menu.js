import menu from '../../routes/sidebar'
import { MENU_OBJECT } from '../mutation-types'

const mutations = {
  [MENU_OBJECT] (state, data) {
    if (data && typeof data === 'object') {
      state.user = data
    }
  }
}

const state = {
  sidemenu: menu
}

export default {
  state,
  mutations
}
