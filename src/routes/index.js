import sidebar from './sidebar'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'fullpage',
      bodyClass: 'mdl-color--cyan',
      requiresAuth: false
    },
    component: require('../components/Login.vue')
  },
  {
    path: '/signup',
    name: 'signup',
    meta: {
      layout: 'fullpage',
      bodyClass: 'mdl-color--cyan',
      requiresAuth: false
    },
    component: require('../components/Signup.vue')
  },
  {
    path: '/forgot_password',
    name: 'forgot_password',
    meta: {
      layout: 'fullpage',
      bodyClass: 'mdl-color--cyan',
      requiresAuth: false
    },
    component: require('../components/ForgotPassword.vue')
  },
  ...sidebar,
  {
    path: '*',
    name: 'not-found',
    meta: {
      layout: 'fullpage',
      requiresAuth: false
    },
    component: require('../components/not-found.vue')
  }
]

export default routes
