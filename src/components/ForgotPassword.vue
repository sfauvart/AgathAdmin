<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset mdl-card mdl-shadow--4dp">
      <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
        <span>
          <div class="mdl-card__title-text" v-html="$t('forgot_password.title')"></div>
          <div class="mdl-card__subtitle-text mdl-color-text--grey-300" v-html="$t('forgot_password.help')"></div>
        </span>
			</div>
      <div v-if="$store.state.auth.error && $store.state.auth.error_messages != ''" class="mdl-card__title mdl-color--grey-200 mdl-color-text--red-400">
        <b v-html="$t($store.state.auth.error_messages)"></b>
      </div>
      <div v-if="$store.state.auth.notif_messages != ''" class="mdl-card__title mdl-color--grey-200">
        <b v-html="$t($store.state.auth.notif_messages)"></b>
      </div>

      <form class="forgot-password-form" name="forgot-password" v-on:submit="forgot" autocomplete="on">
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">perm_identity</i>
          </div>
          <mdl-textfield type="email" :floating-label="$t('forgot_password.form.input.label.email')" v-model="email" required class="mdl-cell mdl-cell--10-col"></mdl-textfield>
        </div>

        <template v-if="token !== ''">
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
              <i class="material-icons">lock_outline</i>
            </div>
            <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password')" required v-model="password" class="mdl-cell mdl-cell--10-col"></mdl-textfield>
          </div>
          <div class="mdl-grid">
            <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
              <i class="material-icons">lock_outline</i>
            </div>
            <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password_bis')" required :pattern="this.password" v-model="password_bis" class="mdl-cell mdl-cell--10-col"></mdl-textfield>
          </div>
        </template>

        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <mdl-button type="submit" class="mdl-cell--12-col mdl-js-ripple-effect" accent raised>{{ $t('forgot_password.form.submit') }}</mdl-button>
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
        email: '',
        token: '',
        password: '',
        password_bis: ''
      }
    },
    methods: {
      forgot: function (event) {
        event.preventDefault()
        if (this.token === '') {
          this.$store.dispatch('forgot', { email: this.email })
        } else {
          this.$store.dispatch('forgot_confirm', { email: this.email, token: this.token, password: this.password })
        }
      }
    },
    mounted () {
      if (this.$route.query.email && this.$route.query.token) {
        this.email = this.$route.query.email
        this.token = this.$route.query.token
      }
    }
  }
</script>

<style lang="scss">

</style>
