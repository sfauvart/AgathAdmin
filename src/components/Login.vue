<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset mdl-card mdl-shadow--4dp">
      <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
        <span>
          <div class="mdl-card__title-text" v-html="$t('login.title')"></div>
          <div class="mdl-card__subtitle-text mdl-color-text--grey-300" v-html="$t('login.help')"></div>
        </span>
			</div>
      <div v-if="$store.state.auth.error && $store.state.auth.messages != ''" class="mdl-card__title mdl-color--grey-200 mdl-color-text--red-400">
        <b v-html="$t($store.state.auth.messages)"></b>
      </div>

      <form class="login-form" name="login" v-on:submit="login" autocomplete="on">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">perm_identity</i>
          </div>
          <mdl-textfield id="email" type="email" :floating-label="$t('login.form.input.label.email')" v-model="email" required class="mdl-cell mdl-cell--10-col"></mdl-textfield>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">lock_outline</i>
          </div>
          <mdl-textfield id="password" type="password" :floating-label="$t('login.form.input.label.password')" v-model="password" class="mdl-cell mdl-cell--10-col"></mdl-textfield>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <mdl-checkbox id="remember-me" v-model="remember" class="mdl-js-ripple-effect">{{ $t('login.form.remember') }}</mdl-checkbox>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <mdl-button type="submit" class="mdl-cell--12-col mdl-js-ripple-effect" accent raised>{{ $t('login.form.signin') }}</mdl-button>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--6-col">
            <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" :to="{name: 'signup'}">
              {{ $t('login.signup') }}
            </router-link>
          </div>
          <div class="mdl-cell mdl-cell--6-col right">
            <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" :to="{name: 'forgot_password'}">
              {{ $t('login.forgot_password') }}
            </router-link>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  module.exports = {
    name: 'Login',
    data: function () {
      return {
        email: '',
        password: '',
        remember: true
      }
    },
    methods: {
      login: function (event) {
        event.preventDefault()
        this.$store.dispatch('signin', { email: this.email, password: this.password })
      }
    }
  }
</script>

<style lang="scss">
</style>
