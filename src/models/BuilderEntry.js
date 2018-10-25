'use strict';

export default function (initData) {
  if (!initData) {
    this.originData = {
      city: '',
      state: '',
      zip: {
        from: '',
        to: ''
      },
      country: 'US'
    };

    this.destinationData = {
      city: '',
      state: '',
      zip: {
        from: '',
        to: ''
      },
      country: 'US'
    };

    this.rateData = {
      ratePerMile: 0.0,
      flatRate: 0.0,
      minimumCharge: 0.0
    };

    this.optionsData = {
      fuelIncluded: 'N',
      miles: {
        from: 0,
        to: 0
      },
      note: ''
    };
  } else {
    this.originData = initData.originData;
    this.destinationData = initData.destinationData;
    this.rateData = initData.rateData;
    this.optionsData = initData.optionsData;
  }
}
