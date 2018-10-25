<template>
  <VTable
    style="width: 100%"
    class="border border-primary rounded"
    is-vertical-resize
    is-horizontal-resize
    column-width-drag
    :is-loading="isLoading"
    :vertical-resize-offset='3'
    :min-height='200'
    :height='600'
    :row-height="40"
    :table-data="items"
    :columns="columns"
    :column-cell-class-name="rowClass">
  </VTable>
</template>

<script>
import Vue from 'vue';
import { VTable } from 'vue-easytable';
import ColumnMaintenanceOps from './ColumnMaintenanceOps';

export default {
  name: 'maintenance-table',
  props: {
    isLoading: Boolean,
    columns: Array
  },
  computed: {
    items () {
      return this.$store.state.Maintenance.searchResults;
    }
  },
  methods: {
    rowClass (rowIndex, columnName, rowData) {
      return rowData.classes;
    }
  },
  components: {
    VTable
  }
}

Vue.component(ColumnMaintenanceOps.name, ColumnMaintenanceOps);
</script>
