'use strict';
import { searchLanes, submitEdit, submitDelete } from '@/services/MaintenanceProcessor';

export default {
  populateTable ({ commit }) {
    return new Promise((resolve) => {
      searchLanes({})
        .then(lanes => {
          commit('searchResults', lanes);
          resolve();
        })
        .catch(err => {
          commit('error', err);
          resolve();
        });
    });
  },
  search ({ commit }, searchData) {
    return new Promise((resolve) => {
      commit('recordSearch', searchData);
      searchLanes(searchData)
        .then(lanes => {
          if (lanes.error) {
            commit('error', lanes.error);
            resolve(false);
          } else {
            commit('recordResults', lanes);
            commit('searchResults', lanes);
            resolve(true);
          }
        })
        .catch(err => {
          commit('error', err);
          resolve(false);
        });
    });
  },
  clear ({ commit }) {
    return new Promise((resolve, reject) => {
      commit('clearSearch');
      commit('clearResults');
      resolve();
    });
  },
  confirmEdit ({ commit }, laneData) {
    return new Promise((resolve, reject) => {
      commit('recordEdits', laneData);
      submitEdit(laneData)
        .then(confirmation => {
          if (confirmation) {
            resolve(true);
          } else {
            commit('error', new Error('Failed to process edit...'));
            resolve(false);
          }
        })
        .catch(err => {
          commit('error', err);
          resolve(false);
        });
    });
  },
  confirmDelete ({ commit }, laneData) {
    return new Promise((resolve, reject) => {
      commit('recordDeletes', laneData);
      submitDelete(laneData.recordNum)
        .then(confirmation => {
          if (confirmation) {
            resolve(true);
          } else {
            commit('error', new Error('Failed to process delete...'));
            resolve(false);
          }
        })
        .catch(err => {
          commit('error', err);
          resolve(false);
        });
    });
  }
};
