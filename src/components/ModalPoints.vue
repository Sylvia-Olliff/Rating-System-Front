<template>
  <b-modal 
    ref="pointsNoticeQuote" 
    :title="id"
    header-bg-variant="info"
    header-text-variant="light"
    centered
    busy>
      <TablePointList :list="list" v-on:selected-point="passAlong" />
      <hr>
  </b-modal>
</template>

<script>
import TablePointList from '@/components/TablePointList';

export default {
  name: 'modal-points',
  props: {
    label: String,
    list: Array,
  },
  data () {
    return {
      id: this.label
    }
  },
  computed: {
    display () {
      return this.$store.state.QuoteGen.response.hasList;
    }
  },
  watch: {
    display (value) {
      if (value) this.$refs.pointsNoticeQuote.show();
      else this.$refs.pointsNoticeQuote.hide();
    }
  },
  methods: {
    passAlong () {
      this.$emit('selected', true);
    }
  },
  components: {
    TablePointList
  }
}
</script>

