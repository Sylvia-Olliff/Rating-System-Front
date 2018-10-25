<template>
  <div>
    <ModalPoints :label="orgListTitle" :list="orgList" v-on:selected="resetOrgList" />
    <ModalPoints :label="desListTitle" :list="desList" v-on:selected="resetDesList" />
  </div>
</template>

<script>
import ModalPoints from '@/components/ModalPoints';

export default {
  name: 'notice-points',
  data () {
    return {
      id: '',
      orgListTitle: 'Origin List',
      desListTitle: 'Destination List'
    }
  },
  computed: {
    orgList () {
      return this.$store.state.QuoteGen.response.lists.orgList;
    },
    desList () {
      return this.$store.state.QuoteGen.response.lists.desList;
    }
  },
  watch: {
    orgList (value) {
      if (value) {
        this.orgData = value;
        this.showOrgList = true;
      }
    },
    desList (value) {
      if (value) {
        this.desData = value;
        this.showDesList = true;
      }
    }
  },
  methods: {
    resetOrgList () {
      this.$store.commit('QuoteGen/resetOriginList');
    },
    resetDesList () {
      this.$store.commit('QuoteGen/resetDestinationList');
    }
  },
  components: {
    ModalPoints
  }
}
</script>
