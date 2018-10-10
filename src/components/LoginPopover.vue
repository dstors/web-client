<template>
	<v-menu
    :dark="dark"
    v-model="menu"
    :nudge-width="50"
    offset-x
   >
    <v-btn
      :flat="loginStyle.flat"
      :color="loginStyle.color"
      :outline="loginStyle.outline"
      slot="activator">
      Login
    </v-btn>
    <v-card>
      <v-list two-line>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Use your Steem or social media<br> account to login.</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <night-mode-btn></night-mode-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile :href="loginUrl">
          <v-list-tile-action>
            <img class="steem-icon" src="./assets/STEEM.svg" alt="SteemConnect">
          </v-list-tile-action>
          <v-list-tile-title>SteemConnect</v-list-tile-title>
        </v-list-tile>

        <v-list-tile href="http://localhost:8080/users/auth/facebook">
          <v-list-tile-action>
            <font-awesome-icon color="blue" :icon="['fab', 'facebook']"></font-awesome-icon>
          </v-list-tile-action>
          <v-list-tile-title>Facebook</v-list-tile-title>
        </v-list-tile>

        <v-list-tile href="http://localhost:8080/users/auth/google">
          <v-list-tile-action>
            <font-awesome-icon color="red" :icon="['fab', 'google']"></font-awesome-icon>
          </v-list-tile-action>
          <v-list-tile-title>Google</v-list-tile-title>
        </v-list-tile>
      </v-list>
      <v-divider light></v-divider>
      <v-card-actions>
        Don't have an account?
        <v-spacer></v-spacer>
        <a to="/sign-up"> Sign up</a>.
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';
import NightModeBtn from './Buttons/NightModeBtn';

export default {
  name: 'login-popover',
  components: {
    'night-mode-btn': NightModeBtn
  },
  computed: {
    ...mapState({
      loginUrl: state => state.scLoginUrl,
      dark: state => state.dark,
      loginStyle: state => state.styles.login
    })
  },
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true
    }
  },
  mounted() {
    this.$store.dispatch('setSCLoginUrl');
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
.steem-icon {
  fill: blue;
}
</style>