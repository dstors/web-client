<template>
  <landing-page v-if="!navbar"></landing-page>
  <v-app v-else id="inspire">
    <!-- Reemplazar navigation-drawer por filters -->
    <filters-drawer></filters-drawer>
    <!-- mover toolbar a su propio archivo y amoldar la búsqueda - hay que meterle a eso pa buscar por tag o por usuario o, quizás, por contenido. -->
    <v-toolbar v-if="navbar" color="amber" app clipped-left>
      <v-toolbar-side-icon @click.native="$store.commit('toggleDrawer')"></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Steem&nbsp;<span class="text">FleaMarket</span></span>
      <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field>
      <v-spacer></v-spacer>
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