import { createStore } from "vuex";
import { productStarter } from "@/_starter/productStarter";
import { PRODUCTS_KEY, WARRANTY_CLAIMS_KEY } from "@/const/storageKey";
import { warrantyClaimStarter } from "@/_starter/warrantyClaimStarter";

export default createStore({
  state: {
    project : 'Vue3 + Vuetify',
    desc : 'Starter Template',
    role: 'STAFF',
    theme: 'dark',
    user: JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user')) || null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      if (user.rememberMe) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        sessionStorage.setItem('user', JSON.stringify(user));  // Use session storage if not remembered
      }
    },
    LOGOUT(state) {
      state.user = null;
      localStorage.removeItem('user');
      sessionStorage.removeItem('user');
    },
    SET_PRODUCTS(state, products) {
      localStorage.removeItem(PRODUCTS_KEY);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    },
    SET_WARRANTY_CLAIMS(state, warrantyClaims) {
      localStorage.removeItem(WARRANTY_CLAIMS_KEY);
      localStorage.setItem(WARRANTY_CLAIMS_KEY, JSON.stringify(warrantyClaims));
    }
  },
  actions: {
    login({ commit }, credentials) {
      // Simulating login validation
      if (credentials.username === 'johan' && credentials.password === '123456') {
        commit('SET_USER', { username: credentials.username, rememberMe: credentials.rememberMe });
        return true;
      } else {
        return false;
      }
    },
    logout({ commit }) {
      commit('LOGOUT');
    },
    starterData({ commit }) {
      commit('SET_PRODUCTS', productStarter);
      commit('SET_WARRANTY_CLAIMS', warrantyClaimStarter);
    }
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
 