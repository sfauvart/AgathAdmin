<template>
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-shadow--4dp">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">{{ title }}</span>
        <!-- Add spacer, to align buttons to the right -->
        <div class="mdl-layout-spacer"></div>
        <div class="right">
          <mdl-tooltip target="add-button">{{ tooltips.addButton }}</mdl-tooltip>
          <mdl-button id="add-button" icon colored fab class="mdl-js-ripple-effect" @click.native="addButton()"><i class="material-icons">add</i></mdl-button>
          <template v-if="selected.length > 0">
            <mdl-tooltip target="delete-button">{{ tooltips.deleteButton }}</mdl-tooltip>
            <mdl-button id="delete-button" icon colored fab class="mdl-js-ripple-effect" @click.native="deleteButton()"><i class="material-icons">delete</i></mdl-button>
          </template>
        </div>
      </div>
    </header>

    <main class="">
      <div class="page-content">
        <table class="mdl-data-table mdl-js-data-table full-width-table">
          <thead>
            <tr>
              <th class="mdl-data-table__cell--non-numeric">
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" for="table-header">
                  <input type="checkbox" id="table-header" class="mdl-checkbox__input" @change="headerCheckHandler($event)"/>
                </label>
              </th>
              <th v-for="column in columns"
              @click="sortBy(column)"
              :class="{
                'mdl-data-table__cell--non-numeric': !isNumeric(column),
                'mdl-data-table__header--sorted-ascending': isAsc(column),
                'mdl-data-table__header--sorted-descending': isDesc(column)
              }">
              {{ column.title }}
              </th>
              <th class="mdl-data-table__cell--non-numeric">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, index) in rows">
              <td class="mdl-data-table__cell--non-numeric">
                <label class="mdl-checkbox mdl-js-checkbox mdl-js-ripple-effect mdl-data-table__select" :for="'row[' + index + ']'">
                  <input type="checkbox" :id="'row[' + index + ']'" :data-index="index" class="mdl-checkbox__input" @change="rowCheckHandler($event)"/>
                </label>
              </td>
              <template v-for="column in columns">
                <td :class="{ 'mdl-data-table__cell--non-numeric': !isNumeric(column) }">
                  <template v-if="column.render === 'switch'">
                    <mdl-switch @input="" :value="row[column.data]" class="mdl-js-ripple-effect" disabled="disabled"></mdl-switch>
                  </template>
                  <template v-else-if="column.render === 'checkbox'">
                    <mdl-checkbox :value="row[column.data]" class="mdl-js-ripple-effect" disabled="disabled"></mdl-checkbox>
                  </template>
                  <template v-else-if="typeof(column.render) === 'function'">
                    {{ column.render(row[column.data]) }}
                  </template>
                  <template v-else>
                    {{ row[column.data] }}
                  </template>
                </td>
              </template>
              <td class="mdl-data-table__cell--non-numeric">
                <mdl-tooltip :target="'edit-button-' + index">{{ tooltips.editButton }}</mdl-tooltip>
                <mdl-button :id="'edit-button-' + index" icon colored fab class="mdl-js-ripple-effect" @click.native="editButton(row)"><i class="material-icons">edit</i></mdl-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>

    <footer class="mdl-mini-footer pagination-footer">
      <div class="mdl-mini-footer__right-section">
        <mdl-select label="Page" @input="pageChange(arguments[0])" id="pagination-page-select" :value.sync="pagination.currentPage" :options="pagesArray"></mdl-select>
        <mdl-select label="Rows per page" @input="nbElemChange(arguments[0])" id="pagination-rows-select" :value.sync="pagination.numberOfElements" :options="rowsArray"></mdl-select>
        <mdl-button :disabled="pagination.firstPage ? true : false" id="pagination-before-button" class="mdl-js-ripple-effect" @click.native="navBefore()"><i class="material-icons">navigate_before</i></mdl-button>
        <mdl-button :disabled="pagination.lastPage ? true : false" id="pagination-next-button" class="mdl-js-ripple-effect" @click.native="navNext()"><i class="material-icons">navigate_next</i></mdl-button>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'datatables',
  props: ['title', 'columns', 'rows', 'pagination', 'sort', 'tooltips'],
  data: function () {
    return {
      selected: [],
      rowsArray: ['5', '10', '25', '50', '75', '100']
    }
  },
  computed: {
    pagesArray: function () {
      return [...Array(this.pagination.totalPages + 1).keys()].slice(1).map(String)
    }
  },
  methods: {
    isNumeric: function (column) {
      if (column.numeric !== undefined && column.numeric === true) {
        return true
      }
      return false
    },
    isAsc: function (column) {
      if (column.data === this.sort.property && this.sort.ascending) {
        return true
      }
      return false
    },
    isDesc: function (column) {
      if (column.data === this.sort.property && !this.sort.ascending) {
        return true
      }
      return false
    },
    sortBy: function (column) {
      if (column.data === this.sort.property) {
        this.sort.ascending = !this.sort.ascending
      } else {
        this.sort.property = column.data
        this.sort.ascending = true
      }
      this.$emit('pagination-change')
    },
    addButton: function () {
      this.$emit('add-click')
    },
    deleteButton: function () {
      let rowsChecked = []
      let vm = this
      this.selected.forEach(function (index) {
        rowsChecked.push(vm.rows[index])
      })
      this.$emit('delete-click', rowsChecked)
    },
    editButton: function (row) {
      this.$emit('edit-click', row)
    },
    pageChange: function (page) {
      this.pagination.currentPage = page
      this.$emit('pagination-change')
    },
    nbElemChange: function (numberOfElements) {
      this.pagination.numberOfElements = numberOfElements
      this.$emit('pagination-change')
    },
    navBefore: function () {
      if (this.pagination.currentPage > 1) {
        this.pagination.currentPage = this.pagination.currentPage - 1
        this.$emit('pagination-change')
      }
    },
    navNext: function () {
      if (this.pagination.currentPage < this.pagination.totalPages) {
        this.pagination.currentPage = this.pagination.currentPage + 1
        this.$emit('pagination-change')
      }
    },
    headerCheckHandler: function (event) {
      let boxes = this.$el.querySelectorAll('tbody .mdl-data-table__select [id^="row"]')
      let arrIndex = []

      if (event.target.checked) {
        boxes.forEach(function (box) {
          arrIndex.push(box.dataset.index)
          box.parentNode.MaterialCheckbox.check()
        })
      } else {
        boxes.forEach(function (box) {
          box.parentNode.MaterialCheckbox.uncheck()
        })
      }
      this.selected = arrIndex
    },
    rowCheckHandler: function (event) {
      let inputBoxes = this.$el.querySelectorAll('tbody .mdl-data-table__select [id^="row"]')
      let countChecked = 0
      let arrIndex = []

      inputBoxes.forEach(function (box) {
        if (box.checked) {
          arrIndex.push(box.dataset.index)
          countChecked++
        }
      })

      let headerBox = this.$el.querySelector('thead .mdl-data-table__select')

      if (countChecked === inputBoxes.length) {
        headerBox.MaterialCheckbox.check()
      } else {
        headerBox.MaterialCheckbox.uncheck()
      }
      this.selected = arrIndex
    }
  },
  mounted () {
  },
  updated () {
    /* eslint-disable no-undef */
    componentHandler.upgradeElements(this.$el)
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
.full-width-table {
  width:100%;
}
.pagination-footer {
  background-color: white;
}
</style>
