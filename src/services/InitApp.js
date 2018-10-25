/* globals localStorage */
'use strict';

import { getCustomers, getPrecs, getCarriers } from './ServerConn';
import moment from 'moment';
// import { getSuggestions } from '@/db/Suggestions';

function loadCustomers (initData) {
  return new Promise((resolve, reject) => {
    getCustomers()
      .then(customers => {
        initData.customers = customers;
        resolve(initData);
      })
      .catch(err => reject(err));
  });
}

// function loadSuggestions (initData) {
//   return new Promise((resolve, reject) => {
//     getSuggestions()
//       .then(cities => {
//         initData.cities = cities;
//         resolve(initData);
//       })
//       .catch(err => reject(err));
//   });
// }

function loadPrecs (initData) {
  return new Promise((resolve, reject) => {
    getPrecs()
      .then(precs => {
        const optionsList = new Map();
        for (let prec in precs) {
          optionsList.set(precs[prec], prec);
        }
        initData.precs = optionsList;
        resolve(initData);
      })
      .catch(err => reject(err));
  });
}

// function loadMaintenance (initData) {
//   return new Promise((resolve, reject) => {
//     searchLanes({})
//       .then(lanes => {
//         initData.lanes = lanes;
//         resolve(initData);
//       })
//       .catch(err => reject(err));
//   });
// }

function loadCarriers (initData) {
  return new Promise((resolve, reject) => {
    getCarriers()
      .then(carriers => {
        initData.carriers = carriers;
        resolve(initData);
      })
      .catch(err => reject(err));
  });
}

function checkUser (initData) {
  return new Promise(resolve => {
    for (let item in localStorage) {
      // console.log(`Iterating through localStorage`);
      if (localStorage.key(item).indexOf('-data') !== -1) {
        const userData = JSON.parse(localStorage.getItem(localStorage.key(item)));
        // console.log('Found a matching cookie!');
        // console.log(userData);
        // console.log(`Time since last login: ${moment().diff(moment(userData.loginTime), 'hours')} hours`);
        if (!(moment().diff(moment(userData.loginTime), 'days') >= 1)) {
          initData.userData = userData;
          break;
        }
      }
    }
    resolve(initData);
  });
}

export function init () {
  return new Promise((resolve, reject) => {
    const initData = {};
    loadCustomers(initData)
      // .then(loadSuggestions)
      .then(loadPrecs)
      .then(loadCarriers)
      .then(checkUser)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}
