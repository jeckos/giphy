import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Index.vue'
import gifOne from './views/gifOne.vue'
import Profile from './views/profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:id',
      name: 'gifOne',
      component: gifOne
    },
    {
      path: '/profile/:id',
      name: "Profile",
      component: Profile
    }
  ]
})
