<template>
  <div class="mdl-layout__header-row">
    <span class="mdl-layout-title">
      <template v-if="$route.matched.length === 1">
        {{ $t('menu.sidebar.' + $route.matched[0].name) }}
      </template>
      <template v-if="$route.matched.length > 1">
        {{ $t('menu.sidebar.' + $route.matched[0].name + '.root') }}
        >
        {{ $t('menu.sidebar.' + $route.matched[0].name + '.' + $route.matched[1].name) }}
      </template>
    </span>
    <div class="mdl-layout-spacer"></div>
    <!-- Right aligned menu below button -->
    <button id="topbar-account"
            class="mdl-button mdl-js-button mdl-js-ripple-effect">
      <i class="material-icons">account_circle</i><span class="right">{{ userNames }}</span>
    </button>

    <ul class="mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect"
        for="topbar-account">
      <li class="mdl-menu__item">
        <a class="waves-effect waves-light" @click="signout()">
          <i class="material-icons left mdl-cell--middle">close</i><span class="right">{{ $t('menu.topbar.account.close') }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'top-bar',
  computed: {
    userNames () {
      return this.$store.state.auth.payload.user.first_name + ' ' + this.$store.state.auth.payload.user.last_name
    }
  },
  methods: {
    signout () {
      this.$store.dispatch('signout')
    },
    keyMenu () {
      let key = 'menu.sidebar'
      for (let i of this.$route.matched) {
        key = key + '.' + i.name
      }
      return key
    },
    hasChildren (item) {
      return item.children && item.children.length
    }
  },
  mounted () {
    /* eslint-disable no-undef */
    componentHandler.upgradeElements(this.$el)
  }
}
</script>

<style lang="scss" scoped>
.top-bar-logo {
  width: 30px;
  height: 30px;
}
</style>
