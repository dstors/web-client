<template>
  <v-app
    :dark="styles.dark">
    <slot name="messenger"></slot>
    <slot name="store-manager"></slot>
    <v-toolbar
      app
      :absolute="styles.absolute"
      :color="styles.dark ? styles.darkColor : styles.color"
      :flat="styles.flat"
      :extended="extended"
      :clipped-left="styles.clippedLeft"
      >
      <v-toolbar-side-icon @click.stop="extended = !extended"></v-toolbar-side-icon>
      <v-toolbar-title>mango<strong>way</strong></v-toolbar-title>
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
        <v-layout
          fluid align-start
          pa-3>
          <template>
            <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
              <cart-popover :cart="appState.cart"></cart-popover>
            </v-flex>
          </template>
          <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
            <messages-popover :messages="appState.messages"></messages-popover>
          </v-flex>
          <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
            <notifications-popover :notifications="appState.notifications"></notifications-popover>
          </v-flex>
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
                  :outline="styles.nav.outline">
                  All
                </v-btn>

                <v-list>
                  <v-list-tile
                    v-for="(category, i) in appState.categories"
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
                  :outline="styles.nav.outline">
                  Sort by
                </v-btn>

                <v-list>
                  <v-list-tile
                    v-for="(filter, i) in appState.filters"
                    :key="i"
                    @click="">
                    <v-list-tile-title>{{ filter }}</v-list-tile-title>
                  </v-list-tile>
                </v-list>
              </v-menu>
            </v-flex>
            <v-flex
              v-for="(filter, i) in appState.filters"
              :key="i">
              <v-btn
                flat
                :class="i > 1 ? 'hidden-sm-and-down' : 'hidden-xs-only'"
                :outline="styles.nav.outline"
                v-on:click="">{{ filter }}
              </v-btn>
            </v-flex>
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
import MessagesPopover from "./MessagesPopover";
import NotificationsPopover from "./NotificationsPopover";
import CartPopover from "./CartPopover";

export default {
  components: {
    MessagesPopover,
    NotificationsPopover,
    ProfilePopover,
    CartPopover
  },
  name: 'layout',
  props: [
    'appState',
    'posts',
    'styles',
    'tabs',
    'config',
    'tab'
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