'use strict';
import Route from '@/models/Route';
import { sendRoute } from '@/services/QuoteProcessor';

export default {
  sendCurrentRoute ({ commit, state }) {
    return new Promise((resolve) => {
      const routeObj = new Route(state.currentRoute);
      commit('recordRoute', routeObj);
      sendRoute(routeObj)
        .then((quotes) => {
          if (quotes.lists) {
            if (quotes.lists.orgList) commit('originList', quotes.lists.orgList);
            if (quotes.lists.desList) commit('destinationList', quotes.lists.desList);
            resolve(false);
          } else {
            commit('response', quotes);
            resolve(true);
          }
        })
        .catch(error => {
          commit('error', error);
          resolve(false);
        });
    });
  }
};
