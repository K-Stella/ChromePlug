import Vue from 'vue'
import Router from 'vue-router'
import exchange from '@/views/exchange'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Exchange',
      component: exchange
    }
  ]
})
