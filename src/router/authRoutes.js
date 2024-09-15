export const AuthRoutes = {
    path: '/auth',
    // component: () => import('@/layouts/template/Main.vue'),
    meta: {
      requiresAuth: false
    },
    children: [
      {
        name: 'login',
        path: '/auth/login',
        component: () => import('@/views/Login/Base.vue')
      },
      // {
      //   name: 'Error 404',
      //   path: '/pages/error',
      //   component: () => import('@/views/pages/maintenance/error/Error404Page.vue')
      // }
    ]
  };