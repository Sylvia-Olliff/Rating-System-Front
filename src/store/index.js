import Vue from 'vue';
import Vuex from 'vuex';
import QuoteGen from './QuoteGen';
import Maintenance from './Maintenance';
import Builder from './Builder';
import { mutations } from './mutations';
import { actions } from './actions';

Vue.use(Vuex);

const MaintenanceLTL = {
  namespaced: true,
  state: {
    currentSearch: '',
    searchResults: [],
    errors: [],
    localErrors: []
  }
};

const store = new Vuex.Store({
  state: {
    global: {
      customers: [],
      carriers: [],
      precs: new Map(),
      errors: [],
      noticeQueue: [],
      showUserSettings: false
    },
    user: {}
  },
  modules: {
    QuoteGen,
    Maintenance,
    MaintenanceLTL,
    Builder
  },
  mutations,
  actions
});

export default store;
