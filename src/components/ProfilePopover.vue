<template>
	<v-menu
    :dark="dark"
    v-model="menu"
    :close-on-content-click="true"
    :nudge-width="100"
    offset-x
   >
    <v-btn slot="activator" icon>
      <v-avatar size="40px">
        <img :src="profile.profile_image">
      </v-avatar>
    </v-btn>
    <v-card>
      <v-list two-line>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="profile.profile_image" alt="Prof Pic">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-sub-title>{{ profile.realName || profile.username }}</v-list-tile-sub-title>
            <v-list-tile-title v-if="profile.username">{{ profile.username }}</v-list-tile-title>
            <v-list-tile-sub-title v-if="profile.balance">{{ profile.balance }}</v-list-tile-sub-title>
            <v-list-tile-sub-title v-if="profile.sbd_balance">{{ profile.sbd_balance }}</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              class="grey--text darken-3"
              @click="$store.commit('toggleDark')"
            >
              <v-icon>highlight</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile exact to="/profile/">
          <v-list-tile-action>
            <v-icon> account_circle </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>

        <v-list-tile exact to="/profile/wishlist">
          <v-list-tile-action>
            <v-icon> bookmark </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Wishlist</v-list-tile-title>
        </v-list-tile>

        <v-list-tile exact to="/profile/wallet">
          <v-list-tile-action>
            <v-icon> account_balance_wallet </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Wallet</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$store.commit('logout')">
          <v-list-tile-action>
            <v-icon> arrow_back </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Logout</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'profile-popover',
  computed: {
    ...mapState({
      profile: state => state.profile,
      dark: state => state.dark
    })
  },
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>