'use strict';
import AutoNumeric from 'autonumeric';
import moment from 'moment';
import EntryData from '@/models/BuilderEntry';
import { logoutUser } from '@/services/ServerConn';

const defaultMaintenanceColumns = ['code', 'mode', 'laneType', 'origin', 'destination', 'minimumCharge', 'charge', 'note'];

export const maintenanceColArray = ['code', 'mode', 'laneType', 'origin', 'destination', 'minimumCharge', 'fuel', 'charge', 'note', 'dateRange', 'mileageRange'];

export const defaultUserSettings = {
  maintenance: {
    columns: defaultMaintenanceColumns,
    prePopTable: false
  },
  builder: {
    code: null,
    laneType: 10
  }
};

export const modes = [
  { value: 'AIR', text: 'AIR' },
  { value: 'BLK', text: 'BLK' },
  { value: 'CTR', text: 'CTR' },
  { value: 'FBD', text: 'FBD' },
  { value: 'HCR', text: 'HCR' },
  { value: 'HTK', text: 'HTK' },
  { value: 'IMO', text: 'IMO' },
  { value: 'LTL', text: 'LTL' },
  { value: 'ODM', text: 'ODM' },
  { value: 'RCT', text: 'RCT' },
  { value: 'REF', text: 'REF' },
  { value: 'RTP', text: 'RTP' },
  { value: 'SDK', text: 'SDK' },
  { value: 'TLD', text: 'TLD' },
  { value: 'TTK', text: 'TTK' },
  { value: 'XPD', text: 'XPD' },
  { value: 'STR', text: 'STR' },
  { value: 'CUR', text: 'CUR' },
  { value: 'SWG', text: 'SWG' },
  { value: 'LTR', text: 'LTR' },
  { value: 'FLR', text: 'FLR' },
  { value: 'CUS', text: 'CUS' }
];

export const countries = [
  { value: 'US', text: 'USA' },
  { value: 'MX', text: 'Mexico' },
  { value: 'CA', text: 'Canada' }
];

export const defaultNumericOptions = AutoNumeric.getPredefinedOptions().NorthAmerican;

