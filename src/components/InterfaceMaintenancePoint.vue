<template>
  <div>
    <b-card :title="title" bg-variant="dark" text-variant="white">
      <div class="card-text">
        <b-row>
          <b-col cols="6">
            <input-city :label="label" :disabled="disabled" v-model="city" />
          </b-col>
          <b-col cols="2">
            <input-state :label="label" :disabled="disabled" v-model="state" :strict="true" />
          </b-col>
          <b-col cols="4">
            <input-zip :label="label" :disabled="disabled" v-model="zipCode" />
          </b-col>
        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import InputCity from './InputCity.vue';
import InputState from './InputState.vue';
import InputZip from './InputZip.vue';

export default {
  name: 'query-point',
  props: {
    title: String,
    disabled: Boolean
  },
  data () {
    return {
      label: `${this.title.toLowerCase()}`
    }
  },
  computed: {
    city: {
      get () {
        if (this.label === 'origin') return this.$store.state.Maintenance.currentSearch.originData.city.value
        if (this.label === 'destination') return this.$store.state.Maintenance.currentSearch.destinationData.city.value
      },
      set (value) {
        if (this.label === 'origin') return this.$store.state.Maintenance.currentSearch.originData.city.value = value
        if (this.label === 'destination') return this.$store.state.Maintenance.currentSearch.destinationData.city.value = value
      }
    },
    state: {
      get () {
        if (this.label === 'origin') return this.$store.state.Maintenance.currentSearch.originData.state.value
        if (this.label === 'destination') return this.$store.state.Maintenance.currentSearch.destinationData.state.value
      },
      set (value) {
        if (this.label === 'origin') return this.$store.state.Maintenance.currentSearch.originData.state.value = value
        if (this.label === 'destination') return this.$store.state.Maintenance.currentSearch.destinationData.state.value = value
      }
    },
    zipCode: {
      get () {
        if (this.label === 'origin') return this.$store.state.Maintenance.currentSearch.originData.zipCode.value
        if (this.label === 'destination') return this.$store.state.Maintenance.currentSearch.destinationData.zipCode.value
      },
      set (value) {
        if (this.label === 'origin') return this.$store.state.Maintenance.currentSearch.originData.zipCode.value = value
        if (this.label === 'destination') return this.$store.state.Maintenance.currentSearch.destinationData.zipCode.value = value
      }
    }
  },
  components: {
    InputCity,
    InputState,
    InputZip
  }
}
</script>

<style scoped>

</style>

