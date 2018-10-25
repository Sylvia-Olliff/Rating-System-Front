<template>
  <div>
    <b-input-group>
      <b-input-group-prepend>
        <b-badge variant="dark">Zip Code</b-badge>
      </b-input-group-prepend>
      <b-form-input v-model="zipCode"
                    type="text"
                    :formatter="format"
                    :disabled="disabled"></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: 'input-zip',
  props: {
    label: String,
    value: String,
    disabled: Boolean
  },
  data () {
    return {
      zipCode: this.value
    }
  },
  watch: {
    zipCode (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.zipCode = value;
    }
  },
  methods: {
    format (value) {
      if (!value) return '';
      if (!isNaN(this.zipCode) && this.zipCode.length < 7) return value;
      else {
        value = value.slice(0, -1)
        return value;
      }
    }
  }
}
</script>
