<template>
	<v-menu
    :dark="dark"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="100"
    offset-x
   >
    <v-avatar slot="activator" size="37"> <img src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/778640/800/600/m1/fpnw/wm0/1raccl-.png?1447525058&s=09c2e1c4c7980006ef5ca3bff3f6bac2" alt=""> </v-avatar>
    <v-card>
      <v-list>
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/778640/800/600/m1/fpnw/wm0/1raccl-.png?1447525058&s=09c2e1c4c7980006ef5ca3bff3f6bac2" alt="John">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>julianmnst</v-list-tile-title>
            <v-list-tile-sub-title>Julian Mansueto</v-list-tile-sub-title>
            <v-list-tile-sub-title class="px-3 hidden-lg-and-up">97.021 <strong>FMD</strong></v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn
              icon
              class="grey--text darken-3"
              @click=""
            >
              <v-icon>highlight</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon> account_circle </v-icon>
          </v-list-tile-action>
          <v-list-tile-title>Profile</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="">
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

export default {
  name: 'profile-popover',
  props: [
    'profile',
    'dark'
  ],
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