'use strict';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { blankEntryData } from '@/config/Settings';

export default {
  namespaced: true,
  state: {
    entryData: blankEntryData(),
    prevEntries: [],
    errors: [],
    localErrors: []
  },
  getters,
  actions,
  mutations
};
