import { createApp } from 'vue'

import vuetify from '@/plugins/vuetify'; // Vue-Router

import router from './router'; // Vue-Router
import store from "./store"; // Vuex
import * as filter from './filter'; // Filter

import App from './App.vue'

import {VDataTable} from 'vuetify/labs/VDataTable';

// Create Vue Instance
const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);

//register component globally
app.component('v-data-table', VDataTable);

// Global Var 
app.config.globalProperties.$store = store;
app.config.globalProperties.$filters = filter;

app.mount('#app');
