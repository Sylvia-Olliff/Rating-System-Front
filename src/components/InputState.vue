<template>
  <div>
    <b-input-group>
      <b-input-group-prepend>
        <b-badge variant="dark">State</b-badge>
      </b-input-group-prepend>
      <b-form-input :id="id"
                    v-model="state" 
                    type="text"
                    :class="variant"
                    :formatter="format"
                    :disabled="disabled"></b-form-input>
    </b-input-group>
  </div>
</template>

<script>
export default {
  name: 'input-state',
  props: {
    label: String,
    value: String,
    strict: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      id: this.label,
      state: this.value,
      variant: ''
    }
  },
  watch: {
    state (value) {
      this.$emit('input', value);
    },
    value (value) {
      this.state = value;
    }
  },
  methods: {
    format (value) {
      if (!value) return '';
      if (this.strict) {
        if (isNaN(value) && this.state.length < 2) {
          this.variant = '';
          return value.toUpperCase();
        } else {
          if (isNaN(value) && this.state.length < 3) {
            if (value.match(/((A[KLRZ]|C[AOT]|D[CE]|FL|GA|HI|I[ADLN]|K[SY]|LA|M[ADEINOST]|N[CDEHJMVY]|O[HKR]|P[AR]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]))/g)) {
              this.variant = '';
              return value.toUpperCase();
            } else {
              this.variant = 'bg-danger';
              return value.toUpperCase();
            }
          } else {
            value = value.slice(0, -1);
            return value.toUpperCase();
          }
        }
      } else {
        if (isNaN(value) && this.state.length < 3) return value.toUpperCase();
        else {
          value = value.slice(0, -1);
          return value.toUpperCase();
        }
      }
    }
  }
}
</script>
