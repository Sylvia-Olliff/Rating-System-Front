'use strict';
import AutoNumeric from 'autonumeric';
import { defaultNumericOptions } from '@/config/Settings';

export default function (initData) {
  if (!initData) throw new Error('Must provide initial data for lane object creation');

  this.name = initData.name.trim();
  this.phone = initData.contactInfo.phone.trim();
  this.email = initData.contactInfo.email.trim();
  this.contactInfo = (initData.contactInfo.name[0] === '.') ? initData.contactInfo.name.substring(1).trim() : initData.contactInfo.name.trim();
  this.base = AutoNumeric.format(parseFloat(initData.base), defaultNumericOptions);
  this.fuelCharge = (initData.fuelCharge === 'INCLUDED') ? initData.fuelCharge : AutoNumeric.format(parseFloat(initData.fuelCharge), defaultNumericOptions);
  this.total = AutoNumeric.format(parseFloat(initData.total), defaultNumericOptions);
  this.miles = parseInt(initData.miles);
  this.rpm = (initData.ratePerMile === 'FLAT') ? initData.ratePerMile : AutoNumeric.format(parseFloat(initData.ratePerMile), defaultNumericOptions);
  this.comments = initData.note;
  this.isCust = initData.isCustomer;
  this.classes = initData.classes;
  this.variant = initData.variant;

  this.routeData = initData.routeObj;

  this.getContactTooltipBase = function () {
    return `${this.contactInfo}\n${this.phone}\n${this.email}`;
  };

  this.emailGreeting = function () {
    const thehours = new Date().getHours();
    let theGreeting = '';
    const morning = `Good morning,`;
    const afternoon = `Good afternoon,`;
    const evening = `Good evening,`;

    if (thehours >= 0 && thehours < 12) {
      theGreeting = morning;
    } else if (thehours >= 12 && thehours < 17) {
      theGreeting = afternoon;
    } else if (thehours >= 17 && thehours < 24) {
      theGreeting = evening;
    }
    return theGreeting;
  };

  this.setupEmail = function () {
    return `mailto:${this.email}?
            subject=Attn: ${this.contact}
            &body=${this.emailGreeting()}
                  %0D%0A
                  %0D%0A Are you available for this shipment?
                  %0D%0A
                  %0D%0A Origin: ${this.routeData.orgCity}, ${this.routeData.orgState}  ${this.routeData.orgZip}
                  %0D%0A Destination: ${this.routeData.desCity}, ${this.routeData.desState}  ${this.routeData.desZip}
                  %0D%0A
                  %0D%0A Base: %09 %09 %09 ${this.base}
                  %0D%0A Fuel Charge: %09 ${this.fuelCharge}
                  %0D%0A Total Charge: %09 ${this.total}
                  %0D%0A Miles: %09 %09${this.miles}
                  %0D%0A Rate per Mile: %09 ${this.rpm}
                  %0D%0A
                  %0D%0A Thanks,
                  %0D%0A`;
  };
}
