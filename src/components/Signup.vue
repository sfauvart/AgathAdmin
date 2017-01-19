<template>
  <div class="mdl-grid">
    <div class="mdl-cell mdl-cell--6-col mdl-cell--3-offset mdl-card mdl-shadow--4dp">
      <div class="mdl-card__title mdl-color--primary mdl-color-text--white">
        <span>
          <div class="mdl-card__title-text" v-html="$t('signup.title')"></div>
          <div class="mdl-card__subtitle-text mdl-color-text--grey-300" v-html="$t('signup.help')"></div>
        </span>
			</div>
      <div v-if="$store.state.auth.error && $store.state.auth.messages != ''" class="mdl-card__title mdl-color--grey-200 mdl-color-text--red-400">
        <b v-html="$t($store.state.auth.messages)"></b>
      </div>

      <form class="signup-form" name="signup" v-on:submit="signup" autocomplete="off">
        <div v-if="$store.state.auth.error && $store.state.auth.messages != ''" class="card red lighten-5">
          <div class="card-content red-text" v-html="$t(messages)"></div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">perm_identity</i>
          </div>
          <mdl-textfield :floating-label="$t('login.form.input.label.email')" v-model="email" type="email" required class="mdl-cell mdl-cell--10-col"></mdl-textfield>
        </div>
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
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <mdl-button type="submit" class="mdl-cell--12-col mdl-js-ripple-effect" accent raised>{{ $t('signup.form.submit') }}</mdl-button>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell">
            {{ $t('signup.bottom_text') }}
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
    name: 'Signup',
    data: function () {
      return {
        email: '',
        password: '',
        password_bis: ''
      }
    },
    methods: {
      signup: function (event) {
        event.preventDefault()
        this.$store.dispatch('signup', { email: this.email, password: this.password })
      }
    }
  }
</script>

<style lang="scss">

</style>
