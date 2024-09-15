// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes as mainRoutes } from './mainRoute';
import store from '@/store';
import productsModule from '@/views/Product/productModule';
import { AuthRoutes } from './authRoutes';
import claimModule from '@/views/WarrantyClaim/warrantyClaimModule';
import { kebabToCamel } from '@/filter';

const routes = [
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
  warrantyClaim: claimModule,
};

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated || localStorage.getItem('user') || sessionStorage.getItem('user');

  // If trying to access a protected route without being logged in
  if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
    next({ name: 'login' });
  }
  // If already authenticated, redirect from login or "/" to dashboard
  else if (to.matched.some(record => record.meta.guest) && isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    let toRouteKebabCase = kebabToCamel(to.name);

    if(registeredModules[toRouteKebabCase]){  
      store.registerModule(toRouteKebabCase, registeredModules[toRouteKebabCase]);
    }

    next();
  }
});

router.afterEach((to, from) => {
  let fromRouteKebabCase = kebabToCamel(from.name);
    if(from.name != '' && registeredModules[fromRouteKebabCase]){
      store.unregisterModule(fromRouteKebabCase);
    }
});

export default router
