'use strict';
import { getQuotes } from '@/services/ServerConn';
import Quote from '@/models/Quote';
import moment from 'moment';

export function sendRoute (routeObj) {
  return new Promise((resolve, reject) => {
    if (!routeObj.date) routeObj.date = moment().format('YYYYMMDD');
    else routeObj.date = moment(routeObj.date).format('YYYYMMDD');
    console.log(routeObj);
    getQuotes(routeObj)
      .then(quotes => {
        if (quotes.desList || quotes.orgList) {
          const lists = {};
          if (quotes.desList) {
            lists.desList = [];
            quotes.desList.forEach(point => {
              point.point = 'destination';
              lists.desList.push(point);
            });
          }
          if (quotes.orgList) {
            lists.orgList = [];
            quotes.orgList.forEach(point => {
              point.point = 'origin';
              lists.orgList.push(point);
            });
          }
          console.log(lists);
          resolve({ lists });
        } else {
          let foundIt = false;
          const procQuotes = [];
          quotes.forEach(item => {
            if (item.isCustomer) {
              foundIt = true;
              item.classes = 'bg-info text-light';
              item.variant = 'info';
            } else if (!foundIt) {
              item.classes = 'bg-success text-light';
              item.variant = 'success';
            } else {
              item.classes = 'bg-danger text-light';
              item.variant = 'danger';
            }
            item.routeObj = routeObj;
            procQuotes.push(new Quote(item));
          });
          resolve(procQuotes);
        }
      })
      .catch(err => { reject(err); });
  });
}
