'use strict';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { blankSearch } from '@/config/Settings';

export default {
  namespaced: true,
  state: {
    currentSearch: blankSearch(),
    prevSearches: [],
    searchResults: [],
    prevResults: [],
    prevEdits: [],
    prevDeletes: [],
    errors: [],
    localErrors: []
  },
  getters,
  actions,
  mutations
};
