<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-badge variant="dark">Username</b-badge>
    </b-input-group-prepend>
    <b-form-input :id="id"
                  v-model="username" 
                  type="text"
                  :formatter="format"
                  :disabled="disabled"></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  name: 'input-username',
  props: {
    label: String,
    value: String,
    disabled: Boolean,
    max: Number
  },
  data() {
    return {
      id: this.label,
      username: this.value,
      maxLength: (this.max) ? this.max : 10
    }
  },
  watch: {
    username (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.username = value;
    }
  },
  methods: {
    format (value) {
      if (!value) return '';
      if (this.username.length <= this.maxLength) return value.toUpperCase();
    }
  }
}
</script>
