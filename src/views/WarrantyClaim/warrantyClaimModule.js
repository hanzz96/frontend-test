import { WARRANTY_CLAIMS_KEY } from "@/const/storageKey";

const claimModule = {
  namespaced: true,
  state: {
    claims: [],
    approvalClaim: {
      _id: '',
      status: ''
    },
    viewedClaim: {}
  },
  mutations: {
    RESET_VIEWED_CLAIM(state) {
      state.viewedClaim = {};
    },
    RESET_CREATE_PRODUCT(state) {
      state.approvalClaim = {
        _id: '',
        status: ''
      };
    },
    SET_CLAIMS(state, payload) {
      state.claims = payload;
    },
    ACTION_CLAIM(state, payload) {
      state.claims[payload.index].status = payload.status;
      state.claims[payload.index].approvedAt = payload.approvedAt;
      state.claims[payload.index].approvedBy = payload.approvedBy;
      localStorage.setItem(WARRANTY_CLAIMS_KEY, JSON.stringify(state.claims));
    }
  },
  actions: {
    actionApprovalClaim({ commit, getters }, payload) {
      try {
        console.log(payload, 'payload');
        const findIndex = getters.allClaims.findIndex(claim => claim._id === payload.clickedData._id);
        if (findIndex === -1) {
          throw new Error('Claim not found');
        }

        if(getters.allClaims[findIndex].status !== 'pending') {
          throw new Error(`Claim already ${getters.allClaims[findIndex].status}`);
        }

        let finalPayload = {
          _id: payload._id,
          status: payload.status,
          approvedAt: new Date().toISOString(),
          approvedBy: payload.approvedBy,
          index: findIndex
        }

        commit('ACTION_CLAIM', finalPayload);
      } catch (error) {
        throw error;
      }
    },
    fetchClaims({ commit }) {
      // In a real app, fetch from an API or local storage
      const claims = JSON.parse(localStorage.getItem(WARRANTY_CLAIMS_KEY)) || [];
      commit('SET_CLAIMS', claims);
    },
    resetActionClaim({ commit }) {
      commit('RESET_CREATE_PRODUCT');
    },
  },
  getters: {
    allClaims(state) { return state.claims },
  },
};

export default claimModule;