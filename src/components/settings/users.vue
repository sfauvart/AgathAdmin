<template>
  <div>
    <div ref="notification" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>

    <div class="mdl-grid">
      <datatables
        ref="userstables"
        :title="$t('users.grid.title')"
        :columns="columns"
        :rows="rows"
        :pagination="pagination"
        :sort="sort"
        @add-click="showAddDialog()"
        @delete-click="showDeleteDialog(arguments[0])"
        @pagination-change="refreshData()"
        :tooltips="{ addButton: $t('users.button.add'), deleteButton: $t('users.button.delete'), editButton: $t('users.button.edit') }"
      />
    </div>

    <mdl-dialog ref="addUserDiag" :title="$t('users.button.add')">
      <form ref="addUserForm" class="add-user-form" name="add-user" v-on:submit="submitUser">
        <div class="mdl-grid">
          <mdl-textfield type="text" :floating-label="$t('users.grid.last_name')" v-model="addUser.last_name" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="text" :floating-label="$t('users.grid.first_name')" v-model="addUser.first_name" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="email" :floating-label="$t('users.grid.email')" v-model="addUser.email" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="text" :floating-label="$t('users.grid.username')" v-model="addUser.username" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-checkbox v-model="addUser.enabled" class="mdl-js-ripple-effect">{{ $t('users.grid.enabled') }}</mdl-checkbox>
          <mdl-checkbox v-model="addUser.locked" class="mdl-js-ripple-effect">{{ $t('users.grid.locked') }}</mdl-checkbox>
          <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password')" required v-model="addUser.password" class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password_bis')" required :pattern="this.addUser.password" v-model="addUser.password_bis" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
        </div>
        <div class="mdl-dialog__actions">
          <mdl-button type="submit" class="mdl-js-ripple-effect" primary>{{ $t('general.button.save') }}</mdl-button>
          <mdl-button @click.native="closeAddDialog()" class="mdl-js-ripple-effect" primary>{{ $t('general.button.cancel') }}</mdl-button>
        </div>
      </form>

      <template slot="actions">
      </template>
    </mdl-dialog>

    <mdl-dialog ref="deleteUserDiag" title="">
      <p>{{ $t('users.dialog.delete.confirm') }}</p>
      <template slot="actions">
        <mdl-button primary colored @click.native="">{{ $t('general.button.delete') }}</mdl-button>
        <mdl-button @click.native="closeDeleteDialog()">{{ $t('general.button.cancel') }}</mdl-button>
      </template>
    </mdl-dialog>
  </div>
</template>

<script>
  import Datatables from 'components/Datatables'

  /* eslint-disable no-undef */
  /* eslint-disable no-unused-vars */
  module.exports = {
    name: 'Users',
    components: {
      Datatables
    },
    data: function () {
      return {
        grid: null,
        users: '',
        roles: [ 'ADMIN', 'GUEST' ],
        columns: [
          { data: 'id', title: this.$t('users.grid.id'), numeric: true },
          { data: 'last_name', title: this.$t('users.grid.last_name') },
          { data: 'first_name', title: this.$t('users.grid.first_name') },
          { data: 'email', title: this.$t('users.grid.email') },
          { data: 'username', title: this.$t('users.grid.username') },
          { data: 'enabled', title: this.$t('users.grid.enabled'), render: 'checkbox' },
          { data: 'locked', title: this.$t('users.grid.locked'), render: 'checkbox' },
          { data: 'last_login', title: this.$t('users.grid.last_login'), render: this.convertLastLoginDate },
          { data: 'roles', title: this.$t('users.grid.roles') }
        ],
        rows: [],
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
        },
        addUser: {
          last_name: '',
          first_name: '',
          username: '',
          email: '',
          enabled: true,
          locked: false,
          roles: [],
          password: '',
          password_bis: ''
        }
      }
    },
    watch: {
    },
    mounted () {
      componentHandler.upgradeElement(this.$refs.notification, 'MaterialSnackbar')
      this.refreshData()
    },
    methods: {
      convertLastLoginDate: function (data) {
        if (data) {
          return window.moment(data).calendar()
        }
        return ''
      },
      refreshData: function () {
        let settings = {
          'page': this.pagination.currentPage,
          'size': this.pagination.numberOfElements,
          'sort': this.sort.ascending ? '+' + this.sort.property : '-' + this.sort.property
        }
        return this.$http.get(
          'api/users',
          { params: settings }
        ).then((response) => {
          this.rows = response.body.data
          this.pagination = response.body.pagination
          this.sort = response.body.sort
        })
        .catch((error) => { console.log(error) })
      },
      showAddDialog: function () {
        this.$refs.addUserDiag.open()
      },
      closeAddDialog: function () {
        this.$refs.addUserDiag.close()
      },
      showDeleteDialog: function (rows) {
        this.$refs.deleteUserDiag.title = this.$tc('users.dialog.delete.title', rows.length, { nb: rows.length })
        this.$refs.deleteUserDiag.open()
      },
      closeDeleteDialog: function () {
        this.$refs.deleteUserDiag.close()
      },
      submitUser: function (event) {
        let vm = this
        event.preventDefault()
        this.$http.post(
          'api/users',
          this.addUser
        ).then((response) => {
          vm.$refs.notification.MaterialSnackbar.showSnackbar({
            message: this.$t('users.info.user_added'),
            timeout: 2000
          })
          vm.refreshData()
          vm.$refs.addUserDiag.close()
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>
