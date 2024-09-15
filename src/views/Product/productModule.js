import { PRODUCTS_KEY } from "@/const/storageKey";

const productsModule = {
    namespaced: true,
    state: {
      products: [],
    },
    mutations: {
      ADD_PRODUCT(state, product) {
        state.products.push(product);
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(state.products));

        state.products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
      },
      SET_PRODUCTS(state, products) {
        state.products = products;
      },
    },
    actions: {
      addProduct({ commit }, product) {
        commit('ADD_PRODUCT', product);
      },
      fetchProducts({ commit }) {
        // In a real app, fetch from an API or local storage
        const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
        commit('SET_PRODUCTS', products);
      },
    },
    getters: {
      allProducts: (state) => state.products,
    },
  };
  
  export default productsModule;