'use strict';

function setDefaults (obj) {
  obj.orgCity = '';
  obj.orgState = '';
  obj.orgZip = '';
  obj.orgCountry = '';
  obj.desCity = '';
  obj.desState = '';
  obj.desZip = '';
  obj.desCountry = '';
  obj.date = '';
  obj.mode = '';
  obj.stopOffs = 0;
  obj.HHG = 0;
  obj.PRACT = 0;
  obj.type = function () {
    let typeCode = '';
    if (this.orgCity) typeCode += 'C';
    if (this.orgState) typeCode += 'S';
    if (this.orgZip) typeCode += 'Z';
    typeCode += '-';
    if (this.desCity) typeCode += 'C';
    if (this.desCity) typeCode += 'S';
    if (this.desCity) typeCode += 'Z';
    return typeCode;
  };
}

export default function (initData) {
  if (!initData) {
    setDefaults(this);
  } else {
    this.orgCity = initData.originData.city.value;
    this.orgState = initData.originData.state.value;
    this.orgZip = initData.originData.zipCode.value;
    this.orgCountry = initData.originData.country.value;
    this.desCity = initData.destinationData.city.value;
    this.desState = initData.destinationData.state.value;
    this.desZip = initData.destinationData.zipCode.value;
    this.desCountry = initData.destinationData.country.value;
    this.date = initData.optionsData.effectiveDate;
    this.mode = initData.optionsData.mode;
    this.stopOffs = initData.optionsData.stopOffs;
    this.HHG = initData.optionsData.miles.HHG;
    this.PRACT = initData.optionsData.miles.PRACT;
    this.type = function () {
      let typeCode = '';
      if (this.originCity) typeCode += 'C';
      if (this.originState) typeCode += 'S';
      if (this.originZip) typeCode += 'Z';
      typeCode += '-';
      if (this.destinationCity) typeCode += 'C';
      if (this.destinationCity) typeCode += 'S';
      if (this.destinationCity) typeCode += 'Z';
      return typeCode;
    };
  }
}
