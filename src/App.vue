<template>
  <!-- <landing-page v-if="!navbar"></landing-page> -->
  <v-app id="inspire">
    <!-- Reemplazar navigation-drawer por filters -->
    <!-- <filters-drawer></filters-drawer> -->
    <!-- mover toolbar a su propio archivo y amoldar la búsqueda - hay que meterle a eso pa buscar por tag o por usuario o, quizás, por contenido. -->
    <v-toolbar v-if="navbar" color="amber" app clipped-left prominent :extended="extended">
      <v-toolbar-side-icon @click.native="extended = !extended"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Steem&nbsp;<span class="text">FleaMarket</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.access_token" :href="$store.state.scLoginUrl">Login</v-btn>
      <div v-else>
        <v-avatar> <img :src="$store.state.profile.profile_image" alt=""> </v-avatar>
        <v-btn to="/profile" flat transparent>  {{ $store.state.profile.name }}</v-btn>
        <v-btn v-on:click="$store.commit('logout')">Logout</v-btn>
      </div>
      <template slot="extension">
        <div>
          <v-menu open-on-hover bottom offset-y>
            <v-btn
              slot="activator"
              transparent
              flat
            >
              Categories
            </v-btn>

            <v-list>
              <v-list-tile
                @click=""
              >
                <v-list-tile-title>Categories</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
          <v-menu open-on-hover bottom offset-y>
            <v-btn
              slot="activator"
              transparent
              flat
            >
              Categories
            </v-btn>

            <v-list>
              <v-list-tile
                @click=""
              >
                <v-list-tile-title>Categories</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-toolbar>
    <!-- Esto por ahora esta bien acá -->
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center>
          <v-flex shrink>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Landing from './components/Landing.vue'
import FiltersDrawer from './components/Browser/FiltersDrawer.vue'

export default {
  name: 'app',
  components: {
    'landing-page': Landing,
    'filters-drawer': FiltersDrawer
  },
  data() {
    return {
      navbar: false,
      extended: false
    }
  },
  watch:{
    $route (to, from){
      this.navbar = to.name !== 'Landing';
    }
  },
  mounted() {
    this.navbar = this.$router.currentRoute.name !== 'Landing';
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
body {
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
}
#keep main .container {
    height: 660px;
  }
  .v-navigation-drawer__border {
    display: none;
  }
  .text {
    font-weight: 400;
  }
</style>