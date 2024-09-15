// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes as mainRoutes } from './mainRoute';
import store from '@/store';
import { manageVuexModule } from '@/store/managerVuextModule';
import productsModule from '@/views/Product/productModule';
import { AuthRoutes } from './authRoutes';

const routes = [
  {
    path: '/demo', name: 'Demo',
    component: () => import('@/views/Demo'),
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('@/views/404Page.vue')
  },
  mainRoutes,
  AuthRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

let registeredModules = {
  product: productsModule,
};

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

    // Manage products module for /product and its children
    if (to.path.startsWith('/product')) {
      // store.registerModule('products', registeredModules['products']);
      // manageVuexModule(store, registeredModules, 'product', true);
    } 
    // else {
    //   store.unregisterModule('products');
    //   manageVuexModule(store, registeredModules, 'product', false);
    // }

    next();
  }
});

export default router
