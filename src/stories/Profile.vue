<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <v-card-media :src="profile.profile_image" height="200px"></v-card-media>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>{{ profile.real_name }} - ({{ profile.reputation }})</v-list-tile-sub-title>
              <v-list-tile-title>{{ profile.description }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12>
            <v-tabs v-model="tab">
              <v-tabs-slider color="amber"></v-tabs-slider>
              <v-tab v-for="(item, i) in items" :key="i">
                <v-icon :color="item.color" class="px-2">
                  {{ item.icon }}
                </v-icon>
                {{ item.label }}
              </v-tab>
              <v-spacer></v-spacer>
              <v-tab>
                <v-btn block color="yellow darken-1" outline>
                  <span class="black--text">
                    DStore
                  </span>
                  <v-icon right color="yellow darken-3">
                    store
                  </v-icon>
                </v-btn>
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-flex xs12>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(item, i) in items" :key="i">
                <!-- <v-card flat> -->
                  <component
                    :bookmarks="profile.bookmarks"
                    :profile="profile"
                    :is="item.value"></component>
                <!-- </v-card> -->
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
          </v-tabs>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import Wallet from './Wallet';
import AccountInfo from './AccountInfo';
import Bookmarks from './Bookmarks';

export default {
  components: {
    Wallet,
    AccountInfo,
    Bookmarks
  },
  name: 'profile',
  props: [
    'profile',
    'dark'
  ],
  data() {
    return {
      tab: null,
      items: [
        {
          label:'Account Info',
          value: 'account-info',
          icon: 'account_circle',
          color: 'blue'
        },
        {
          label:'Bookmarks',
          value: 'bookmarks',
          icon: 'bookmark',
          color: 'pink darlen-1'
        },
        {
          label:'Wallet',
          value: 'wallet',
          icon: 'account_balance_wallet',
          color: 'green'
        }
      ]
    }
  }
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>