/* globals localStorage */
'use strict';

import moment from 'moment';
import { authUser } from '../services/ServerConn';
import { navPoints, navPointsRestricted, defaultUserSettings } from '../config/Settings';

const getAuthLocations = (user) => {
  if (user.authority === 'ALL' && user.isLoggedIn) {
    return navPoints.reduce((accum, currVal) => {
      return accum.concat(currVal.to);
    }, ['/', '/home']);
  } else if (user.isLoggedIn) {
    return navPointsRestricted.reduce((accum, currVal) => {
      return accum.concat(currVal.to);
    }, ['/', '/home']);
  } else {
    return ['/login'];
  }
};

const getPoints = (user) => {
  if (user.authority === 'ALL' && user.isLoggedIn) {
    return navPoints;
  } else if (user.isLoggedIn) {
    return navPointsRestricted;
  } else {
    return null;
  }
};

export class User {
  constructor () {
    this.username = '';
    this.settings = {};

    this.authority = '';
    this.loginTime = '';
    this.isLoggedIn = false;
    this.sessionID = '';

    this.authLocations = getAuthLocations(this);
    this.points = getPoints(this);
  }

  login (authData) {
    return new Promise((resolve, reject) => {
      authUser(authData)
        .then(response => {
          console.log(response);
          if (response.username) {
            this.authority = response.auth;
            this.isLoggedIn = true;
            this.loginTime = moment();
            this.username = response.username;
            this.sessionID = response.passport.user._id;
            this.authLocations = getAuthLocations(this);
            this.points = getPoints(this);
            if (localStorage.getItem(`${this.username}-settings`)) {
              this.settings = JSON.parse(localStorage.getItem(`${this.username}-settings`));
            } else {
              localStorage.setItem(`${this.username}-settings`, JSON.stringify(defaultUserSettings));
              this.settings = defaultUserSettings;
            }
            localStorage.setItem(`${this.username}-data`, JSON.stringify(this));
            resolve(true);
          } else {
            const error = new Error(response.error.message);
            error.code = response.error.code;
            reject(error);
          }
        })
        .catch(err => reject(err));
    });
  }

  getMaintenanceColumns () {
    return this.settings.maintenance.columns;
  }
}
