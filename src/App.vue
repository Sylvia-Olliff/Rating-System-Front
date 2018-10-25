<template>
  <div id="app">
    <Navbar :title="navTitle" :userAccounts="userAccounts" :userActions="userActions" :navPoints="navPoints" />
    <router-view/>
    <notice-error />
    <notice-message />
    <modal-user-settings :display="showSettingsMenu" v-on:closed="closeUserSettingsMenu"/>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar";
import NoticeMessage from "@/components/NoticeMessage";
import NoticeError from "@/components/NoticeError";
import ModalUserSettings from "@/components/ModalUserSettings";
import { userActions } from "@/config/Settings";
import { init } from "@/services/InitApp";

export default {
  data() {
    return {
      navTitle: "Rating System",
      userAccounts: true,
      userActions
    };
  },
  computed: {
    navPoints() {
      return this.$store.state.user.points;
    },
    showSettingsMenu: {
      get() {
        return this.$store.state.global.showUserSettings;
      },
      set(value) {
        this.$store.state.global.showUserSettings = value;
      }
    }
  },
  beforeMount() {
    this.initApp();
  },
  methods: {
    initApp() {
      init()
        .then(async initData => {
          try {
            this.$store.state.global.customers = initData.customers;
            this.$store.state.global.precs = initData.precs;
            this.$store.state.global.carriers = initData.carriers;
            // this.$store.state.QuoteGen.citySuggestions = initData.suggestions;
            if (initData.userData) {
              await this.$store.dispatch("userVerified", initData.userData);
              this.$router.replace('/home');
            }
          } catch (err) {
            this.$store.commit("error", err);
          }
          // this.$store.state.Maintenance.searchResults = initData.lanes;
          // this.$store.dispatch('loadApp', initData)
          //   .then(() => {
          //     this.$store.commit('Maintenance/searchResults', initData.lanes);
          //   });
        })
        .catch(err => {
          this.$store.commit("error", err);
        });
    },
    closeUserSettingsMenu() {
      this.$store.state.global.showUserSettings = false;
    }
  },
  components: {
    Navbar,
    NoticeMessage,
    NoticeError,
    ModalUserSettings
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
