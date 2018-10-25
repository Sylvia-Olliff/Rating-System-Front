'use strict';
import { User } from '../models/User';
import { sendErrorReport } from '../services/ServerConn';

// loadApp ({ commit }, value) {
//   return new Promise(resolve => {
//     commit('customers', value.customers);
//     commit('precs', value.precs);
//     resolve();
//   });
// },

export const actions = {
  login ({ commit }, value) {
    return new Promise(resolve => {
      const user = new User();
      user
        .login(value)
        .then(response => {
          if (response) commit('user', user);
          else commit('error', response);
          resolve();
        })
        .catch(err => {
          commit('error', err);
          resolve();
        });
    });
  },
  userVerified ({ commit }, value) {
    return new Promise(resolve => {
      const user = new User();
      user.authority = value.authority;
      user.isLoggedIn = value.isLoggedIn;
      user.loginTime = value.loginTime;
      user.username = value.username;
      user.sessionID = value.sessionID;
      user.authLocations = value.authLocations;
      user.points = value.points;
      user.settings = value.settings;
      commit('user', user);
      resolve();
    });
  },
  submitErrors ({ commit }, value) {
    return new Promise(resolve => {
      sendErrorReport(value)
        .then(response => {
          if (response.success) resolve(true);
          else resolve(false);
        })
        .catch(err => {
          commit('error', err);
          resolve(false);
        });
    });
  }
};
