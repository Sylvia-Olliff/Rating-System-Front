<template>
  <div>
    <b-card :title="title" bg-variant="dark" text-variant="white">
      <div class="card-text">
        <b-row>
          <b-col>
            <input-code :disabled="disabled" v-model="code" />
          </b-col>
          <b-col>
            <input-mode :label="'quote'" :disabled="disabled" v-model="mode" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <input-country :title="'Origin Country'" :label="'origin'" :disabled="disabled" v-model="originCountry" />
          </b-col>
          <b-col>
            <input-country :title="'Destin Country'" :label="'destination'" :disabled="disabled" v-model="destinationCountry" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <input-type :disabled="disabled" v-model="type" />
          </b-col>
          <b-col>
            <input-miles :title="'Miles'" :label="'Miles'" :disabled="disabled" v-model="miles" />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="text-center">
            <input-effective-date :label="'Effective Date'" :disabled="disabled" v-model="effectiveDate" />          
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import InputCountry from "./InputCountry";
import InputStopOffs from "./InputStopoffs";
import InputMode from "./InputMode";
import InputMiles from "./InputMiles";
import InputEffectiveDate from "./InputEffectiveDate";
import InputCode from "./InputCode";
import InputType from "./InputType";

export default {
  name: "maintenance-options",
  props: {
    title: String,
    disabled: Boolean
  },
  computed: {
    code: {
      get() {
        return this.$store.state.Maintenance.currentSearch.optionsData.code;
      },
      set(value) {
        this.$store.state.Maintenance.currentSearch.optionsData.code = value;
      }
    },
    originCountry: {
      get() {
        return this.$store.state.Maintenance.currentSearch.originData.country
          .value;
      },
      set(value) {
        this.$store.state.Maintenance.currentSearch.originData.country.value = value;
      }
    },
    destinationCountry: {
      get() {
        return this.$store.state.Maintenance.currentSearch.destinationData
          .country.value;
      },
      set(value) {
        this.$store.state.Maintenance.currentSearch.destinationData.country.value = value;
      }
    },
    mode: {
      get() {
        return this.$store.state.Maintenance.currentSearch.optionsData.mode;
      },
      set(value) {
        this.$store.state.Maintenance.currentSearch.optionsData.mode = value;
      }
    },
    miles: {
      get() {
        return parseInt(
          this.$store.state.Maintenance.currentSearch.optionsData.miles
        );
      },
      set(value) {
        this.$store.state.Maintenance.currentSearch.optionsData.miles = parseInt(value);
      }
    },
    effectiveDate: {
      get() {
        return this.$store.state.Maintenance.currentSearch.optionsData.effectiveDate;
      },
      set(value) {
        this.$store.state.Maintenance.currentSearch.optionsData.effectiveDate = value;
      }
    },
    type: {
      get() {
        return this.$store.state.Maintenance.currentSearch.optionsData.type;
      },
      set(value) {
        this.$store.state.Maintenance.currentSearch.optionsData.type = value;
      }
    }
  },
  components: {
    InputCountry,
    InputStopOffs,
    InputMode,
    InputMiles,
    InputEffectiveDate,
    InputCode,
    InputType
  }
};
</script>
