/**
 * Entry point to Rating System Front Application
 * @alias Main
 * @module src/main
 */

import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'vue-easytable/libs/themes-base/index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import VueAlertify from 'vue-alertify';
import VueWait from 'vue-wait';
import Promise from 'bluebird';
global.Promise = Promise;
/* eslint-disable */
import App from './App.vue';
import router from './router';
import store from './store/';
import { alertifyConfig } from '@/config/Settings';
// import { init } from '@/db/Suggestions';

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueAlertify, alertifyConfig);
Vue.use(VueWait);

const wait = new VueWait({
  useVuex: true,
  vuexModuleName: 'loader',
  accessorName: '$wait'
});

// init();

new Vue({
  router,
  store,
  wait,
  render: h => h(App)
}).$mount('#app');

/**
 * Converts Numbers and Strings of numbers into US Currency format and vice-versa (as well as other things related to formatting numbers)
 * @external autonumeric
 * @see {@link https://www.npmjs.com/package/autonumeric|autonumeric}
 */

/**
 * Allows the Rating System Front-End to talk to the Rating-System.
 * @external axios
 * @see {@link https://www.npmjs.com/package/axios|axios}
 */

/**
 * A Promise library that adds many useful tools to the standard Promise library. (Primarily used to easily make synchronous functions asynchronous)
 * @external bluebird
 * @see {@link https://www.npmjs.com/package/bluebird|bluebird}
 */

/**
 * Wraps the CSS library {@link }
 */

/**
 * Saves computers from violent developers by making date and time formatting/manipulation bearable. 
 * @external moment
 * @see {@link https://www.npmjs.com/package/moment|moment}
 */

/**
 * Fast in-browser tool for converting CSV files into JSON and vice-versa.
 * **NOTE**: Not Currently in use but is available to handle large data-sets from the server.
 * (Planned feature is for an auto-complete-like function for city names)
 * @external papaparse
 * @see {@link https://www.npmjs.com/package/papaparse|papaparse}
 */

/**
 * Front-End Framework. It's what makes this whole smooth, state-full, clean looking application possible.
 * Uses .vue components to assemble pages, if created properly these components are reusable with little to no changes from one Vue.JS project to the next
 * @external vue
 * @see {@link https://www.npmjs.com/package/vue|vue}
 */

/**
 * Adds a pre-defined component and "built-in" tools to Vue.JS for easy generation of popups and other notifications
 * @external vue-alertify
 * @see {@link https://www.npmjs.com/package/vue-alertify|vue-alertify}
 */

/**
 * Provides a large number of images and icons from {@link https://fontawesome.com/|Font-Awesome} (Up arrow, trash can symbol, etc...)
 * **NOTE**: Uses the SVG image formate which allows for "on-the-fly" color and size changes of any icons or images from this module
 * @external vue-awesome
 * @see {@link https://www.npmjs.com/package/vue-awesome|vue-awesome}
 */

/**
 * Though this can be complicated to set up initially, it still makes the creation of interactive tables
 * (Like the one used for listing quotes) much easier. The component that uses this can be made generic with minor modification
 * @external vue-easytable
 * @see {@link https://www.npmjs.com/package/vue-easytable|vue-easytable}
 */

/**
 * All other Datepickers have failed me, until like a shining light in the dark I found this one. And someone already wrapped it as a vue component!
 * This is the {@link https://flatpickr.js.org/|flatpickr} Datepicker wrapped inside an easy to integrate Vue component
 * @external vue-flatpickr-component
 * @see {@link https://www.npmjs.com/package/vue-flatpickr-component|vue-flatpickr-component}
 */

/**
 * Allows for the simulation of browsing to other 'pages'.
 * @external vue-router
 * @see {@link https://www.npmjs.com/package/vue-router|vue-router}
 */

/**
 * This Table component is used for maintenance and builder tables. Any table that doesn't need a lot of 
 * extra functionality. This makes it easier to create a table that scrolls easily and stays within the user's monitor size
 * @external vue-scrolling-table
 * @see {@link https://www.npmjs.com/package/vue-scrolling-table|vue-scrolling-table}
 */

/**
 * Fancy Loading spinner. Jordan made me do it....
 * @external vue-simple-spinner
 * @see {@link https://www.npmjs.com/package/vue-simple-spinner|vue-simple-spinner}
 */

/**
 * Allows for easy control of multiple asynchronous functions/components ensuring that dependent actions occur in the necessary order
 * @external vue-wait
 * @see {@link https://www.npmjs.com/package/vue-wait|vue-wait}
 */

/**
 * In browser State management and data store.
 * @external vuex
 * @see {@link https://www.npmjs.com/package/vuex|vuex}
 */
