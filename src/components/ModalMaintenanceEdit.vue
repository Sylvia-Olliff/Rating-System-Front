<template>
  <b-modal
    ref="laneEditor"
    title="Lane Data Edit"
    header-bg-variant="info"
    header-text-variant="light"
    size="lg"
    @hidden="onHidden"
    @ok="onOk"
    centered>
      <b-container fluid>
        <b-row>
          <b-col>
            <h3 class="text-primary">{{ laneEdit.name }}</h3>
          </b-col>
        </b-row>
        <hr>
        <b-row class="text-left">
          <b-col cols="4">
            <h5 class="text-primary">
              <b-badge variant="dark" class="badge">Code:</b-badge>
              <span>{{ laneEdit.code }}</span>
              <!-- <input-code v-model="laneEdit.code" class="text-dark" /> -->
            </h5>
          </b-col>
          <b-col cols="3">
            <h5 class="text-primary">
              <b-badge variant="dark" class="badge">Mode:</b-badge>
              <span>{{ laneEdit.mode }}</span>
              <!-- <input-mode v-model="laneEdit.mode" class="text-dark" /> -->
            </h5>
          </b-col>
          <b-col cols="4">
            <h5 class="text-primary">
              <b-badge variant="dark" class="badge">Type:</b-badge>
              <span>{{ laneEdit.laneType }}</span>
              <!-- <input-type v-model="laneEdit.laneType" class="text-dark" /> -->
            </h5>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="text-left text-light bg-info">
            <h4>Origin</h4>
          </b-col>
        </b-row>
        <b-row class="text-left">
          <b-col cols="4">
            <br />
            <h5>
              <input-city :label="'orgCity'" v-model="laneEdit.originCity" :disabled="displayList.orgCity" />
            </h5>
          </b-col>
          <b-col cols="2">
            <br />
            <h5>
              <input-state :label="'orgState'" v-model="laneEdit.originState" :disabled="displayList.orgState" strict />
            </h5>
          </b-col>
          <b-col cols="3">
            <br />
            <h5>
              <input-zip :label="'orgZip'" v-model="laneEdit.originZipRange" :disabled="displayList.orgZip" />
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <input-country :label="'orgCountry'" title="Country" v-model="laneEdit.originCountry" />
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
          <b-col cols="4">
            <br />
            <h5>
              <input-city :label="'desCity'" v-model="laneEdit.destinationCity" :disabled="displayList.desCity" />
            </h5>
          </b-col>
          <b-col cols="2">
            <br />
            <h5>
              <input-state :label="'desState'" v-model="laneEdit.destinationState" :disabled="displayList.desState" strict />
            </h5>
          </b-col>
          <b-col cols="3">
            <br />
            <h5>
              <input-zip :label="'desZip'" v-model="laneEdit.destinationZipRange" :disabled="displayList.desZip" />
            </h5>
          </b-col>
          <b-col cols="3">
            <h5>
              <input-country :label="'desCountry'" title="Country" v-model="laneEdit.destinationCountry" />
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
              <input-numeric :label="'Flat Rate'" v-model="laneEdit.flatRate" :disabled="displayList.flatRate" />
            </h5>
          </b-col>
          <b-col cols="4">
            <h5>
              <input-numeric :label="'RPM'" v-model="laneEdit.ratePerMile" :disabled="displayList.ratePerMile" />
            </h5>
          </b-col>
          <b-col cols="4">
            <h5>
              <input-numeric :label="'Min Charge'" v-model="laneEdit.minimumCharge" :disabled="displayList.minimumCharge" />
            </h5>
          </b-col>
        </b-row>
        <b-row class="text-left mt-2">
          <b-col cols="6">
            <h5>
              <input-included :label="'Fuel Included?'" v-model="laneEdit.fuelIncluded" :checked-value="'Y'" :uncheckedValue="'N'" />
            </h5>
          </b-col>
          <b-col cols="6">
            <h5>
              <b-badge variant="dark" class="badge">Fuel Table:</b-badge>
              <span class="text-primary">{{ laneEdit.fuelTable }}</span> 
              <!-- // TODO: Pull list of current tables from the server and change this to a dropdown list -->
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
          <b-col cols="4">
            <br />
            <h5>
              <b-badge variant="dark" class="badge">Mileage:</b-badge>
              <span class="text-primary">{{ laneEdit.mileageRange }}</span>
            </h5>
          </b-col>
          <b-col cols="4">
            <input-effective-date 
              :label="'Eff From Date:'"
              v-model="laneEdit.effectiveFromDate" />
          </b-col>
          <b-col cols="4">
            <input-effective-date 
              :label="'Eff To Date:'"
              v-model="laneEdit.effectiveToDate" />
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="text-left text-light bg-info">
            <h4>Comments</h4>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12">
            <b-form-textarea v-model="laneEdit.note" :rows="5" :max-rows="7" size="100" />
          </b-col>
        </b-row>
      </b-container>
  </b-modal>
</template>

<script>
import InputCity from './InputCity';
import InputCode from './InputCode';
import InputMode from './InputMode';
import InputState from './InputState';
import InputCountry from './InputCountry';
import InputZip from './InputZip';
import InputType from './InputType';
import InputEffectiveDate from './InputEffectiveDate';
import InputNumeric from './InputNumeric';
import InputIncluded from './InputIncluded';
import { getDisplayList } from '@/config/Settings';

export default {
  name: 'modal-maintenance-edit',
  props: {
    laneData: Object,
    display: Boolean
  },
  data () {
    return {
      id: this.label,
      laneEdit: this.laneData
    }
  },
  watch: {
    display (value) {
      if (value) this.$refs.laneEditor.show();
      else this.$refs.laneEditor.hide();
    }
  },
  computed: {
    displayList () {
      return getDisplayList(this.laneEdit.laneType);
    }
  },
  methods: {
    onHidden () {
      this.$emit('closed');
    },
    onOk () {
      // TODO: Perform edit validation here
      this.submit();
    },
    submit () {
      this.$store.dispatch('Maintenance/confirmEdit', this.laneEdit)
        .then(confirmed => {
          if (confirmed) {
            this.$store.commit('notice', {
              source: 'LaneEdit',
              message: 'Lane Edited Successfully',
              type: 'success'
            });
          }
        });
    }
  },
  components: {
    InputCity,
    InputCode,
    InputMode,
    InputState,
    InputCountry,
    InputZip,
    InputType,
    InputEffectiveDate,
    InputNumeric,
    InputIncluded
  }
}
</script>

<style scoped>
  .badge {
    margin-right: 2em;
  }
  .checkbox {
    padding-top: 2%;
  }
</style>

