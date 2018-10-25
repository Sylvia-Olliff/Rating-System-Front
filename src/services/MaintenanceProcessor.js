'use strict';

import { searchMaintenance, sendLaneEdit, sendLaneDelete } from './ServerConn';
import moment from 'moment';

export function searchLanes (searchData) {
  return new Promise((resolve, reject) => {
    if (!searchData) searchData = {};
    else {
      if (!searchData.optionsData.effectiveDate || searchData.optionsData.effectiveDate === 'Invalid date') {
        searchData.optionsData.effectiveDate = moment().format('YYYYMMDD');
      } else {
        searchData.optionsData.effectiveDate = moment(searchData.optionsData.effectiveDate).format('YYYYMMDD');
      }
    }
    const searchObj = {
      criteria: searchData,
      options: { limit: 50 }
    };
    searchMaintenance(searchObj)
      .then(lanes => {
        if (lanes.error) resolve(lanes);
        lanes.map(lane => {
          if (lane.isCustomer) lane.classes = 'bg-info text-light';
          else lane.classes = 'bg-light';
          lane.effectiveFromDate = moment(lane.effectiveFromDate).format('YYYY-MM-DD');
          lane.effectiveToDate = moment(lane.effectiveToDate).format('YYYY-MM-DD');
          if (!lane.flatRate) lane.flatRate = 0.0;
          if (!lane.ratePerMile) lane.ratePerMile = 0.0;
          if (!lane.minimumCharge) lane.minimumCharge = 0.0;
          return lane;
        });
        resolve(lanes);
      })
      .catch(err => reject(err));
  });
}

export function submitEdit (laneData) {
  laneData.effectiveFromDate = moment(laneData.effectiveFromDate).format('YYYYMMDD');
  laneData.effectiveToDate = moment(laneData.effectiveToDate).format('YYYYMMDD');
  laneData.flatRate = (typeof laneData.flatRate === 'string') ? laneData.flatRate.replace(/([$,])/g, '') : laneData.flatRate;
  laneData.ratePerMile = (typeof laneData.ratePerMile === 'string') ? laneData.ratePerMile.replace(/([$,])/g, '') : laneData.ratePerMile;
  laneData.minimumCharge = (typeof laneData.minimumCharge === 'string') ? laneData.minimumCharge.replace(/([$,])/g, '') : laneData.minimumCharge;
  return new Promise((resolve, reject) => {
    sendLaneEdit(laneData)
      .then(confirmation => resolve(confirmation))
      .catch(err => reject(err));
  });
}

export function submitDelete (recordNum) {
  return new Promise((resolve, reject) => {
    sendLaneDelete(recordNum)
      .then(confirmation => resolve(confirmation))
      .catch(err => reject(err));
  });
}
