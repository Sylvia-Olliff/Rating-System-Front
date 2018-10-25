<template>
  <div>
    <b-form-group
      label="Lane Type"
      >
      <b-form-select id="types" v-model="selected" :options="options" :disabled="disabled" />
    </b-form-group>
  </div>  
</template>

<script>
export default {
  name: 'input-type',
  props: {
    value: Number,
    disabled: Boolean
  },
  data () {
    return {
      selected: this.value
    }
  },
  computed: {
    options () {
      let options = [];
      options.push({ text: 'ANY', value: 0 });
      for (let [key, value] of this.$store.state.global.precs) {
        options.push({ text: value, value: parseInt(key) });
      }
      return options;
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
