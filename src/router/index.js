// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes as mainRoutes } from './mainRoute';
import store from '@/store';
import { manageVuexModule } from '@/store/managerVuextModule';
import productsModule from '@/views/Product/productModule';
import { AuthRoutes } from './authRoutes';
import claimModule from '@/views/WarrantyClaim/warrantyClaimModule';
import { kebabToCamel } from '@/filter';

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
  warrantyClaim: claimModule,
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
    console.log(to.name,'to.name');
    console.log(from.name,'from.name');
    let toRouteKebabCase = kebabToCamel(to.name);

    if(registeredModules[toRouteKebabCase]){  
      store.registerModule(toRouteKebabCase, registeredModules[toRouteKebabCase]);
    }

    let fromRouteKebabCase = kebabToCamel(from.name);
    if(from.name != '' && registeredModules[fromRouteKebabCase]){
      store.unregisterModule(fromRouteKebabCase);
    }

    next();
  }
});

export default router
