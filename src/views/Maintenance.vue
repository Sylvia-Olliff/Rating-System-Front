<template>
  <b-container fluid @keyup.enter="subSearch">
    <hr>
    <b-row>
      <b-col cols="10">
        <b-row>
          <b-col>
            <interface-maintenance-point :title="'Origin'" :disabled="$wait.is('populating table')" />
          </b-col>
          <b-col>
            <interface-maintenance-point :title="'Destination'" :disabled="$wait.is('populating table')" />
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col v-show="showTable" class="ml-3" >
            <v-wait for="populating table">
              <template slot="waiting">
                <spinner size="large" line-fg-color="#004BC5" line-bg-color="#555555" :font-size="20" :line-size="12" message="Populating Table..." />
              </template>
              <table-maintenance :columns="columns" />
            </v-wait>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row>
          <interface-maintenance-options :title="'Options'" :disabled="$wait.is('populating table')" />
        </b-row>
        <hr>
        <b-row>
          <b-btn variant="dark" @click="subSearch" :block="true" >Search</b-btn>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-btn variant="warning" :block="true" to="/">Back</b-btn> 
          </b-col>
          <b-col>
            <b-btn variant="primary" @click="clearForm" block>Clear</b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import InterfaceMaintenancePoint from "@/components/InterfaceMaintenancePoint";
import InterfaceMaintenanceOptions from "@/components/InterfaceMaintenanceOptions";
import TableMaintenance from '@/components/TableMaintenance';
import { maintenanceTableColumns } from '@/config/Settings';
import Spinner from 'vue-simple-spinner';

export default {
  name: "maintenance",
  data () {
    return {
      showTable: false
    }
  },
  computed: {
    columns () {
      let cols = [];
      cols.push(maintenanceTableColumns.get('ops'));
      for (let col in this.$store.state.user.settings.maintenance.columns) {
        cols.push(maintenanceTableColumns.get(this.$store.state.user.settings.maintenance.columns[col]));
      }
      console.log(cols);
      return cols;
    }
  },
  methods: {
    clearForm() {
      this.showTable = false;
      this.$store.dispatch("Maintenance/clear");
    },
    subSearch() {
      this.showTable = true;
      this.$wait.start('populating table');
      this.$store.dispatch("Maintenance/search", this.$store.state.Maintenance.currentSearch)
        .then(success => {
          if (!success) this.showTable = false;
          this.$wait.end('populating table');
        });
    },
    populate () {
      this.showTable = true;
      this.$wait.start('populating table');
      this.$store.dispatch('Maintenance/populateTable')
        .then(() => {this.$wait.end('populating table');});
    }
  },
  mounted () {
    if (this.$store.state.user.settings.maintenance.prePopTable) this.populate();
  },
  components: {
    InterfaceMaintenancePoint,
    InterfaceMaintenanceOptions,
    TableMaintenance,
    Spinner
  }
};
</script>
