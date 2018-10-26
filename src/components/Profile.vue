<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <v-card-media :src="profile.cover_image" height="250px"></v-card-media>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ profile.realName || profile.username }} {{ profile.reputation ? '- (' + profile.reputation + ')' : '' }}</v-list-tile-sub-title>
              <v-list-tile-title>{{ profile.about }}</v-list-tile-title>
              <!-- <v-spacer></v-spacer> -->
            </v-list-tile-content>
            <v-list-tile-action>
              <form-layout>
                <v-btn slot="activator" block color="primary" class="pl-3 pr-2">
                  <span class="black--text">
                    Create Offer
                  </span>
                  <v-icon right>
                    queue
                  </v-icon>
                </v-btn>
                <product-form>
                </product-form>
              </form-layout>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-btn block color="yellow darken-1" class="pl-3 pr-2">
                  <span class="black--text">
                    DStore
                  </span>
                  <v-icon right color="blue darken-3">
                    store
                  </v-icon>
                </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-tabs v-model="tab">
              <v-tabs-slider :color="dark ? 'white' : 'black'"></v-tabs-slider>
              <v-tab :to="`${item.link}`" v-for="(item, i) in items" :key="i">
                <font-awesome-icon :icon="item.icon" size="lg" class="mx-2" :color="item.color">
                </font-awesome-icon>
                {{ item.label }}
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-flex xs12>
            <v-tabs-items v-model="tab">
              <!-- <v-tab-item v-for="(item, i) in items" :key="i">
                <component
                  :bookmarks="profile.bookmarks"
                  :profile="profile"
                  :is="item.value"></component>
              </v-tab-item> -->
              <router-view></router-view>
            </v-tabs-items>
          </v-flex>
          </v-tabs>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

import Wallet from './Wallet';
import AccountInfo from './AccountInfo';
import Wishlist from './Wishlist';
import FormLayout from './FormLayout';
import ProductForm from './ProductForm';

export default {
  components: {
    Wallet,
    AccountInfo,
    Wishlist,
    FormLayout,
    ProductForm
  },
  name: 'profile',
  data() {
    return {
      tab: null,
      items: [
        {
          label:'Account Info',
          value: 'account-info',
          icon: ['fas', 'user'],
          color: 'blue',
          link: 'details'
        },
        {
          label:'Wishlist',
          value: 'wishlist',
          icon: ['fas', 'bookmark'],
          color: 'pink',
          link: 'wishlist'
        },
        {
          label:'Wallet',
          value: 'wallet',
          icon: ['fas', 'wallet'],
          color: 'green',
          link: 'wallet'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      profile: state => state.profile,
      dark: state => state.styles.dark
    })
  }
}
</script>