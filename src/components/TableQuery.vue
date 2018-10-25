<template>
  <VTable
    style="width: 100%"
    class="border border-primary rounded"
    is-vertical-resize
    is-horizontal-resize
    column-width-drag
    :is-loading="isLoading"
    :vertical-resize-offset='5'
    :min-height='200'
    :height='600'
    :row-height="80"
    :table-data="items"
    :columns="columns"
    :column-cell-class-name="rowClass">
  </VTable>
</template>

<script>
import Vue from 'vue';
import { VTable } from 'vue-easytable';
import ColumnContact from './ColumnContact.vue';

export default {
  name: 'query-table',
  data () {
    return {
      columns: [
        { field: 'name', title: 'Name', width: 150, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true },
        { field: 'custom-contact', title: 'Contact', width: 230, titleAlign: 'center', columnAlign: 'center', componentName: 'column-contact', titleCellClassName: 'bg-primary font-weight-bold', isResize: true },
        { field: 'base', title: 'Base Cost', width: 5, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true },
        { field: 'fuelCharge', title: 'Fuel Charge', width: 5, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true },
        { field: 'total', title: 'Total Cost', width: 5, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true },
        { field: 'miles', title: 'Miles', width: 5, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true },
        { field: 'rpm', title: 'RPM', width: 5, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true },
        { field: 'comments', title: 'Comments', width: 105, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-primary font-weight-bold', isResize: true }
      ]
    }
  },
  props: {
    isLoading: Boolean
  },
  computed: {
    items () {
      return this.$store.state.QuoteGen.response.quotes;
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

Vue.component(ColumnContact.name, ColumnContact);
</script>

