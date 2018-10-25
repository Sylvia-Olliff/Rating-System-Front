'use strict';
import { blankRoute } from '@/config/Settings';
import moment from 'moment';

export default {
  currentRoute (state, value) {
    if (value && typeof value === 'object') {
      state.currentRoute = undefined;
      state.currentRoute = Object.assign({}, value);
    }
  },
  clearRoute (state) {
    state.currentRoute = blankRoute();
  },
  resetResendRouteFlag (state) {
    state.resendRoute = false;
  },
  setResendRouteFlag (state) {
    state.resendRoute = true;
  },
  response (state, value) {
    state.response.quotes = value;
  },
  originList (state, value) {
    state.response.hasList = true;
    state.response.lists.orgList = value;
  },
  resetOriginList (state) {
    state.response.hasList = false;
    state.response.lists.orgList = [];
  },
  destinationList (state, value) {
    state.response.hasList = true;
    state.response.lists.desList = value;
  },
  resetDestinationList (state) {
    state.response.hasList = false;
    state.response.lists.desList = [];
  },
  recordRoute (state, value) {
    if (state.last10Routes.length === 10) state.last10Routes.shift();
    state.last10Routes.push(value);
  },
  recordResponse (state, value) {
    if (state.last10Responses.length === 10) state.last10Responses.shift();
    state.last10Responses.push(value);
  },
  error (state, value) {
    if (value) {
      if (state.errors.length === 10) state.errors.shift();
      value.timeStamp = moment().format();
      state.errors.push(value);
    }
  },
  localError (state, value) {
    if (value) {
      if (state.localErrors.length === 20) state.localErrors.shift();
      value.timeStamp = moment().format();
      state.localErrors.push(value);
    }
  }
};
