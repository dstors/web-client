<template>
  <v-app
    :dark="dark">
    <slot name="messenger"></slot>
    <slot name="store-manager"></slot>
    <v-toolbar
      app
      :absolute="absolute"
      :color="dark ? darkColor : color"
      :flat="flat"
      :extended="extended"
      :clipped-left="clippedLeft">
      <v-toolbar-side-icon @click.stop="extended = !extended"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" style="text-decoration: none; color: black;">
          D<strong>stors</strong>
        </router-link>
      </v-toolbar-title>
      <v-flex>
        <v-text-field
          class="pa-3 hidden-sm-and-down"
          solo
          width="30px"
          height="10px"
          flat
          hide-details
          label="Search"
          prepend-inner-icon="search">
	      </v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn v-if="!loggedIn"
        :flat="loginStyle.flat"
        :color="loginStyle.color"
        :outline="loginStyle.outline"
        to="/signin">
        <!-- :href="loginUrl" -->
        Login
      </v-btn>
      <div v-else>
        <v-layout
          fluid align-start
          pa-3>
          <!-- <template>
            <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
              <cart-popover :cart="cart"></cart-popover>
            </v-flex>
          </template>
          <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
            <messages-popover :messages="messages"></messages-popover>
          </v-flex>
          <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
            <notifications-popover :notifications="notifications"></notifications-popover>
          </v-flex> -->
          <profile-popover class="px-3 d-inline-flex"></profile-popover>
        </v-layout>
      </div>

      <v-flex xs12 slot="extension" v-if="config">
        <v-tabs centered v-model="tab" color="amber lighten-3">
          <v-tabs-slider color="amber"></v-tabs-slider>
          <v-tab v-for="(t, i) in config.tabs" :key="i">
            {{ t.name }}
          </v-tab>
        </v-tabs>
      </v-flex>
      <template v-else-if="extended" slot="extension">
        <v-slide-y-transition>
          <v-layout row wrap>
            <v-flex>
              <v-menu open-on-hover bottom offset-y>
                <v-btn
                  slot="activator"
                  transparent
                  flat
                  :outline="navStyle.outline">
                  All
                </v-btn>

                <v-list>
                  <v-list-tile
                    v-for="(category, i) in categories"
                    :key="i"
                    @click="">
                    <v-list-tile-title>{{ category }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
            <v-flex>
              <v-menu
                class="hidden-sm-and-up"
                open-on-hover bottom offset-y>
                <v-btn
                  slot="activator"
                  transparent
                  flat
                  :outline="navStyle.outline">
                  Sort by
                </v-btn>

                <v-list>
                  <v-list-tile
                    v-for="(filter, i) in filters"
                    :key="i"
                    @click="">
                    <v-list-tile-title>{{ filter }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
            <v-flex
              v-for="(filter, i) in filters"
              :key="i">
              <v-btn
                flat
                :class="i > 1 ? 'hidden-sm-and-down' : 'hidden-xs-only'"
                :outline="navStyle.outline"
                v-on:click="">{{ filter }}
              </v-btn>
            </v-flex>
          </v-layout>
        </v-slide-y-transition>
      </template>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ProfilePopover from './components/ProfilePopover';

export default {
  components: { ProfilePopover },
  name: 'app',
  data() {
    return {
      navbar: false,
      extended: false,
    }
  },
  computed: {
    ...mapState({
      loggedIn: state => state.loggedIn,
      loginUrl: state => state.scLoginUrl,
      filters: state => state.filters,
      categories: state => state.categories,
      config: state => state.config,
      dark: state => state.styles.dark,
      absolute: state => state.styles.absolute,
      darkColor: state => state.styles.darkColor,
      color: state => state.styles.color,
      flat: state => state.styles.flat,
      clippedLeft: state => state.styles.clippedLeft,
      loginStyle: state => state.styles.login,
      navStyle: state => state.styles.nav
    })
  },
  watch:{
    $route (to, from){
      this.navbar = to.name !== 'Landing';
    }
  },
  mounted() {
    this.$store.dispatch('authenticate', { steemAccess: this.$store.steemAccess });
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