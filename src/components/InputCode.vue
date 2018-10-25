<template>
  <b-form-group :label="title">
    <b-form-input v-if="(!list)" v-model="code" type="text" :formatter="format" :disabled="disabled" />
    <b-form-select v-if="(list)" id="code" v-model="selected" :options="list" :disabled="disabled" />
  </b-form-group>
</template>

<script>
export default {
  name: 'input-code',
  props: {
    value: String,
    disabled: Boolean,
    list: Array
  },
  data () {
    return {
      title: 'CODE',
      code: this.value,
      selected: this.value
    }
  },
  watch: {
    code (value) {
      this.$emit('input', value);
    },
    selected (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.code = value;
    }
  },
  methods: {
    format (value) {
      if (value && this.code.length < 5) return value.toUpperCase();
      else {
        value = value.slice(0, -1);
        return value.toUpperCase();
      }
    }
  }
}
</script>
