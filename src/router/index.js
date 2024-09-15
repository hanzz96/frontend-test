// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes as mainRoutes } from './mainRoute';
import store from '@/store';

const routes = [  
  {
    path: '/login',  name: 'Login',
    component: () => import('@/views/Login/Base')
  },
  {
    path: '/demo',   name: 'Demo',
    component: () => import('@/views/Demo')
  },
  ...mainRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated || localStorage.getItem('user') || sessionStorage.getItem('user');

  // console.log(isAuthenticated,'isauthenticated');
  // If trying to access a protected route without being logged in
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'Login' });
  }
  // If already authenticated, redirect from login or "/" to dashboard
  else if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router
