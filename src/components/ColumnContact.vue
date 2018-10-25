<template>
  <div class="text-center">
    <b-btn v-b-tooltip.hover
           :variant="variant"
           :title="tooltipTitle"
           :href="email">
      {{ buttonTitle }}
    </b-btn> 
  </div>
</template>

<script>
export default {
  name: 'column-contact',
  props: {
    rowData: {
      type: Object
    },
    field: {
      type: String
    },
    index: {
      type: Number
    }
  },
  computed: {
    tooltipTitle () {
      return this.rowData.getContactTooltipBase();
    },
    email () {
      return this.rowData.setupEmail();
    },
    buttonTitle () {
      return this.rowData.contactInfo;
    },
    variant () {
      return this.rowData.variant;
    }
  }
}
</script>
