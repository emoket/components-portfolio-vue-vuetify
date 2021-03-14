import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== "production",
  state: {
    token: null
  },
  getters: {
    getToken: state => state.token
  },
  mutations: {
    login(state, payload) {
      state.token = payload;
    },
    logout(state) {
      if (state.token) {
        state.token = null;
        console.log(`logout!!`);
      }
    }
  },
  actions: {},
  modules: {}
});
