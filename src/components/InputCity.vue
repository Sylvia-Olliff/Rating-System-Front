<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-badge variant="dark">City</b-badge>
    </b-input-group-prepend>
    <b-form-input :id="id"
                  v-model="city" 
                  type="text"
                  :formatter="format"
                  :disabled="disabled"></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  name: 'input-city',
  props: {
    label: String,
    value: String,
    disabled: Boolean
  },
  data () {
    return {
      id: this.label,
      city: this.value
    }
  },
  watch: {
    city (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.city = value;
    }
  },
  methods: {
    format (value) {
      if (!value) return '';
      if (isNaN(value) && this.city.length < 30) return value.toUpperCase();
    }
  }
}
</script>
