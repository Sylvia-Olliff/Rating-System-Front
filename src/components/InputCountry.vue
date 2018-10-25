<template>
  <div>
    <b-form-group
      :label="title"
      >
      <b-form-select :id="id" v-model="selected" :options="options" :disabled="disabled" />
    </b-form-group>
  </div>
</template>

<script>
import { countries } from '@/config/Settings';

export default {
  name: 'input-country',
  props: {
    label: String,
    title: String,
    value: String,
    disabled: Boolean
  },
  data () {
    return {
      id: this.label,
      options: countries,
      selected: this.value
    }
  },
  watch: {
    selected (value) {
      this.$emit('input', value)
    },
    value (value) {
      this.selected = value;
    }
  }
}
</script>