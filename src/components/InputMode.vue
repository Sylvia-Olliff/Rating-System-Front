<template>
  <div>
    <b-form-group
      label="Mode"
      >
      <b-form-select id="modes" v-model="selected" :options="options" :disabled="disabled" />
    </b-form-group>
  </div>
</template>

<script>
import { modes } from '@/config/Settings';

export default {
  name: 'input-mode',
  props: {
    value: String,
    disabled: Boolean
  },
  data () {
    return {
      options: modes,
      selected: this.value
    }
  },
  watch: {
    selected (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.selected = value;
    }
  }
}
</script>