<template>
  <b-container fluid @keyup.enter="genQuote">
    <hr>
    <b-row>
      <b-col cols="10">
        <b-row>
          <b-col>
            <interface-query-point :title="'Origin'" />
          </b-col>
          <b-col>
            <interface-query-point :title="'Destination'" />
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col class="ml-3">
            <v-wait for="generating quotes">
              <template slot="waiting">
                <spinner size="large" line-fg-color="#004BC5" line-bg-color="#555555" :font-size="20" :line-size="12" message="Generating Quotes..." />
              </template>
              <table-query v-show="showTable" />
            </v-wait>
          </b-col>
        </b-row>
      </b-col>
      <b-col>
        <b-row>
          <b-col>
            <interface-query-options :title="'Options'" />
          </b-col>
        </b-row>
        <hr />
        <b-row>
          <b-col>
            <b-btn :variant="ready" @click="genQuote" :block="true">Generate Quote</b-btn>
          </b-col>
        </b-row>
        <br />
        <b-row>
          <b-col>
            <b-btn variant="warning" :block="true" to="/">Back</b-btn> 
          </b-col>
          <b-col>
            <b-btn variant="primary" @click="clearForm" :block="true">Clear</b-btn>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <notice-points />
  </b-container>
</template>

<script>
import InterfaceQueryPoint from '@/components/InterfaceQueryPoint';
import InterfaceQueryOptions from '@/components/InterfaceQueryOptions';
import TableQuery from '@/components/TableQuery';
import NoticePoints from '@/components/NoticePoints';
import Spinner from 'vue-simple-spinner';

// TODO: Add autocomplete to origin/destination input fields pulling data from the server based on collected entries entered more than 5 times.

export default {
  name: 'query',
  data() {
    return {
      showTable: false,
      showError: false
    }
  },
  computed: {
    readyCheck () {
      return this.$store.getters['QuoteGen/routeReady'];
    },
    resendRoute () {
      return this.$store.state.QuoteGen.resendRoute;
    },
    ready () {
      return (!this.readyCheck) ? 'success' : 'danger';
    }
  },
  watch: {
    resendRoute (value) {
      if (value) {
        this.$store.commit('QuoteGen/resetResendRouteFlag')
        this.genQuote();
      }
    }
  },
  methods: {
    genQuote () {
      if (!this.readyCheck) {
        this.$wait.start('generating quotes');
        this.showTable = true;
        this.$store.dispatch('QuoteGen/sendCurrentRoute')
          .then(result => {
            this.showTable = result;
            this.$wait.end('generating quotes');
          });
      } else {
        const err = new Error(this.readyCheck);
        err.code = 'VALERROR';
        this.$store.commit('QuoteGen/localError', err);
      }
    },
    clearForm () {
      this.$store.commit('QuoteGen/clearRoute');
      this.showTable = false;
    }
  },
  components: {
    InterfaceQueryPoint,
    InterfaceQueryOptions,
    TableQuery,
    NoticePoints,
    Spinner
  }
}
</script>

<style scoped>

</style>
