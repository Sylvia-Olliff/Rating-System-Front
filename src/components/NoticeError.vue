<template>
  <div></div>
</template>

<script>
import { genErrorMessage } from '@/services/ErrorMessageHandler';

export default {
    name: 'notice-error',
    data () {
      return {
        message: '',
        title: '',
        show: false
      }
    },
    computed: {
      generalErrorOccured () {
        return this.$store.state.global.errors[this.$store.state.global.errors.length - 1];
      },
      errorOccuredQuote () {
        return this.$store.state.QuoteGen.errors[this.$store.state.QuoteGen.errors.length - 1];
      },
      localErrorOccurredQuote () {
        return this.$store.state.QuoteGen.localErrors[this.$store.state.QuoteGen.localErrors.length - 1];
      },
      errorOccuredMaintenance () {
        return this.$store.state.Maintenance.errors[this.$store.state.Maintenance.errors.length - 1];
      },
      localErrorOccurredMaintenance () {
        return this.$store.state.Maintenance.localErrors[this.$store.state.Maintenance.localErrors.length - 1];
      },
      errorOccuredMaintenanceLTL () {
        return this.$store.state.MaintenanceLTL.errors[this.$store.state.MaintenanceLTL.errors.length - 1];
      },
      localErrorOccurredMaintenanceLTL () {
        return this.$store.state.MaintenanceLTL.localErrors[this.$store.state.MaintenanceLTL.localErrors.length - 1];
      }
    },
    watch: {
      generalErrorOccured (value) {
        const message = genErrorMessage(value);
        this.$alertify.alert('ERROR!', message);
      },
      errorOccuredQuote (value) {
        const message = genErrorMessage(value);
        this.$alertify.alert('ERROR!', message);
      },
      localErrorOccurredQuote (value) {
        const message = genErrorMessage(value);
        this.$alertify.alert('WARNING!', message);
      },
      errorOccuredMaintenance (value) {
        const message = genErrorMessage(value);
        this.$alertify.alert('ERROR!', message);
      },
      localErrorOccurredMaintenance (value) {
        const message = genErrorMessage(value);
        this.$alertify.alert('WARNING!', message);
      },
      errorOccuredMaintenanceLTL (value) {
        const message = genErrorMessage(value);
        this.$alertify.alert('ERROR!', message);
      },
      localErrorOccurredMaintenanceLTL (value) {
        const message = genErrorMessage(value);
        this.$alertify.alert('WARNING!', message);
      }
    }
}
</script>
