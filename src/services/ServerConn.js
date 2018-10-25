'use strict';

import axios from 'axios';

let baseURL = '';
if (process.env.NODE_ENV === 'production') baseURL = 'REDACTED';
else baseURL = 'REDACTED';

const ratingConn = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true
});

export function getQuotes (routeObj) {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('STDQuotes/genQuote', { routeData: routeObj })
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

export function getCustomers () {
  return new Promise((resolve, reject) => {
    ratingConn
      .get('STDMaintenance/getCustomers')
      .then(response => resolve(response.data))
      .catch(reject);
  });
}

export function getPrecs () {
  return new Promise((resolve, reject) => {
    ratingConn
      .get('STDMaintenance/getPrecs')
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function getCarriers () {
  return new Promise((resolve, reject) => {
    ratingConn
      .get('STDMaintenance/getCarriers')
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function searchMaintenance (searchObj) {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('STDMaintenance/search', { searchObj })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function sendLaneEdit (laneData) {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('STDMaintenance/editSubmit', { laneData })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function sendLaneDelete (recordNum) {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('STDMaintenance/deleteSubmit', { recordNum })
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
}

export function sendLaneEntry (entryData) {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('STDBuilder/submitEntryData', { entryData })
      .then(response => resolve(response.data))
      .catch(err => reject(err));
  });
}

export function authUser (authData) {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('Auth/login', authData)
      .then(response => {
        console.log(response);
        resolve(response.data);
      })
      .catch(err => reject(err));
  });
}

export function logoutUser () {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('Auth/logout')
      .then(response => {
        resolve();
      })
      .catch(err => reject(err));
  });
}

export function sendErrorReport (report) {
  return new Promise((resolve, reject) => {
    ratingConn
      .post('report', { report })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => reject(err));
  });
}
