import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '@/pages/LandingPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import ServicesPage from '@/pages/ServicePage.vue'
import DateTimePage from '@/pages/DateTimePage.vue'
import AdminPage from '@/pages/AdminPage.vue'

const routes = [
  { path: '/', component: LandingPage },
  { path: '/login', component: LoginPage },
  { path: '/services', component: ServicesPage },
  { path: '/datetime', component: DateTimePage },
  { path: '/admin', component: AdminPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
