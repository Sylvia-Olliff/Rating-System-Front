<template>
  <b-form-group :label="title">
    <b-form-input :id="id" v-model="miles" type="number" :formatter="format" :disabled="disabled" />
  </b-form-group>
</template>

<script>
export default {
  name: 'input-stopoffs',
  props: {
    label: String,
    title: String,
    value: Number,
    disabled: Boolean
  },
  data () {
    return {
      id: this.label,
      miles: this.value
    }
  },
  watch: {
    miles (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.miles = value;
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
