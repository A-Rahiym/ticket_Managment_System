import type { RouteRecordRaw } from 'vue-router'
import LandingPage from '@/routes/landing/LandingPage.vue'
import AuthPage from '@/routes/auth/AuthPage.vue'
// import DashboardPage from '../routes/dashboard/DashboardPage.vue'
// import TicketsPage from '../routes/tickets/TicketsPage.vue'
// import ProtectedRoute from '../components/ProtectedRoute.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: LandingPage,
  },
  {
    path: '/login',
    component: AuthPage,
    props: { mode: 'login' },
  },
  // {
  //   path: '/signup',
  //   component: AuthPage,
  //   props: { mode: 'signup' },
  // },
  // {
  //   path: '/dashboard',
  //   component: ProtectedRoute,
  //   children: [
  //     {
  //       path: '',
  //       component: DashboardPage,
  //     },
  //   ],
  // },
  // {
  //   path: '/tickets',
  //   component: ProtectedRoute,
  //   children: [
  //     {
  //       path: '',
  //       component: TicketsPage,
  //     },
  //   ],
  // },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]
