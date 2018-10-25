<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-badge variant="dark">Password</b-badge>
    </b-input-group-prepend>
    <b-form-input :id="id"
                  v-model="password" 
                  type="password"
                  :disabled="disabled"></b-form-input>
  </b-input-group>
</template>

<script>
export default {
  name: 'input-username',
  props: {
    label: String,
    value: String,
    disabled: Boolean
  },
  data() {
    return {
      id: this.label,
      password: this.value
    }
  },
  watch: {
    password (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.password = value;
    }
  }
}
</script>
