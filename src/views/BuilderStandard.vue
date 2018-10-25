<template>
  <b-container class="bg-light" fluid>
    <hr>
    <b-row>
      <b-col cols="10">
        <interface-builder-main :title="'Lane Builder Settings'" />
      </b-col>
      <b-col cols="2">
        <br />
        <br />
        <b-row>
          <b-col cols="12" class="text-center">
            <h4 class="text-info">Actions</h4>
          </b-col>
        </b-row>
        <b-row class="mt-4">
          <b-col>
            <b-btn :variant="ready" @click="submitLanes" :block="true">Submit</b-btn>
          </b-col>
          <b-col>
            <b-btn variant="primary" @click="clearLanes" :block="true">Clear</b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <hr>
    <b-row v-if="display.miles">
      <b-col cols="5">
        <table-builder-mileage />
      </b-col>
      <b-col cols="5">
        <b-card border-variant="primary"
                bg-variant="light"
                text-variant="info"
                header="<h5>Instructions</h5>"
                header-bg-variant="primary"
                header-text-variant="white"
                align="center">
            <p class="card-text text-left">
              Use the table to the left to enter the states and zip range restrictions for this mileage based contract.<br />
              If a state has multiple zipcode ranges specified you can either repeat the state code for each line or leave the state code blank after the first one until you have listed all zipcode ranges for that state.
            </p>
        </b-card>
      </b-col>
    </b-row>
    <hr v-if="display.miles">
    <b-row>
      <b-col cols="12">
        <table-builder />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { getDisplayList } from '@/config/Settings';
import InterfaceBuilderMain from '@/components/InterfaceBuilderMain';
import TableBuilder from '@/components/TableBuilder';
import TableBuilderMileage from '@/components/TableBuilderMIleage';

export default {
  name: 'builder-standard',
  computed: {
    type () {
      return this.$store.state.Builder.entryData.settings.type;
    },
    display () {
      return getDisplayList(this.type);
    },
    entryData () {
      return this.$store.state.Builder.entryData;
    },
    ready () {
      if (this.$store.state.Builder.entryData.settings.code === '' || (this.$store.state.Builder.entryData.entries[0].rateData.ratePerMile === 0 && this.$store.state.Builder.entryData.entries[0].rateData.flatRate === 0 && this.$store.state.Builder.entryData.entries[0].rateData.minimumCharge === 0)) {
        return 'danger';
      } else {
        return 'success';
      }
    }
  },
  methods: {
    submitLanes () {
      if (this.ready === 'success') {
        this.$store.dispatch('Builder/submitLanes', this.entryData)
          .then(response => {
            if (response.success) this.$store.commit('notice', { source: 'Lane Builder', message: 'Lanes Submitted Successfully' });
            else this.$store.commit('error', response.error);
          })
          .catch(err => {
            this.$store.commit('error', err);
          });
      } else {
        let err;
        if (this.$store.state.Builder.entryData.settings.code === '') {
          err = new Error('Must Select a Carrier/Customer code before submitting.');
        } else {
          err = new Error(`You must enter in at least one lane's worth of data. If you have entered data, make sure the first lane in the table is not empty`);          
        }
        err.code = 'VALERROR';
        this.$store.commit('Maintenance/localError', err);
      }
    },
    clearLanes () {
      this.$store.dispatch('Builder/clearLanes');
    }
  },
  components: {
    InterfaceBuilderMain,
    TableBuilder,
    TableBuilderMileage
  }  
}
</script>
