'use strict';
import { blankSearch } from '@/config/Settings';
import moment from 'moment';

export default {
  clearSearch (state) {
    state.currentSearch = blankSearch();
  },
  recordSearch (state, value) {
    if (state.prevSearches.length > 50) state.prevSearches.shift();
    value.timeStamp = moment().format();
    state.prevSearches.push(value);
  },
  searchResults (state, value) {
    state.searchResults = value;
  },
  recordResults (state, value) {
    if (state.prevResults.length > 50) state.prevResults.shift();
    value.timeStamp = moment().format();
    state.prevResults.push(value);
  },
  clearResults (state) {
    state.searchResults = [];
  },
  recordEdits (state, value) {
    if (state.prevEdits.length > 15) state.prevEdits.shift();
    state.prevEdits.push(value);
  },
  recordDeletes (state, value) {
    if (state.prevDeletes.length > 15) state.prevDeletes.shift();
    state.prevDeletes.push(value);
  },
  error (state, value) {
    if (state.errors.length > 30) state.errors.shift();
    value.timeStamp = moment().format();
    state.errors.push(value);
  },
  localError (state, value) {
    if (state.localErrors.length > 30) state.localErrors.shift();
    value.timeStamp = moment().format();
    state.localErrors.push(value);
  }
};
