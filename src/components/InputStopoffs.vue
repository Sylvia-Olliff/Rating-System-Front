<template>
  <b-form-group
      label="Stop Offs"
      >
      <b-form-input id="stopOffs" v-model="stopOffs" type="number" :formatter="format" :disabled="disabled" />
    </b-form-group>
</template>

<script>
export default {
  name: 'input-stopoffs',
  props: {
    value: Number,
    disabled: Boolean
  },
  data () {
    return {
      stopOffs: this.value
    }
  },
  watch: {
    stopOffs (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.stopOffs = value;
    }
  },
  methods: {
    format (value) {
      if (!value) return 0;
      if (!isNaN(value)) {
        if (parseInt(value) < 0) return 0;
        else return value;
      } 
    }
  }
}
</script>
