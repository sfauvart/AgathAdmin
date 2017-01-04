<template>
  <div>
    <ul class="demo-list-icon mdl-list">
      <li class="mdl-list__item" v-for="item in menu" style="flex-wrap: wrap;">
        <template v-if="!hasChildren(item)">
          <router-link class="mdl-list__item-primary-content" :to="item.path" :exact="true" v-if="item.path">
            <i class="material-icons mdl-list__item-icon">{{ item.meta.icon }}</i>
            {{ $t('menu.sidebar.' + item.name) }}
          </router-link>
        </template>
        <template v-else>
          <a href="#" class="mdl-list__item-primary-content" @click="toggle(item)">
            <i class="material-icons mdl-list__item-icon">{{ item.meta.icon }}</i>
            {{ $t('menu.sidebar.' + item.name + '.root') }}
            <span class="mdl-list__item-secondary-action">
              <i v-if="!isExpanded(item)" class="material-icons right">keyboard_arrow_right</i>
              <i v-if="isExpanded(item)" class="material-icons right">keyboard_arrow_down</i>
            </span>
          </a>
          <ul class="mdl-list" v-show="isExpanded(item)">
            <li class="mdl-list__item" v-for="subItem in item.children" v-if="subItem.path">
              <router-link class="mdl-list__item-primary-content" :to="item.path + '/' + subItem.path">
                <i class="material-icons mdl-list__item-icon">{{ subItem.meta.icon }}</i>
                {{ $t('menu.sidebar.' + item.name + '.' + subItem.name) }}
              </router-link>
            </li>
          </ul>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  computed: {
    menu () {
      return this.$store.state.menu.sidemenu
    }
  },
  methods: {
    hasChildren (item) {
      return item.children && item.children.length
    },
    isExpanded (item) {
      return item.meta.expanded
    },

    toggle (item) {
      item.meta.expanded = !item.meta.expanded
    },
    generatePath (item, subItem) {
      return `${item.component ? item.path + '/' : ''}${subItem.path}`
    }
  },
  mounted () {
    /* eslint-disable no-undef */
    componentHandler.upgradeElements(this.$el)
  }
}
</script>

<style lang="scss" scoped>
.side-nav {
  top: 64px;
}
.collapsible:after {
    font-family: 'Material Icons';
    content: "keyboard arrow right";
    float: right;
    color: #9e9e9e;
    font-size: 18px;
}
</style>
