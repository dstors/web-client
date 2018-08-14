<template>
  <!-- <landing-page v-if="!navbar"></landing-page> -->
  <v-app id="inspire">
    <!-- mover toolbar a su propio archivo y amoldar la búsqueda - hay que meterle a eso pa buscar por tag o por usuario o, quizás, por contenido. -->
    <v-toolbar fixed color="amber" app :dense="!extended" :extended="extended">
      <v-toolbar-side-icon @click.native="extended = !extended"></v-toolbar-side-icon>
      <v-btn flat transparent class="title ml-3 mr-5" to="/" active-class="">Steem&nbsp;<span class="text">FleaMarket</span></v-btn>
      <!-- <v-text-field
        solo-inverted
        flat
        hide-details
        label="Search"
        prepend-inner-icon="search"
      ></v-text-field> -->
      <v-spacer></v-spacer>
      <v-btn v-if="!$store.state.loggedIn" :href="$store.state.scLoginUrl">Login</v-btn>
      <div v-else>
        <v-avatar> <img :src="$store.state.profile.profile_image" alt=""> </v-avatar>
        <v-btn to="/profile" flat transparent>  {{ $store.state.profile.name }}</v-btn>
        <v-btn v-on:click="$store.commit('logout')">Logout</v-btn>
      </div>
      <template v-if="extended" slot="extension">
        <v-slide-y-transition>
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
                  v-for="(tag, i) in $store.state.tags"
                  :key="i"
                  @click="changeTag(tag.name)"
                >
                  <v-list-tile-title>{{ tag.name }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-btn flat
              v-for="(filter, i) in $store.state.filters"
              :key="i"
              v-on:click="changeFilter(filter.value)">{{ filter.label }}
            </v-btn>
          </div>
        </v-slide-y-transition>
      </template>
    </v-toolbar>
    <!-- Esto por ahora esta bien acá -->
    <v-content>
      <v-container fluid fill-height class="grey lighten-4">
        <v-layout justify-center align-center>
          <v-flex shrink>
            <v-alert
              :value="$store.alertMessage"
              type="error"
              icon="warning"
              outline
              transition="scale-transition"
              dismissible
            >
              {{ $store.alertMessage }}
            </v-alert>
            <router-view></router-view>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Landing from './components/Landing.vue'

export default {
  name: 'app',
  components: {
    'landing-page': Landing,
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
    if (this.$store.state.loggedIn) {
      this.$store.dispatch('getProfile')
    }
  },
  methods: {
    changeTag(tag) {
      this.$store.dispatch('changeTag', { newTag: tag })
    },
    changeFilter(filter) {
      this.$store.dispatch('changeFilter', { newFilter: filter })
    }
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