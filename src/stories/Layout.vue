<template>
  <v-app
    :dark="styles.dark">
    <v-toolbar
      lights-out
      app
      scroll-off-screen
      :absolute="styles.absolute"
      :color="styles.color"
      :flat="styles.flat"
      :extended="extended"
      :clipped-left="styles.clippedLeft"
      >
      <v-toolbar-side-icon @click.stop="extended = !extended"></v-toolbar-side-icon>
      <v-toolbar-title>Steem&nbsp;<strong>FleaMarket</strong></v-toolbar-title>
      <v-flex>
        <v-text-field
          class="pa-3 hidden-sm-and-down"
          solo
          width="30px"
          height="10px"
          flat
          hide-details
          label="Search"
          prepend-inner-icon="search"
        ></v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn v-if="!appState.loggedIn"
        :flat="styles.login.flat"
        :color="styles.login.color"
        :outline="styles.login.outline"
        :href="appState.scLoginUrl">
        Login
      </v-btn>
      <div v-else>
        <span class="px-1 hidden-sm-and-down">
          <v-badge overlap bottom>
            <span slot="badge">6</span>
            <v-icon
              color="grey darken-2"
            >
              shopping_cart
            </v-icon>
          </v-badge>
        </span>
        <span class="px-1 hidden-sm-and-down">
          <v-badge overlap bottom color="red">
            <span slot="badge">2</span>
            <v-icon
              color="grey darken-2"
            >
              mail
            </v-icon>
          </v-badge>
        </span>
        <span class="px-1 hidden-sm-and-down">
          <v-badge overlap bottom color="blue">
            <span slot="badge">1</span>
            <v-icon
              color="grey darken-2"
            >
              notifications
            </v-icon>
          </v-badge>
        </span>
        <span class="px-3 hidden-sm-and-down">
          <strong>97.021 FMD</strong>
        </span>
        <profile-popover></profile-popover>
      </div>

      <template v-if="extended" slot="extension">
        <v-slide-y-transition>
          <v-layout>
            <v-menu open-on-hover bottom offset-y>
              <v-btn
                slot="activator"
                transparent
                flat
                :outline="styles.nav.outline"
              >
                All
              </v-btn>

              <v-list>
                <v-list-tile
                  v-for="(category, i) in appState.categories"
                  :key="i"
                  @click=""
                >
                  <v-list-tile-title>{{ category }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-menu>
            <v-btn
              flat
              :outline="styles.nav.outline"
              v-for="(filter, i) in appState.filters"
              :key="i"
              v-on:click="">{{ filter }}
            </v-btn>
          </v-layout>
        </v-slide-y-transition>
      </template>
    </v-toolbar>
    <v-content>
      <slot></slot>
    </v-content>
  </v-app>
</template>

<script>
import ProfilePopover from "./ProfilePopover";

export default {
  components: { ProfilePopover },
  name: 'layout',
  props: [
    'appState',
    'posts',
    'styles'
  ],
  data() {
  	return {
  		extended: false,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-3' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      },
      menu: false
  	}
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>