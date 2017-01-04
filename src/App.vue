<template>
  <div id="app">
    <mprogress/>
    <div v-if="$route.meta.layout === '1-2'">
      <div class="mdl-layout__container">
        <div class="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-drawer mdl-layout--fixed-header has-drawer is-upgraded">
          <header class="demo-header mdl-layout__header mdl-color--grey-100 mdl-color-text--grey-600">
            <top-bar/>
          </header>
          <div class="demo-drawer mdl-layout__drawer mdl-color--blue-grey-900 mdl-color-text--blue-grey-50">
            <sidebar/>
          </div>
          <main class="mdl-layout__content mdl-color--grey-100">
            <div class="mdl-grid demo-content">
              <router-view></router-view>
            </div>
          </main>
        </div>
      </div>
    </div>
    <div v-else-if="$route.meta.layout === 'fullpage'">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { TopBar, Sidebar, Mprogress } from 'components/layout/'
import Login from 'components/Login'

export default {
  name: 'app',
  components: {
    TopBar,
    Sidebar,
    Login,
    Mprogress
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
</style>
