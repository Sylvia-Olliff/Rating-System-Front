<template>
  <b-modal 
    ref="laneDeleter"
    title="Lane Data Delete"
    header-bg-variant="danger"
    header-text-variant="light"
    size="lg"
    ok-title="DELETE"
    ok-variant="danger"
    @hidden="onHidden"
    @ok="onOk"
    centered>
      <b-container fluid>
        <b-row>
          <b-col>
            <h2 class="text-danger">This will Delete this lane! Are you sure?</h2>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <h3 class="text-primary">{{ laneData.name }}</h3>
          </b-col>
        </b-row>
        <hr>
        <b-row class="text-left">
          <b-col cols="4">
            <h5>
              <b-badge variant="dark" class="badge">Code:</b-badge>
              <span class="text-primary">{{ laneData.code }}</span>
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">Mode:</b-badge>
              <span class="text-primary">{{ laneData.mode }}</span>
            </h5>
          </b-col>
          <b-col cols="4">
            <h5>
              <b-badge variant="dark" class="badge">Type:</b-badge>
              <span class="text-primary">{{ laneData.laneType }}</span>
            </h5>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="text-center text-light bg-info">
            <h4>Origin</h4>
          </b-col>
        </b-row>
        <b-row class="text-left">
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">City:</b-badge>
              <span class="text-primary">{{ laneData.originCity }}</span>
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">State:</b-badge>
              <span class="text-primary">{{ laneData.originState }}</span>
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">Zip Range:</b-badge>
              <span class="text-primary">{{ laneData.originZipRange }}</span>
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">Country:</b-badge>
              <span class="text-primary">{{ laneData.originCountry }}</span>
            </h5>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="text-left text-light bg-info">
            <h4>Destination</h4>
          </b-col>
        </b-row>
        <b-row class="text-left">
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">City:</b-badge>
              <span class="text-primary">{{ laneData.destinationCity }}</span>
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">State:</b-badge>
              <span class="text-primary">{{ laneData.destinationState }}</span>
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">Zip Range:</b-badge>
              <span class="text-primary">{{ laneData.destinationZipRange }}</span>
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <b-badge variant="dark" class="badge">Country:</b-badge>
              <span class="text-primary">{{ laneData.destinationCountry }}</span>
            </h5>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="text-left text-light bg-info">
            <h4>Rate Data</h4>
          </b-col>
        </b-row>
        <br />
        <b-row class="text-left">
          <b-col cols="4">
            <h5>
              <input-numeric :label="'Flat Rate'" v-model="laneData.flatRate" disabled />
            </h5>
          </b-col>
          <b-col cols="4">
            <h5>
              <input-numeric :label="'RPM'" v-model="laneData.ratePerMile" disabled />
            </h5>
          </b-col>
          <b-col cols="4">
            <h5>
              <input-numeric :label="'Min Charge'" v-model="laneData.minimumCharge" disabled />
            </h5>
          </b-col>
        </b-row>
        <b-row class="text-left mt-2">
          <b-col cols="6">
            <h5>
              <b-badge variant="dark" class="badge">Fuel Included:</b-badge>
              <span class="text-primary">{{ laneData.fuelIncluded }}</span>
            </h5>
          </b-col>
          <b-col cols="6">
            <h5>
              <b-badge variant="dark" class="badge">Fuel Table:</b-badge>
              <span class="text-primary">{{ laneData.fuelTable }}</span>
            </h5>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="text-left text-light bg-info">
            <h4>Ranges</h4>
          </b-col>
        </b-row>
        <b-row class="text-left">
          <b-col cols="6">
            <h5>
              <b-badge variant="dark" class="badge">Mileage:</b-badge>
              <span class="text-primary">{{ laneData.mileageRange }}</span>
            </h5>
          </b-col>
          <b-col cols="6">
            <h5>
              <b-badge variant="dark" class="badge">Effective Dates:</b-badge>
              <span class="text-primary">{{ laneData.dateRange }}</span>
            </h5>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="text-left text-light bg-info">
            <h4>Comments</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-row>
            <b-col>
              <h5 class="text-primary">{{ laneData.note }}</h5>
            </b-col>
          </b-row>
        </b-row>
      </b-container>
  </b-modal>
</template>

<script>
import InputNumeric from './InputNumeric';

export default {
  name: 'modal-maintenance-delete',
  props: {
    laneData: Object,
    display: Boolean
  },
  data () {
    return {
      numericOptions: ['dollar', { minimumValue: '0' }]
    }
  },
  watch: {
    display (value) {
      if (value) this.$refs.laneDeleter.show();
      else this.$refs.laneDeleter.hide();
    }
  },
  methods: {
    onHidden() {
      this.$emit('closed');
    },
    onOk () {
      this.$emit('closed');
      this.$store.dispatch('Maintenance/confirmDelete', this.laneData)
        .then(confirmed => {
          if (confirmed) {
            this.$store.commit('notice', {
              source: 'LaneDelete',
              message: 'Lane Deleted Successfully',
              type: 'success'
            });
          }
        });
    }
  },
  components: {
    InputNumeric
  }
}
</script>

<style scoped>
  .badge {
    margin-right: 2em;
  }
</style>
