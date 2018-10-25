<template>
  <div>
    <b-card :title="title" bg-variant="dark" text-variant="white">
      <div class="card-text">
        <b-row>
          <b-col>
            <input-stop-offs v-model="stopOffs" />
          </b-col>
          <b-col>
            <input-mode :label="'quote'" v-model="mode" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <input-country :title="'Origin Country'" :label="'origin'" v-model="originCountry" />
          </b-col>
          <b-col>
            <input-country :title="'Destin Country'" :label="'destination'" v-model="destinationCountry" />
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <input-miles :title="'HHG'" :label="'HHG'" v-model="milesHHG" />
          </b-col>
          <b-col>
            <input-miles :title="'PRACT'" :label="'PRACT'" v-model="milesPRACT" />
          </b-col>
        </b-row>
        <b-row>
          <input-effective-date :label="'Effective Date'" v-model="effectiveDate" />          
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import InputCountry from './InputCountry.vue';
import InputStopOffs from './InputStopoffs.vue';
import InputMode from './InputMode.vue';
import InputMiles from './InputMiles.vue';
import InputEffectiveDate from './InputEffectiveDate.vue';

export default {
  name: 'query-options',
  props: {
    title: String
  },
  computed: {
    originCountry: {
      get () {
        return this.$store.state.QuoteGen.currentRoute.originData.country.value;
      },
      set (value) {
        this.$store.state.QuoteGen.currentRoute.originData.country.value = value;
      }
    },
    destinationCountry: {
      get () {
        return this.$store.state.QuoteGen.currentRoute.destinationData.country.value;
      },
      set (value) {
        this.$store.state.QuoteGen.currentRoute.destinationData.country.value = value;
      }
    },
    stopOffs: {
      get () {
        return parseInt(this.$store.state.QuoteGen.currentRoute.optionsData.stopOffs);
      },
      set (value) {
        this.$store.state.QuoteGen.currentRoute.optionsData.stopOffs = parseInt(value);
      }
    },
    mode: {
      get () {
        return this.$store.state.QuoteGen.currentRoute.optionsData.mode;
      },
      set (value) {
        this.$store.state.QuoteGen.currentRoute.optionsData.mode = value;
      }
    },
    milesHHG: {
      get () {
        return parseInt(this.$store.state.QuoteGen.currentRoute.optionsData.miles.HHG);
      },
      set (value) {
        this.$store.state.QuoteGen.currentRoute.optionsData.miles.HHG = parseInt(value);
      }
    },
    milesPRACT: {
      get () {
        return parseInt(this.$store.state.QuoteGen.currentRoute.optionsData.miles.PRACT);
      },
      set (value) {
        this.$store.state.QuoteGen.currentRoute.optionsData.miles.PRACT = parseInt(value);
      }
    },
    effectiveDate: {
      get () {
        return this.$store.state.QuoteGen.currentRoute.optionsData.effectiveDate;
      },
      set (value) {
        this.$store.state.QuoteGen.currentRoute.optionsData.effectiveDate = value;
      }
    }
  },
  components: {
    InputCountry,
    InputStopOffs,
    InputMode,
    InputMiles,
    InputEffectiveDate
  }
}
</script>
