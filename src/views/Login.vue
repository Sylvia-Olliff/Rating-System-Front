<template>
  <b-jumbotron header="Rating System" lead="Please Login using your AS400 Username and Password">
    <b-form @submit.prevent="onSubmit">
      <b-form-group id="usernameGroup">
        <b-container>
          <b-row>
            <hr>
          </b-row>
          <b-row>
            <b-col cols="4"></b-col>
            <b-col cols="4">
              <input-username label="Username" v-model="username" />
              <br />
              <input-password label="Password" v-model="password" />
              <br />
              <b-button type="submit" variant="primary">Submit</b-button>
            </b-col>
            <b-col cols="4"></b-col>
          </b-row>
        </b-container>
      </b-form-group>
    </b-form>
  </b-jumbotron>
</template>

<script>
import InputUsername from '@/components/InputUsername';
import InputPassword from '@/components/InputPassword';

export default {
  name: 'login',
  data() {
    return {
      username: '',
      password: ''
    };
  },
  beforeMount() {
    if (this.$store.state.user.isLoggedIn) this.$router.push('home');
  },
  methods: {
    onSubmit () {
      this.$store.dispatch('login', { username: this.username, password: this.password })
        .then(() => {
          this.username = '';
          this.password = '';
          this.$router.push('home');
        });
    }
  },
  components: {
    InputUsername,
    InputPassword
  }
}
</script>
