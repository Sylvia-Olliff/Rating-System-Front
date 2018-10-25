<template>
  <b-navbar toggleable="md" type="dark" variant="info" :sticky="true" fixed="top">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/home" id="brand">{{ label }}</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item v-for="point in points" :key="point.to" :active-class="'bg-success'" :to="point.to" v-b-popover.hover.bottom="point.popText" :title="point.popTitle">{{ point.display }}</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right>
            <template slot="button-content">
              <em v-if="accounts">Account</em>
            </template>
            <b-dropdown-item-button v-for="action in actions" :key="action.name" v-on:click="submitAction(action.name)">{{ action.display }}</b-dropdown-item-button>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: 'navigation-bar',
  props: {
    title: String,
    userAccounts: Boolean,
    userActions: Array,
    navPoints: {
      validator: function (value) {
        // navPoints should be an Array with at least one element and that element should be an Object with the properties to, and display
        if (!value) return true;
        return (value instanceof Array && value.length >= 1 && typeof value[0] === 'object' && Object.keys(value[0]).includes('to') && Object.keys(value[0]).includes('display'));
      }
    }
  },
  data() {
    return {
      label: this.title,
      accounts: this.userAccounts,
      actions: this.userActions,
      points: this.navPoints
    }
  },
  watch: {
    userActions (value) {
      this.actions = value;
    },
    navPoints (value) {
      this.points = value;
    }
  },
  methods: {
    submitAction (actionName) {
      this.actions
        .filter(action => (action.name === actionName))[0]
        .func(this)
        .catch(err => { this.$store.commit('error', err); });
    }
  }
}
</script>

<style scoped>
  #brand {
    padding-right: 3em;
  }
</style>

