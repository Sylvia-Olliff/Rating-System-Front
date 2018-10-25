<template>
  <div>
    <b-form-group
      :label="name"
      label-for="effDate"
      >
      <flat-picker
        v-model="effectiveDate"
        class="form-control"
        :name="name"
        :disabled="disabled" />
    </b-form-group>
  </div>
</template>

<script>
import FlatPicker from 'vue-flatpickr-component';
import moment from 'moment';
import 'flatpickr/dist/flatpickr.css';
import 'flatpickr/dist/themes/material_blue.css';

export default {
  name: 'input-effective-date',
  props: {
    label: String,
    value: String,
    disabled: Boolean
  },
  data () {
    return {
      name: this.label,
      effectiveDate: moment(this.value).format('YYYY-MM-DD')
    }
  },
  watch: {
    effectiveDate (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.effectiveDate = moment(value).format('YYYY-MM-DD');
    }
  },
  components: {
    FlatPicker
  }
}
</script>

