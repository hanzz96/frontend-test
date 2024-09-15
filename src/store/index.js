import { createStore } from "vuex";
import { menuAccess } from "./menuAccess";


export default createStore({
  state: {
    project : 'Vue3 + Vuetify',
    desc : 'Starter Template',
    role: 'STAFF',
    theme: 'dark',
    user: JSON.parse(localStorage.getItem('user')) || JSON.parse(sessionStorage.getItem('user')) || null,
    /**
     * assume menu access are data provided by backend
     */
    menuAccess : menuAccess
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
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});
 