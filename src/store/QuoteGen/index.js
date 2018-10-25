'use strict';

import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { blankRoute } from '@/config/Settings';

export default {
  namespaced: true,
  state: {
    currentRoute: blankRoute(),
    resendRoute: false,
    response: {
      hasList: false,
      lists: {
        orgList: [],
        desList: []
      },
      quotes: []
    },
    last10Routes: [],
    last10Responses: [],
    errors: [],
    localErrors: []
  },
  getters,
  mutations,
  actions
};
