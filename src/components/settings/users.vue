<template>
  <div>
    <div ref="notification" class="mdl-js-snackbar mdl-snackbar">
      <div class="mdl-snackbar__text"></div>
      <button class="mdl-snackbar__action" type="button"></button>
    </div>

    <div class="mdl-grid">
      <datatables
        ref="userstables"
        state-namespace="settings/users/"
        :title="$t('users.grid.title')"
        :columns="columns"
        :rows="$store.state.settingsUser.grid.rows"
        :pagination="$store.state.settingsUser.grid.pagination"
        :sort="$store.state.settingsUser.grid.sort"
        @add-click="showAddDialog()"
        @edit-click="showEditDialog(arguments[0])"
        @delete-click="showDeleteDialog()"
        :tooltips="{ addButton: $t('users.button.add'), deleteButton: $t('users.button.delete'), editButton: $t('users.button.edit') }"
      />
    </div>

    <mdl-dialog ref="addUserDiag" :title="$t('users.button.add')">
      <form ref="addUserForm" class="add-user-form" name="add-user" v-on:submit="submitUser">
        <div class="mdl-grid">
          <mdl-textfield type="text" :floating-label="$t('users.grid.last_name')" v-model="addUser.last_name" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="text" :floating-label="$t('users.grid.first_name')" v-model="addUser.first_name" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
        </div>
        <div class="mdl-grid">
          <mdl-textfield type="email" :floating-label="$t('users.grid.email')" v-model="addUser.email" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="text" :floating-label="$t('users.grid.username')" v-model="addUser.username" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
        </div>
        <div class="mdl-grid">
          <mdl-checkbox v-model="addUser.enabled" class="mdl-js-ripple-effect">{{ $t('users.grid.enabled') }}</mdl-checkbox>
          <mdl-checkbox v-model="addUser.locked" class="mdl-js-ripple-effect">{{ $t('users.grid.locked') }}</mdl-checkbox>
        </div>
        <div class="mdl-grid">
          <template v-for="(role, index) in addUser.roles">
            <mdl-chip @delete="deleteRole(index)">{{ role }}</mdl-chip>
          </template>
        </div>
        <div class="mdl-grid">
          <mdl-textfield type="text" :floating-label="$t('users.grid.roles')" v-model="roleField" class="mdl-cell mdl-cell--4-col"></mdl-textfield>
          <mdl-button icon primary mini-fab raised type="button" @click.native="addRole()"><i class="material-icons">add</i></mdl-button>
        </div>
        <div class="mdl-grid">
          <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password')" required v-model="addUser.password" class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password_bis')" required :pattern="this.addUser.password" v-model="addUser.password_bis" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
        </div>
        <div class="mdl-dialog__actions">
          <mdl-button type="submit" class="mdl-js-ripple-effect" primary>{{ $t('general.button.save') }}</mdl-button>
          <mdl-button type="button" @click.native="closeAddDialog()" class="mdl-js-ripple-effect" primary>{{ $t('general.button.cancel') }}</mdl-button>
        </div>
      </form>
      <template slot="actions">
      </template>
    </mdl-dialog>

    <mdl-dialog ref="editUserDiag" :title="$t('users.button.edit')">
      <form ref="editUserForm" class="edit-user-form" name="edit-user" v-on:submit="submitEditUser">
        <div class="mdl-grid">
          <mdl-textfield type="text" :floating-label="$t('users.grid.last_name')" v-model="editUser.last_name" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="text" :floating-label="$t('users.grid.first_name')" v-model="editUser.first_name" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
        </div>
        <div class="mdl-grid">
          <mdl-textfield type="email" :floating-label="$t('users.grid.email')" v-model="editUser.email" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="text" :floating-label="$t('users.grid.username')" v-model="editUser.username" required class="mdl-cell mdl-cell--6-col"></mdl-textfield>
        </div>
        <div class="mdl-grid">
          <mdl-checkbox v-model="editUser.enabled" class="mdl-js-ripple-effect">{{ $t('users.grid.enabled') }}</mdl-checkbox>
          <mdl-checkbox v-model="editUser.locked" class="mdl-js-ripple-effect">{{ $t('users.grid.locked') }}</mdl-checkbox>
        </div>
        <div class="mdl-grid">
          <template v-for="(role, index) in editUser.roles">
            <mdl-chip @delete="deleteRoleEdit(index)">{{ role }}</mdl-chip>
          </template>
        </div>
        <div class="mdl-grid">
          <mdl-textfield type="text" :floating-label="$t('users.grid.roles')" v-model="roleFieldEdit" class="mdl-cell mdl-cell--4-col"></mdl-textfield>
          <mdl-button icon primary mini-fab raised type="button" @click.native="addRoleEdit()"><i class="material-icons">add</i></mdl-button>
        </div>
        <div class="mdl-grid">
          <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password')" v-model="editUser.password" class="mdl-cell mdl-cell--6-col"></mdl-textfield>
          <mdl-textfield type="password" :floating-label="$t('signup.form.input.label.password_bis')" :pattern="this.editUser.password" v-model="editUser.password_bis" class="mdl-cell mdl-cell--6-col"></mdl-textfield>
        </div>
        <div class="mdl-dialog__actions">
          <mdl-button type="submit" class="mdl-js-ripple-effect" primary>{{ $t('general.button.save') }}</mdl-button>
          <mdl-button type="button" @click.native="closeEditDialog()" class="mdl-js-ripple-effect" primary>{{ $t('general.button.cancel') }}</mdl-button>
        </div>
      </form>
      <template slot="actions">
      </template>
    </mdl-dialog>

    <mdl-dialog ref="deleteUserDiag" title="">
      <p>{{ $t('users.dialog.delete.confirm') }}</p>
      <template slot="actions">
        <mdl-button primary colored @click.native="deleteUsers()">{{ $t('general.button.delete') }}</mdl-button>
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
        },
        editUser: {
          id: '',
          last_name: '',
          first_name: '',
          username: '',
          email: '',
          enabled: true,
          locked: false,
          roles: [],
          password: '',
          password_bis: ''
        },
        roleField: '',
        roleFieldEdit: ''
      }
    },
    watch: {
    },
    mounted () {
      componentHandler.upgradeElement(this.$refs.notification, 'MaterialSnackbar')
    },
    methods: {
      convertLastLoginDate: function (data) {
        if (data) {
          return window.moment(data).calendar()
        }
        return ''
      },
      refreshData: function () {
        this.$store.dispatch('settings/users/load')
      },
      showAddDialog: function () {
        this.$refs.addUserDiag.open()
      },
      closeAddDialog: function () {
        this.$refs.addUserDiag.close()
      },
      deleteRole: function (index) {
        this.addUser.roles.splice(index, 1)
      },
      addRole: function () {
        if (this.roleField !== '') {
          this.addUser.roles.push(this.roleField)
          this.roleField = ''
        }
      },
      showEditDialog: function (row) {
        this.editUser.id = row.id
        this.editUser.last_name = row.last_name
        this.editUser.first_name = row.first_name
        this.editUser.username = row.username
        this.editUser.email = row.email
        this.editUser.enabled = row.enabled
        this.editUser.locked = row.locked
        this.editUser.roles = row.roles

        this.$refs.editUserDiag.open()
      },
      closeEditDialog: function () {
        this.$refs.editUserDiag.close()
      },
      deleteRoleEdit: function (index) {
        this.editUser.roles.splice(index, 1)
      },
      addRoleEdit: function () {
        if (this.roleFieldEdit !== '') {
          if (this.editUser.roles === null) {
            this.editUser.roles = []
          }
          this.editUser.roles.push(this.roleFieldEdit)
          this.roleFieldEdit = ''
        }
      },
      showDeleteDialog: function () {
        let nb = this.$store.state.settingsUser.grid.rowsChecked.length
        this.$refs.deleteUserDiag.title = this.$tc('users.dialog.delete.title', nb, { nb })
        this.$refs.deleteUserDiag.open()
      },
      closeDeleteDialog: function () {
        this.$refs.deleteUserDiag.close()
      },
      deleteUsers: function () {
        this.$store.dispatch('settings/users/delete').then(
          () => {
            this.closeDeleteDialog()
            this.$refs.userstables.rowUncheck()
            this.$refs.notification.MaterialSnackbar.showSnackbar({
              message: this.$tc('users.info.user_deleted', 1),
              timeout: 3000
            })
          }
        )
      },
      submitUser: function (event) {
        event.preventDefault()
        this.$store.dispatch('settings/users/submit', { userData: this.addUser }).then(
          () => {
            this.closeAddDialog()
            this.$refs.userstables.rowUncheck()
            this.$refs.notification.MaterialSnackbar.showSnackbar({
              message: this.$t('users.info.user_added'),
              timeout: 3000
            })
          }
        )
      },
      submitEditUser: function (event) {
        event.preventDefault()
        this.$store.dispatch('settings/users/edit', { userData: this.editUser }).then(
          () => {
            this.closeEditDialog()
            this.$refs.userstables.rowUncheck()
            this.$refs.notification.MaterialSnackbar.showSnackbar({
              message: this.$t('users.info.user_edited'),
              timeout: 3000
            })
          }
        )
      }
    }
  }
</script>
