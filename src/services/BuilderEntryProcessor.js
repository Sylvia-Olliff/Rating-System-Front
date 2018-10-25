'use strict';
import moment from 'moment';
import { sendLaneEntry } from './ServerConn';

function clean (entryData) {
  return new Promise((resolve, reject) => {
    try {
      const readyEntries = [];
      entryData.entries.forEach(entry => {
        if ((!(entry.rateData.ratePerMile === 0 && entry.rateData.flatRate === 0 && entry.rateData.minimumCharge === 0))) {
          const readyEntry = {};
          readyEntry.originData = entry.originData;
          readyEntry.destinationData = entry.destinationData;
          readyEntry.optionsData = entry.optionsData;
          readyEntry.rateData = {};
          readyEntry.rateData.ratePerMile = entry.rateData.ratePerMile.replace(/([^0-9.])/g, '');
          readyEntry.rateData.flatRate = entry.rateData.flatRate.replace(/([^0-9.])/g, '');
          readyEntry.rateData.minimumCharge = entry.rateData.minimumCharge.replace(/([^0-9.])/g, '');
          readyEntries.push(readyEntry);
        }
        // entry.optionsData.fuelIncluded = (entry.optionsData.fuelIncluded) ? 'Y' : 'N';
      });
      if (entryData.settings.type === 90) {
        if (entryData.mileageData[0].state.trim() !== '') {
          let prevState = '';
          entryData.mileageData.map(data => {
            if (prevState !== '') {
              if (data.state.trim() === '' && data.zip.from !== '') {
                data.state = prevState;
                return data;
              } else if (data.zip.from !== '') {
                prevState = data.state;
                return data;
              }
            } else {
              prevState = data.state;
              return data;
            }
          });
          entryData.mileageData = entryData.mileageData.filter(data => (data.state !== ''));
        } else {
          reject(new Error('First State for Mileage-based Contract must not be empty.'));
        }
      }
      const settings = entryData.settings;
      const mileageData = entryData.mileageData;
      settings.effectiveFromDate = moment(entryData.settings.effectiveFromDate).format('YYYYMMDD');
      settings.effectiveToDate = moment(entryData.settings.effectiveToDate).format('YYYYMMDD');
      const sendData = Object.assign({}, { readyEntries, settings, mileageData });
      resolve(sendData);
    } catch (err) {
      reject(err);
    }
  });
}

export function processEntry (entryData) {
  return new Promise((resolve, reject) => {
    clean(entryData)
      .then(sendLaneEntry)
      .then(response => {
        if (response === 'OK' || response === 200) resolve({ success: true });
        else resolve({ success: false, error: new Error('Error submiting lane entries') });
      })
      .catch(err => reject(err));
  });
}
