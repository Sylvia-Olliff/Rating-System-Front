/* globals localStorage */
'use strict';

export const mutations = {
  error (state, value) {
    if (value) {
      if (state.global.errors.length === 10) state.global.errors.shift();
      state.global.errors.push(value);
    }
  },
  notice (state, value) {
    if (state.global.noticeQueue.length > 50) state.global.noticeQueue.shift();
    state.global.noticeQueue.push(value);
  },
  customers (state, value) {
    state.global.customers = value;
  },
  precs (state, value) {
    state.global.precs = value;
  },
  user (state, value) {
    state.user = value;
  },
  settings (state, value) {
    try {
      localStorage.removeItem(`${state.user.username}-settings`);
      localStorage.setItem(`${state.user.username}-settings`, JSON.stringify(value));
      state.user.settings = value;
    } catch (err) {
      localStorage.removeItem(`${state.user.username}-settings`);
    }
  }
};
