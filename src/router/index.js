import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/LandingPage.vue'
import Login from '../views/auth/Login.vue'
import Signup from '../views/auth/Signup.vue'
import Dashboard from '../views/Dashboard.vue'
import Tickets from '../views/Tickets.vue'

const routes = [
  { path: '/', name: 'Landing', component: LandingPage },
  { path: '/auth/login', name: 'Login', component: Login },
  { path: '/auth/signup', name: 'Signup', component: Signup },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets', name: 'Tickets', component: Tickets, meta: { requiresAuth: true } },
  // fallback
  { path: '/:catchAll(.*)', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// global guard - protect routes that require auth
router.beforeEach((to, from, next) => {
  const session = localStorage.getItem('ticketapp_session')
  if (to.meta.requiresAuth && !session) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
