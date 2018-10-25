<template>
  <div>
    <b-input-group>
      <b-input-group-prepend variant="dark">
        <b-badge variant="dark">{{ label }}</b-badge>
      </b-input-group-prepend>
      <b-form-checkbox class="checkbox" 
                       v-model="selected" 
                       :value="checkedValue" 
                       :unchecked-value="uncheckedValue" />
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: 'input-included',
  props: {
    label: String,
    value: [Boolean, String],
    disabled: Boolean,
    checkedValue: [String, Number],
    uncheckedValue: [String, Number]
  },
  data () {
    return {
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

<style scoped>
.checkbox {
    margin-left: 3%;
  }
</style>

