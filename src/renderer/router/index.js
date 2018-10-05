import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: require('@/components/MainPage').default
    },
    {
      path: '/information',
      name: 'info',
      component: require('@/components/InfoPage').default
    },
    {
      path: '/log',
      name: 'log',
      component: require('@/components/LogPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
