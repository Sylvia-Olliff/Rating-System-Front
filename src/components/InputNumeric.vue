<template>
  <div>
    <b-input-group>
      <b-input-group-prepend>
        <b-badge variant="dark">{{ label }}</b-badge>
      </b-input-group-prepend>
      <b-form-input v-model="rate" 
                    type="text"
                    @blur.native="format"
                    :disabled="disabled"></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
import AutoNumeric from 'autonumeric';
import { defaultNumericOptions } from '@/config/Settings';

export default {
  name: 'input-numeric',
  props: {
    label: String,
    value: [Number, String],
    options: Object,
    disabled: Boolean
  },
  data () {
    return {
      rate: AutoNumeric.format(this.value, this.numericOptions),
      numericOptions: (this.options) ? this.options : defaultNumericOptions
    }
  },
  watch: {
    rate (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.rate = value;
    }
  },
  methods: {
    format () {
      this.rate = AutoNumeric.format(this.rate, this.numericOptions);
    }
  }
}
</script>

