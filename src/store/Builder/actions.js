'use strict';
import { blankEntryData } from '@/config/Settings';
import { processEntry } from '@/services/BuilderEntryProcessor';

export default {
  clearLanes ({ commit }) {
    return new Promise((resolve) => {
      commit('setLanes', blankEntryData());
      resolve();
    });
  },
  submitLanes ({ commit }, entryData) {
    return new Promise((resolve, reject) => {
      processEntry(entryData)
        .then(resolve)
        .catch(reject);
    });
  }
};
