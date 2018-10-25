<template>
  <div>
    <b-card :title="title" bg-variant="dark" text-variant="white">
      <div class="card-text">
        <b-row>
          <b-col cols="6">
            <input-city :label="label" v-model="city" />
          </b-col>
          <b-col cols="2">
            <input-state :label="label" v-model="state" :strict="true" />
          </b-col>
          <b-col cols="4">
            <input-zip :label="label" v-model="zipCode" />
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
  },
  data () {
    return {
      label: this.title.toLowerCase()
    }
  },
  computed: {
    city: {
      get () {
        if (this.label === 'origin') return this.$store.state.QuoteGen.currentRoute.originData.city.value
        if (this.label === 'destination') return this.$store.state.QuoteGen.currentRoute.destinationData.city.value
      },
      set (value) {
        if (this.label === 'origin') return this.$store.state.QuoteGen.currentRoute.originData.city.value = value
        if (this.label === 'destination') return this.$store.state.QuoteGen.currentRoute.destinationData.city.value = value
      }
    },
    state: {
      get () {
        if (this.label === 'origin') return this.$store.state.QuoteGen.currentRoute.originData.state.value
        if (this.label === 'destination') return this.$store.state.QuoteGen.currentRoute.destinationData.state.value
      },
      set (value) {
        if (this.label === 'origin') return this.$store.state.QuoteGen.currentRoute.originData.state.value = value
        if (this.label === 'destination') return this.$store.state.QuoteGen.currentRoute.destinationData.state.value = value
      }
    },
    zipCode: {
      get () {
        if (this.label === 'origin') return this.$store.state.QuoteGen.currentRoute.originData.zipCode.value
        if (this.label === 'destination') return this.$store.state.QuoteGen.currentRoute.destinationData.zipCode.value
      },
      set (value) {
        if (this.label === 'origin') return this.$store.state.QuoteGen.currentRoute.originData.zipCode.value = value
        if (this.label === 'destination') return this.$store.state.QuoteGen.currentRoute.destinationData.zipCode.value = value
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

