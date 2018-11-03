<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <banner :src="profile.cover_image"></banner>
        <!-- <v-card-media :src="profile.cover_image" height="250px"></v-card-media> -->
        <v-flex xs12 style="position: relative; bottom: 80px; left: 30px;">
          <avatar :src="profile.profile_image" size="120"></avatar>
          <span class="display-1 font-weight-light pa-1" style="position: relative; bottom: 80px; color: black;">
            {{ profile.realName || profile.username }} {{ profile.reputation ? '- (' + profile.reputation + ')' : '' }}
            <span class="title font-weight-light" style="position: relative; left: 127px; bottom: 5px;">
              <br>
              {{ profile.about }}
            </span>
          </span>
        </v-flex>
        <v-flex xs12 style="float: right; bottom: 150px; position: relative; z-index: 999;">
          <v-btn :to="`/s/${profile.username}`" flat>Go to Store</v-btn>
        </v-flex>
        <v-layout row wrap :style="{'position': 'relative', 'bottom': '100px'}">
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
import ProductStepper from './ProductStepper';
import Banner from './Banner';
import Avatar from './Avatar';

export default {
  components: {
    Wallet,
    AccountInfo,
    Wishlist,
    FormLayout,
    ProductForm,
    ProductStepper,
    Banner,
    Avatar
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
          color: '#4C678C',
          link: 'details'
        },
        {
          label:'Wishlist',
          value: 'wishlist',
          icon: ['fas', 'bookmark'],
          color: '#d46a6a',
          link: 'wishlist'
        },
        {
          label:'Wallet',
          value: 'wallet',
          icon: ['fas', 'wallet'],
          color: '#629833',
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