const sidebar = [
  {
    path: '/',
    name: 'home',
    meta: {
      icon: 'home',
      layout: '1-2',
      requiresAuth: true
    },
    component: require('../components/Hello.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    meta: {
      icon: 'settings',
      layout: '1-2',
      requiresAuth: true,
      expanded: false
    },
    component: require('../components/settings/root.vue'),
    children: [
      {
        path: 'users',
        name: 'users',
        meta: {
          icon: 'perm_identity',
          layout: '1-2',
          requiresAuth: true
        },
        component: require('../components/settings/users.vue')
      }
    ]
  }
]

export default sidebar
