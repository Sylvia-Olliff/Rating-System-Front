<template>
  <b-modal
    ref="userSettings"
    title="User Settings"
    header-bg-variant="info"
    header-text-variant="light"
    size="lg"
    @hidden="onHidden"
    @ok="onOk"
    centered>
      <b-container fluid>
        <b-row>
          <b-col cols="12" class="text-center">
            <h3>Maintenance Settings</h3>
          </b-col>
        </b-row>
        <hr>
        <b-row class="mb-2">
          <b-col cols="6" class="text=center">
            <b-form-select multiple v-model="maintenanceColumns" :options="options" />
          </b-col>
          <b-col cols="6" class="text=center">
            <b-form-checkbox v-model="maintenancePrePopTable" :value="true" :unchecked-value="false">
              Pre-Populate Maintenance Table?
            </b-form-checkbox>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="12" class="text-center">
            <h3>Builder Settings</h3>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="6" class="text=center">
            <input-code v-model="builderCode" :list="codeList" />
          </b-col>
          <b-col cols="6" class="text=center">
            <input-type v-model="builderType" />
          </b-col>
        </b-row>
      </b-container>
  </b-modal>
</template>

<script>
import InputCode from './InputCode';
import InputType from './InputType';
import { maintenanceColArray } from '../config/Settings.js';
export default {
  name: 'modal-user-settings',
  props: {
    display: Boolean
  },
  data() {
    return {
      options: maintenanceColArray
    }
  },
  watch: {
    display (value) {
      if (value) this.$refs.userSettings.show();
      else this.$refs.userSettings.hide();
    }
  },
  computed: {
    codeList () {
      return this.$store.state.global.carriers;
    },
    maintenanceColumns: {
      get() {
        if (this.$store.state.user.settings) {
          return this.$store.state.user.settings.maintenance.columns;
        } else return [''];
      },
      set(value) {
        this.$store.state.user.settings.maintenance.columns = value;
      }
    },
    maintenancePrePopTable: {
      get() {
        if (this.$store.state.user.settings) {
          return this.$store.state.user.settings.maintenance.prePopTable;
        } else return false;
      },
      set(value) {
        this.$store.state.user.settings.maintenance.prePopTable = value;
      }
    },
    builderCode: {
      get() {
        if (this.$store.state.user.settings) {
          return this.$store.state.user.settings.builder.code;
        } else return null;
      },
      set(value) {
        this.$store.state.user.settings.builder.code = value;
        if (this.$store.state.Builder.entryData.settings.code === '') {
          this.$store.state.Builder.entryData.settings.code = value;  
        }
      }
    },
    builderType: {
      get() {
        if (this.$store.state.user.settings) {
          return this.$store.state.user.settings.builder.laneType;
        } else return 10;
      },
      set(value) {
        this.$store.state.user.settings.builder.laneType = value;
      }
    }
  },
  methods: {
    onHidden () {
      this.$emit('closed');
    },
    onOk () {
      if (localStorage.getItem(`${this.$store.state.user.username}-settings`)) localStorage.removeItem(`${this.$store.state.user.username}-settings`);
      localStorage.setItem(`${this.$store.state.user.username}-settings`, JSON.stringify(this.$store.state.user.settings));
    }
  },
  components: {
    InputCode,
    InputType
  }
}
</script>
