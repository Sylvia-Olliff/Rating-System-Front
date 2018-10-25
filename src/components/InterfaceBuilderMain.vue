<template>
  <div>
    <b-card :title="title" bg-variant="dark" text-variant="white">
      <div class="card-text">
        <b-container fluid>
          <b-row>
            <b-col cols="1">
              <input-mode v-model="mode" :disabled="disabled" />
            </b-col>
            <b-col cols="1">
              <input-code v-model="code" :list="codeList" :disabled="disabled" />
            </b-col>
            <b-col cols="2">
              <input-effective-date :label="'Effective From'" v-model="effectiveFromDate" :disabled="disabled" />
            </b-col>
            <b-col cols="2">
              <input-effective-date :label="'Effective To'" v-model="effectiveToDate" :disabled="disabled" />
            </b-col>
            <b-col cols="2">
              <input-type v-model="type" :disabled="disabled" />
            </b-col>
            <b-col cols="2">
              <input-country :title="'Origin Country'" :label="'origin'" :disabled="disabled" v-model="originCountry" />
            </b-col>
            <b-col cols="2">
              <input-country :title="'Destin Country'" :label="'destination'" :disabled="disabled" v-model="destinationCountry" />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </b-card>
  </div>
</template>

<script>
import InputMode from './InputMode';
import InputCode from './InputCode';
import InputEffectiveDate from './InputEffectiveDate';
import InputCountry from './InputCountry';
import InputType from './InputType';
import moment from 'moment';

export default {
  name: 'interface-builder-main',
  props: {
    title: String,
    disabled: Boolean
  },
  mounted() {
    if (this.$store.state.user.settings.builder.code) {
      this.$store.state.Builder.entryData.settings.code = this.$store.state.user.settings.builder.code;
    }
    if (this.$store.state.user.settings.builder.laneType) {
      this.$store.state.Builder.entryData.settings.type = this.$store.state.user.settings.builder.laneType;
    }
  },
  computed: {
    code: {
      get () {
        return this.$store.state.Builder.entryData.settings.code;
      },
      set (value) {
        this.$store.state.Builder.entryData.settings.code = value;
      }
    },
    codeList () {
      return this.$store.state.global.carriers;
    },
    mode: {
      get () {
        return this.$store.state.Builder.entryData.settings.mode;
      },
      set (value) {
        this.$store.state.Builder.entryData.settings.mode = value;
      }
    },
    type: {
      get () {
        return this.$store.state.Builder.entryData.settings.type;
      },
      set (value) {
        this.$store.state.Builder.entryData.settings.type = value;
      }
    },
    effectiveFromDate: {
      get () {
        return this.$store.state.Builder.entryData.settings.effectiveFromDate;
      },
      set (value) {
        if (moment(value).isBefore(this.$store.state.Builder.entryData.settings.effectiveToDate)) {
          this.$store.state.Builder.entryData.settings.effectiveFromDate = value;
        } else {
          this.$store.commit('error', new Error('Effective From date must be BEFORE the effective To date.'));
        }
      }
    },
    effectiveToDate: {
      get () {
        return this.$store.state.Builder.entryData.settings.effectiveToDate;
      },
      set (value) {
        if (moment(value).isAfter(this.$store.state.Builder.entryData.settings.effectiveFromDate)) {
          this.$store.state.Builder.entryData.settings.effectiveToDate = value;
        } else {
          this.$store.commit('error', new Error('Effective To date must be AFTER the effective From date.'));
        }
      }
    },
    originCountry: {
      get () {
        return this.$store.state.Builder.entryData.settings.originCountry;
      },
      set (value) {
        this.$store.state.Builder.entryData.settings.originCountry = value;
      }
    },
    destinationCountry: {
      get () {
        return this.$store.state.Builder.entryData.settings.destinationCountry;
      },
      set (value) {
        this.$store.state.Builder.entryData.settings.destinationCountry = value;
      }
    }
  },
  components: {
    InputMode,
    InputCode,
    InputEffectiveDate,
    InputCountry,
    InputType
  }
}
</script>
