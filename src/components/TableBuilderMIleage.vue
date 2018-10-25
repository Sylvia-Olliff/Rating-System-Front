<template>
  <div class="scroll-table">
    <b-table
      :fields="fields"
      :items="items"
      hover
      bordered
      small>
      <template slot="state" slot-scope="data">
        <input-state :label="'milState'" v-model="data.item.state" :strict="true" />
      </template>
      <template slot="zipFrom" slot-scope="data">
        <input-zip :label="'From Zip'" v-model="data.item.zip.from" />
      </template>
      <template slot="zipTo" slot-scope="data">
        <input-zip :label="'To Zip'" v-model="data.item.zip.to" />
      </template>
    </b-table>
  </div>
</template>

<script>
import InputState from './InputState';
import InputZip from './InputZip';

export default {
  name: 'interface-builder-mileage',
  data() {
    return {
      fields: [
        {
          key: 'state',
          label: 'State',
          thClass: 'bg-info text-light'
        },
        {
          key: 'zipFrom',
          label: 'From Zip',
          thClass: 'bg-info text-light'
        },
        {
          key: 'zipTo',
          label: 'To Zip',
          thClass: 'bg-info text-light'
        }
      ]
    }
  },
  computed: {
    items () {
      return this.$store.state.Builder.entryData.mileageData;
    }
  },
  components: {
    InputState,
    InputZip
  }
}
</script>

<style scoped>
  .scroll-table {
    overflow-y: scroll;
    max-height: 150px;
  }
</style>

