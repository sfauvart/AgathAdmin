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
        <div v-if="error && messages != ''" class="card red lighten-5">
          <div class="card-content red-text" v-html="$t(messages)"></div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">perm_identity</i>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--11-col">
            <input id="email" type="email" name="email" class="mdl-textfield__input" required v-model="email"/>
            <label for="email" class="mdl-textfield__label" v-html="$t('login.form.input.label.email')"></label>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">lock_outline</i>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--11-col">
            <input :class="{ 'is-valid': this.password_equal, 'is-invalid': !password_equal }" class="mdl-textfield__input" type="password" name="password" required v-model="password"/>
            <label for="password" class="mdl-textfield__label" v-html="$t('signup.form.input.label.password')"></label>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--1-col mdl-cell--middle center">
            <i class="material-icons">lock_outline</i>
          </div>
          <div class="mdl-textfield mdl-js-textfield mdl-cell mdl-cell--11-col">
            <input :class="{ 'is-valid': this.password_equal, 'is-invalid': !password_equal }" class="mdl-textfield__input" type="password" name="password_bis" required v-model="password_bis"/>
            <label for="password" class="mdl-textfield__label" v-html="$t('signup.form.input.label.password_bis')"></label>
          </div>
        </div>
        <div class="mdl-grid">
          <div class="mdl-cell mdl-cell--12-col">
            <button type="submit" class="mdl-cell--12-col mdl-button mdl-js-button mdl-button--raised mdl-button--accent mdl-js-ripple-effect" v-html="$t('signup.form.submit')"></button>
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
        password_equal: true,
        email: '',
        password: '',
        password_bis: ''
      }
    },
    watch: {
      password: function () {
        this.checkPassword()
      },
      password_bis: function () {
        this.checkPassword()
      }
    },
    methods: {
      checkPassword: function () {
        if (this.password_bis === this.password) {
          this.password_equal = true
        } else {
          this.password_equal = false
        }
      },
      signup: function (event) {
        event.preventDefault()
        this.$store.dispatch('signup', { email: this.email, password: this.password })
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
