<template>
  <VTable
    is-horizontal-resize
    style="width:100%;"
    class="border border-info rounded"
    :columns="columns"
    :table-data="tableData"
    :select-change="selected">
  </VTable>
</template>

<script>
import { VTable } from 'vue-easytable';

export default {
  name: 'table-point-list',
  data () {
    return {
      columns: [
        { width: 60, titleAlign: 'center', columnAlign:'center', type: 'selection' },
        { field: 'name', title: 'Name', width: 110, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-info text-light font-weight-bold', isResize: true },
        { field: 'county', title: 'County', width: 110, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-info text-light font-weight-bold', isResize: true },
        { field: 'state', title: 'State', width: 40, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-info text-light font-weight-bold', isResize: true },
        { field: 'zipCode', title: 'Zip Code', width: 60, titleAlign: 'center', columnAlign: 'center', titleCellClassName: 'bg-info text-light font-weight-bold', isResize: true }
      ],
      tableData: []
    }
  },
  props: {
    list: Array
  },
  watch: {
    list (value) {
      this.tableData = value;
    }
  },
  methods: {
    selected (selection, rowData) {
      this.tableData = [];
      if (rowData.point === 'origin') {
        this.$store.state.QuoteGen.currentRoute.originData.city.value = rowData.name;
        this.$store.state.QuoteGen.currentRoute.originData.state.value = rowData.state;
        if (this.$store.state.QuoteGen.currentRoute.originData.zipCode.value === '') this.$store.state.QuoteGen.currentRoute.originData.zipCode.value = rowData.zipCode;
      } else if (rowData.point === 'destination') {
        this.$store.state.QuoteGen.currentRoute.destinationData.city.value = rowData.name;
        this.$store.state.QuoteGen.currentRoute.destinationData.state.value = rowData.state;
        if (this.$store.state.QuoteGen.currentRoute.destinationData.zipCode.value === '') this.$store.state.QuoteGen.currentRoute.destinationData.zipCode.value = rowData.zipCode;
      }
      this.$store.commit('QuoteGen/setResendRouteFlag');
      this.$emit('selected-point', true);
    }
  },
  components: {
    VTable
  }
}
</script>
