<template>
  <div>
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--4-col">
        <a class="mdl-button mdl-button--raised mdl-button--colored mdl-js-button mdl-js-ripple-effect">
          <i class="material-icons">add</i><span class="right">{{ $t('users.button.add') }}</span>
        </a>
      </div>
    </div>

    <table id="datatables" class="mdl-data-table" cellspacing="0" width="100%">
    </table>
  </div>
</template>

<script>
  /* eslint-disable no-undef */
  /* eslint-disable no-unused-vars */
  module.exports = {
    name: 'Users',
    data: function () {
      return {
        grid: null,
        users: '',
        roles: [ 'ADMIN', 'GUEST' ]
      }
    },
    watch: {
      users: function (val, oldVal) {

      }
    },
    mounted () {
      let vm = this
      this.grid = $('#datatables').DataTable({
        ajax: vm.loadData,
        columns: [
          { data: 'id', title: this.$t('users.grid.id') },
          { data: 'username', title: this.$t('users.grid.username') },
          { data: 'first_name', title: this.$t('users.grid.first_name') },
          { data: 'last_name', title: this.$t('users.grid.last_name') },
          { data: 'email', title: this.$t('users.grid.email') },
          { data: 'enabled',
            title: this.$t('users.grid.enabled'),
            render: function (data, type, row) {
              if (type === 'display') {
                if (data === true) {
                  return '<input type="checkbox" checked disabled>'
                } else {
                  return '<input type="checkbox" disabled>'
                }
              }
              return data
            },
            className: 'dt-body-center'
          },
          { data: 'locked',
            title: this.$t('users.grid.locked'),
            render: function (data, type, row) {
              if (type === 'display') {
                if (data === true) {
                  return '<input type="checkbox" checked disabled>'
                } else {
                  return '<input type="checkbox" disabled>'
                }
              }
              return data
            },
            className: 'dt-body-center'
          },
          { data: 'last_login', title: this.$t('users.grid.last_login'), render: $.fn.dataTable.render.moment('YYYY-MM-DDThh:mm:ssZ', 'Do MMMM YYYY, hh:mm:ss', 'fr') },
          { data: 'roles', title: this.$t('users.grid.roles') },
          { data: null,
            className: 'action-icons center',
            orderable: false,
            render: function (data, type, row) {
              return `<button class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">mode_edit</i></button>
                  <button id="tt_${row.id}" class="mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-js-ripple-effect mdl-button--colored"><i class="material-icons">delete</i></button>
                  <div class="mdl-tooltip" data-mdl-for="tt_${row.id}">${vm.$t('users.button.delete')}</div>`
            }
          }
        ]
      })
      componentHandler.upgradeElements(this.$el)
    },
    methods: {
      loadData: function (data, callback, settings) {
        return this.$http.get(
          'api/users'
        ).then((response) => { callback({ data: response.body }) })
        .catch((error) => { console.log(error) })
      },
      insertItem: function (item) {
        return this.$http.post(
          'api/users',
          item
        ).then((response) => { return response.body })
        .catch((error) => { console.log(error) })
      },
      updateItem: function (item) {
        return this.$http.put(
          'api/users/' + item.id,
          item
        ).then((response) => { return response.body })
        .catch((error) => { console.log(error) })
      },
      deleteItem: function (item) {
        return this.$http.delete(
          'api/users/' + item.id,
          item
        ).then((response) => { return response.body })
        .catch((error) => { console.log(error) })
      }
    }
  }
</script>
