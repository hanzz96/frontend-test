import { PRODUCTS_KEY } from "@/const/storageKey";
import { v4 as uuidv4 } from 'uuid';

const productsModule = {
  namespaced: true,
  state: {
    products: [],
    modelProduct: {
      product: '',
      serialNumber: '',
      warrantyPeriodDays: ''
    },
  },
  mutations: {
    RESET_EDIT_PRODUCT(state) {
      state.modelProduct = {};
    },
    RESET_MODEL_PRODUCT(state) {
      state.modelProduct = {
        product: '',
        serialNumber: '',
        warrantyPeriodDays: ''
      };
    },
    ADD_PRODUCT(state, product) {
      state.products.unshift(product);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(state.products));

      state.products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
    },
    SET_MODEL_PRODUCT(state, product) {
      state.modelProduct = {...product};
    },
    UPDATE_PRODUCT(state, product) {
      const index = state.products.findIndex(p => p._id === product._id);
      if (index !== -1) {
        state.products[index] = product;
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(state.products));
        state.products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
      }
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    DELETE_PRODUCT(state, id) {
      state.products = state.products.filter(product => product._id !== id);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(state.products));
    },
  },
  actions: {
    editProduct({ commit }, product) {
      console.log(product, 'product');
      commit('UPDATE_PRODUCT', product );  
    },
    addProduct({ commit }, product) {
      let id = uuidv4();

      let finalProduct = {
        _id: id,
        product: product.product,
        serialNumber: product.serialNumber,
        warrantyPeriodDays: product.warrantyPeriodDays,
        createdAt: new Date().toISOString()
      }

      commit('ADD_PRODUCT', finalProduct);
      commit('RESET_MODEL_PRODUCT');
      // commit('ADD_PRODUCT', product);
    },
    updateProduct({ commit }, product) {
      commit('UPDATE_PRODUCT', product);
      commit('RESET_MODEL_PRODUCT');
    },
    deleteProduct({ commit }, id) {
      commit('DELETE_PRODUCT', id);
    },
    setModelProduct({ commit }, product) {
      commit('SET_MODEL_PRODUCT', product);
    },
    fetchProducts({ commit }) {
      // In a real app, fetch from an API or local storage
      const products = JSON.parse(localStorage.getItem(PRODUCTS_KEY)) || [];
      commit('SET_PRODUCTS', products);
    },
    resetModelProduct({ commit }) {
      commit('RESET_MODEL_PRODUCT');
    },
    resetEditProduct({ commit }) {
      commit('RESET_EDIT_PRODUCT');
    },
  },
  getters: {
    allProducts(state) { return state.products },
  },
};

export default productsModule;