export const maintenanceTableColumns = new Map([
  [ 'ops', { field: 'ops', title: 'Actions', width: 100, titleAlign: 'center', columnAlign: 'center', componentName: 'column-maintenance-ops', titleCellClassName: 'bg-primary font-weight-bold', isResize: false } ],
  [ 'code', { field: 'code', title: 'Code', width: 60, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: false } ],
  [ 'mode', { field: 'mode', title: 'Mode', width: 50, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: false } ],
  [ 'laneType', { field: 'laneType', title: 'Type', width: 90, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'origin', { field: 'origin', title: 'Origin Point', width: 200, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'destination', { field: 'destination', title: 'Destination Point', width: 200, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'minimumCharge', { field: 'minimumCharge', title: 'Min Charge', width: 50, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'fuel', { field: 'fuel', title: 'Fuel Info', width: 50, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'charge', { field: 'charge', title: 'Lane Charge', width: 110, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'note', { field: 'note', title: 'Comments', width: 105, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'dateRange', { field: 'dateRange', title: 'Date Range', width: 120, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ],
  [ 'mileageRange', { field: 'mileageRange', title: 'Mile Range', width: 80, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true } ]
]);

export const userActions = [
  {
    name: 'settings',
    display: 'User Settings',
    func: (self) => {
      return new Promise((resolve, reject) => {
        // self.$alertify.alert('UNDER CONSTRUCTION', '<p>This will allow you to change various things about your interface here, including but not limited to what columns are displayed for queries or the Maintenance interface.</p>');
        self.$store.state.global.showUserSettings = true;
        resolve();
      });
    }
  },
  {
    name: 'sendReport',
    display: 'Send Report',
    func: (self) => {
      return new Promise((resolve, reject) => {
        const errors = Object.assign({},
          {
            global: self.$store.state.global.errors,
            maintenance: self.$store.state.Maintenance.errors,
            maintenanceLocal: self.$store.state.Maintenance.localErrors,
            maintenanceLTL: self.$store.state.MaintenanceLTL.errors,
            maintenanceLTLLocal: self.$store.state.MaintenanceLTL.localErrors,
            builder: self.$store.state.Builder.errors,
            builderLocal: self.$store.state.Builder.localErrors,
            quote: self.$store.state.QuoteGen.errors,
            quoteLocal: self.$store.state.QuoteGen.localErrors
          });
        self.$store.dispatch('submitErrors', errors)
          .then(response => {
            if (response) self.$alertify.success('<p>Report Submitted Successfully</p>');
            resolve();
          });
      });
    }
  },
  {
    name: 'logout',
    display: 'Logout',
    func: (self) => {
      return new Promise((resolve, reject) => {
        logoutUser()
          .then(() => {
            self.$store.commit('user', {});
            self.$router.push('/');
            resolve();
          }).catch(err => reject(err));
      });
    }
  }
];

export const navPointsRestricted = [
  { to: '/query', display: 'Quote Generator', popText: 'Lists, in order by base cost, all carriers and contracted customers applicable to the selected route', popTitle: 'Rate Quote Generator' },
  { to: '/maintenance', display: 'Maintenance', popText: 'View/Edit Carrier/Customer lane entries. (includes all lanes except LTL)', popTitle: 'Standard Maintenance' },
  { to: '/maintenanceLTL', display: 'Maintenance LTL', popText: 'View/Edit Carrier/Customer lane entries. (exclusively LTL)', popTitle: 'LTL Maintenance' }
];

export const navPoints = [
  { to: '/query', display: 'Quote Generator', popText: 'Lists, in order by base cost, all carriers and contracted customers applicable to the selected route', popTitle: 'Rate Quote Generator' },
  { to: '/maintenance', display: 'Maintenance', popText: 'View/Edit Carrier/Customer lane entries. (includes all lanes except LTL)', popTitle: 'Standard Maintenance' },
  { to: '/maintenanceLTL', display: 'Maintenance LTL', popText: 'View/Edit Carrier/Customer lane entries. (exclusively LTL)', popTitle: 'LTL Maintenance' },
  { to: '/builder', display: 'Builder', popText: `Generate new 'standard' lane entries`, popTitle: 'Lane Builder' },
  { to: '/builderLTL', display: 'Builder LTL', popText: `Generate new LTL lane entries`, popTitle: 'Lane Builder LTL' }
];

export function blankRoute () {
  return {
    originData: {
      city: {
        state: null,
        value: ''
      },
      state: {
        state: null,
        value: ''
      },
      zipCode: {
        state: null,
        value: ''
      },
      country: {
        value: 'US'
      }
    },
    destinationData: {
      city: {
        state: null,
        value: ''
      },
      state: {
        state: null,
        value: ''
      },
      zipCode: {
        state: null,
        value: ''
      },
      country: {
        value: 'US'
      }
    },
    optionsData: {
      effectiveDate: moment().format('YYYY-MM-DD'),
      mode: 'TLD',
      stopOffs: 0,
      miles: {
        HHG: 0,
        PRACT: 0
      }
    }
  };
}

export function blankSearch () {
  return {
    originData: {
      city: {
        value: ''
      },
      state: {
        value: ''
      },
      zipCode: {
        value: ''
      },
      country: {
        value: 'US'
      }
    },
    destinationData: {
      city: {
        value: ''
      },
      state: {
        value: ''
      },
      zipCode: {
        value: ''
      },
      country: {
        value: 'US'
      }
    },
    optionsData: {
      effectiveDate: moment().format('YYYY-MM-DD'),
      mode: 'TLD',
      code: '',
      type: 0,
      miles: 0
    }
  };
}

export function blankEntryData () {
  const entries = new Array();
  for (let index = 0; index < 20; index++) {
    entries.push(new EntryData());
  }

  const mileageData = [];
  for (let index = 0; index < 20; index++) {
    mileageData.push({
      state: '',
      zip: {
        from: '',
        to: ''
      }
    });
  }

  return {
    settings: {
      code: '',
      mode: 'TLD',
      type: 10,
      originCountry: 'US',
      destinationCountry: 'US',
      effectiveFromDate: moment().format('YYYY-MM-DD'),
      effectiveToDate: moment().add(100, 'y').format('YYYY-MM-DD')
    },
    mileageData,
    entries
  };
}

export const alertifyConfig = {
  autoReset: true,
  basic: false,
  closable: true,
  closableByDimmer: true,
  frameless: false,
  maintainFocus: true, // <== global default not per instance, applies to all dialogs
  maximizable: true,
  modal: true,
  movable: true,
  moveBounded: false,
  overflow: true,
  padding: true,
  pinnable: true,
  pinned: true,
  preventBodyShift: false, // <== global default not per instance, applies to all dialogs
  resizable: true,
  startMaximized: false,
  transition: 'slide',

  // notifier defaults
  notifier: {
    // auto-dismiss wait time (in seconds)
    delay: 6,
    // default position
    position: 'bottom-center',
    // adds a close button to notifier messages
    closeButton: false
  },

  // language resources
  glossary: {
    // dialogs default title
    title: 'Rating System',
    // ok button text
    ok: 'OK',
    // cancel button text
    cancel: 'Cancel'
  },

  // theme settings
  theme: {
    // class name attached to prompt dialog input textbox.
    input: 'input form-control',
    // class name attached to ok button
    ok: 'btn btn-info',
    // class name attached to cancel button
    cancel: 'btn btn-warning'
  }
};

export function promWhen (condition, timeout) {
  return new Promise((resolve, reject) => {
    if (!timeout) timeout = 20000;

    setTimeout(() => reject(new Error(`Timeout elapsed while waiting for ${condition.toString()}`)), timeout);

    function loop () {
      if (condition()) resolve();
      else setTimeout(loop, 0);
    }
    setTimeout(loop, 0);
  });
}

export function getDisplayList (laneType) {
  switch (laneType) {
    case 5:
      return {
        orgCity: false,
        orgState: false,
        orgZip: true,
        desCity: false,
        desState: false,
        desZip: true,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 10:
      return {
        orgCity: true,
        orgState: true,
        orgZip: false,
        desCity: true,
        desState: true,
        desZip: false,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 15:
      return {
        orgCity: false,
        orgState: false,
        orgZip: true,
        desCity: false,
        desState: false,
        desZip: true,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 20:
      return {
        orgCity: false,
        orgState: false,
        orgZip: true,
        desCity: false,
        desState: false,
        desZip: true,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 25:
      return {
        orgCity: false,
        orgState: false,
        orgZip: true,
        desCity: true,
        desState: true,
        desZip: false,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 30 :
      return {
        orgCity: true,
        orgState: true,
        orgZip: false,
        desCity: false,
        desState: false,
        desZip: true,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 31:
      return {
        orgCity: false,
        orgState: true,
        orgZip: true,
        desCity: false,
        desState: true,
        desZip: true,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 33:
      return {
        orgCity: true,
        orgState: true,
        orgZip: false,
        desCity: false,
        desState: true,
        desZip: false,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 35 :
      return {
        orgCity: false,
        orgState: true,
        orgZip: false,
        desCity: false,
        desState: false,
        desZip: true,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 37:
      return {
        orgCity: false,
        orgState: true,
        orgZip: false,
        desCity: true,
        desState: true,
        desZip: false,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 40:
      return {
        orgCity: false,
        orgState: true,
        orgZip: false,
        desCity: false,
        desState: false,
        desZip: true,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 45:
      return {
        orgCity: false,
        orgState: false,
        orgZip: true,
        desCity: false,
        desState: true,
        desZip: false,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 50:
      return {
        orgCity: false,
        orgState: true,
        orgZip: false,
        desCity: false,
        desState: true,
        desZip: false,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: false,
        note: true
      };

    case 90:
      return {
        orgCity: false,
        orgState: false,
        orgZip: false,
        desCity: false,
        desState: false,
        desZip: false,
        flat: true,
        rpm: true,
        minCharge: true,
        miles: true,
        note: true
      };

    default:
      return {
        error: true
      };
  }
}
