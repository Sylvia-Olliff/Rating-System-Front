<template>
  <div class="scroll-table">
    <b-table 
      :fields="fields" 
      :items="entries"
      hover
      bordered
      small>
      <template slot="route" slot-scope="data">
        <b-container>
          <br />
          <b-row>
            <b-col cols="4" v-if="display.orgCity">
              <input-city :label="'orgCity'" v-model="data.item.originData.city" />
            </b-col>
            <b-col v-if="display.orgState">
              <input-state :label="'orgState'" v-model="data.item.originData.state" :strict="true" />
            </b-col>
            <b-col v-if="display.orgZip">
              <input-zip :label="'From Zip'" v-model="data.item.originData.zip.from" />
              <input-zip :label="'To Zip'" v-model="data.item.originData.zip.to" />
            </b-col>
            <icon v-if="!display.miles" class="mt-3" name="arrow-right" />
            <b-col cols="4" v-if="display.desCity">
              <input-city :label="'desCity'" v-model="data.item.destinationData.city" />
            </b-col>
            <b-col v-if="display.desState">
              <input-state :label="'desState'" v-model="data.item.destinationData.state" :strict="true" />
            </b-col>
            <b-col v-if="display.desZip">
              <input-zip :label="'From Zip'" v-model="data.item.destinationData.zip.from" />
              <input-zip :label="'To Zip'" v-model="data.item.destinationData.zip.to" />
            </b-col>
          </b-row>
        </b-container>
      </template>
      <template slot="rate" slot-scope="data">
        <b-container>
          <br />
          <b-row>
            <b-col v-if="display.flat">
              <input-numeric :label="'Flat'" v-model="data.item.rateData.flatRate" />
            </b-col>
            <b-col v-if="display.rpm">
              <input-numeric :label="'RPM'" v-model="data.item.rateData.ratePerMile" />
            </b-col>
            <b-col v-if="display.minCharge">
              <input-numeric :label="'Min'" v-model="data.item.rateData.minimumCharge" />
            </b-col>
          </b-row>
        </b-container>
      </template>
      <template slot="options" slot-scope="data">
        <b-container>
          <b-row>
            <b-col cols="2">
              <br />
              <input-included :label="'Fuel?'" v-model="data.item.optionsData.fuelIncluded" :checked-value="'Y'" :uncheckedValue="'N'" />
            </b-col>
            <b-col v-if="display.miles" cols="6">
              <b-row>
                <b-col class="text-center" cols="12">
                  <h5>
                    <b-badge variant="dark" class="badge">Miles</b-badge>
                  </h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <div>
                    <b-input-group>
                      <b-form-input v-model="data.item.optionsData.miles.from" type="number" />
                    </b-input-group>
                  </div>
                </b-col>
                -
                <b-col>
                  <div>
                    <b-input-group>
                      <b-form-input v-model="data.item.optionsData.miles.to" type="number" />
                    </b-input-group>
                  </div>
                </b-col>
              </b-row>
            </b-col>
            <b-col :cols="notesCol">
              <h5>
                <b-badge variant="dark" class="badge">Notes</b-badge>
              </h5>
              <b-form-textarea v-model="data.item.optionsData.note" :rows="2" :max-rows="7" :size="notesSize" />
            </b-col>
          </b-row>
        </b-container>
      </template>
    </b-table>
  </div>
</template>

<script>
import 'vue-awesome/icons/arrow-right';
import Icon from 'vue-awesome/components/Icon';
import InputCity from './InputCity';
import InputState from './InputState';
import InputZip from './InputZip';
import InputNumeric from './InputNumeric';
import InputEffectiveDate from './InputEffectiveDate';
import InputMiles from './InputMiles';
import InputIncluded from './InputIncluded';
import { getDisplayList } from '@/config/Settings';

export default {
  name: 'table-builder',
  data () {
    return {
      fields: [
        { 
          key: 'route',
          label: 'Route',
          class: '',
          tdClass: 'mx-0 px-0',
          thClass: 'bg-info text-light'
        },
        {
          key: 'rate',
          label: 'Rate Data',
          class: '',
          tdClass: 'mx-0 px-0',
          thClass: 'bg-info text-light'
        },
        {
          key: 'options',
          label: 'Options',
          class: 'mx-0 px-0',
          thClass: 'bg-info text-light'
        }
      ],
      notesCol: "10",
      notesSize: "100"
    }
  },
  computed: {
    entries () {
      return this.$store.state.Builder.entryData.entries;
    },
    type () {
      return this.$store.state.Builder.entryData.settings.type;
    },
    display () {
      return getDisplayList(this.type);
    }
  },
  watch: {
    display (value) {
      if (value.miles) {
        this.notesCol = "4";
        this.notesSize = "10";
      } else {
        this.notesCol = "10";
        this.notesSize = "100";
      }
    }
  },
  components: {
    InputCity,
    InputState,
    InputZip,
    InputNumeric,
    InputIncluded,
    InputMiles,
    InputEffectiveDate,
    Icon
  }
}
</script>

<style>
  /*
  .w-60 {
    width: 60%!important;
  }
  .route-section {
    min-width: 25%;
    max-width: 25%;
  }
  .rate-section {
    min-width: 15%;
    max-width: 25%;
  }
  .options-section {
    min-width: 20%;
    max-width: 35%;
  } */
  .scroll-table {
    overflow-y: scroll;
    max-height: 500px;
  }
</style>

