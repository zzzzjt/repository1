import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import mutations from './mutations';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

const state = {};

const getters = {};

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});

export default store;
