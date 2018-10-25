'use strict';

export default {
  setLanes (state, value) {
    state.entryData = value;
  },
  recordEntries (state, value) {
    if (state.prevEntries.length > 50) state.prevEntries.shift();
    state.prevEntries.push(value);
  },
  error (state, value) {
    if (value) {
      if (state.errors.length === 10) state.errors.shift();
      state.errors.push(value);
    }
  },
  localError (state, value) {
    if (value) {
      if (state.localErrors.length === 20) state.localErrors.shift();
      state.localErrors.push(value);
    }
  }
};
