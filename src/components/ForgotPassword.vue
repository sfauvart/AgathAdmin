<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset mdl-card mdl-shadow--4dp">
      <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
        <span>
          <div class="mdl-card__title-text" v-html="$t('forgot_password.title')"></div>
          <div class="mdl-card__subtitle-text mdl-color-text--grey-300" v-html="$t('forgot_password.help')"></div>
        </span>
			</div>
      <div v-if="$store.state.auth.error && $store.state.auth.messages != ''" class="mdl-card__title mdl-color--grey-200 mdl-color-text--red-400">
        <b v-html="$t($store.state.auth.messages)"></b>
      </div>

      <form class="forgot-password-form" name="forgot-password" v-on:submit="forgot" autocomplete="on">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">perm_identity</i>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--11-col">
            <input id="email" type="email" name="email" class="mdl-textfield__input" required v-model="email"/>
            <label for="email" class="mdl-textfield__label" v-html="$t('forgot_password.form.input.label.email')"></label>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <button type="submit" class="mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-html="$t('forgot_password.form.submit')"></button>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--6-col">
            <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" :to="{name: 'signup'}">
              {{ $t('login.signup') }}
            </router-link>
          </div>
          <div class="mdl-cell mdl-cell--6-col right">
            <router-link class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect" :to="{name: 'login'}">
              {{ $t('login.title') }}
            </router-link>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script>
  module.exports = {
    name: 'ForgotPassword',
    data: function () {
      return {
        email: ''
      }
    },
    methods: {
      forgot: function (event) {
        event.preventDefault()
        this.$store.dispatch('forgot', { email: this.email })
      }
    },
    mounted () {
      /* eslint-disable no-undef */
      componentHandler.upgradeElements(this.$el)
    }
  }
</script>

<style lang="scss">

</style>
