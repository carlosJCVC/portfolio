import { createRouter, createWebHistory } from 'vue-router'
import DevOS from '../views/DevOS.vue'
import ClassicPortfolio from '../views/ClassicPortfolio.vue'
import LandingPage from '../views/LandingPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: { title: 'Carlos Veizaga - Welcome' }
    },
    {
      path: '/os',
      name: 'devos',
      component: DevOS,
      meta: { title: 'Carlos DevOS' }
    },
    {
      path: '/classic',
      name: 'classic',
      component: ClassicPortfolio,
      meta: { title: 'Carlos Veizaga - Portfolio' }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Carlos Veizaga'

  // Handle body overflow for OS vs Classic
  if (to.name === 'devos' || to.name === 'landing') {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }

  next()
})

export default router
