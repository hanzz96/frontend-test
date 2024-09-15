import Home from '@/views/Home';

export const routes = [
    { path: '/', name: 'home', component: Home, meta: { requiresAuth: true } },
    { path: '/product', name: 'product', component: Home, meta: { requiresAuth: true } },
    { path: '/warranty-claims', name: 'warranty-claims', component: Home, meta: { requiresAuth: true } },
];