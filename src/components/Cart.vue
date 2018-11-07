<template>
  <v-container class="pa-5" fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card v-if="cart.length > 0">
        <div class="headline pl-5" style="padding-top: 40px;">Cart</div>
        <div class="title pl-5 font-weight-thin">
          You have {{ cart.length }} items in your cart. Please carefully verify the list before buying.
        </div>

        <v-layout column wrap class="pa-5">
          <v-flex xs12>
            <v-list three-line>
              <template
                v-for="(product, i) in cart">
                <v-divider v-if="i === 0"></v-divider>
                <v-list-tile
                  style="height: 222px; padding-top: 45px;"
                  :key="i"
                  avatar>
                  <v-list-tile-avatar size="180" tile style="padding-top: 50px;">
                    <img :src="product.pictures[0]">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title class="title" :title="product.name">
                      <router-link
                        :style="{'text-decoration': 'none', color: dark ? 'white' : 'black', 'padding': '35px'}"
                        :to="`/product/details/${product.id}`">
                        {{ product.name.length > 57 ? product.name.slice(0, 57) + '...' : product.name }}
                      </router-link>
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="blue--text" style="padding-left: 10px; padding-top: 10px;">
                          <!-- <bookmark-btn
                            :index="i"
                            :product="product">
                          </bookmark-btn> -->
                          <details-popup
                            :product="product"
                            :hovered="true">
                          </details-popup>
                          <delete-form-cart-btn
                            :product="product"
                            :index="i">
                          </delete-form-cart-btn>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action style="width: 300px;">
                    <h3 class="display-1 font-weight-light">
                      {{ (product.priceValue * product.amount) + ' ' + product.currency }}
                    </h3>
                    <div :style="{  'float': 'right' }">
                      <product-amount
                        @deletefromcart="deleteFromCart({ id: product.id })"
                        v-model="product.amount">
                      </product-amount>
                    </div>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="i + 1 < cart.length"></v-divider>
              </template>
            </v-list>
          </v-flex>
          <v-flex xs12>
            <v-divider></v-divider>
            <div :style="{ 'float': 'right', 'width': '50%', 'padding-top': '30px' }">
              <v-layout row wrap>
                <v-flex xs12>
                  <span class="display-1 font-weight-light">Total:</span>
                </v-flex>
              </v-layout>
              <v-layout row class="mt-3" wrap v-for="(t, currency) in total">
                <v-flex xs7>
                  <span
                    :style="{ float: 'right', 'margin-right': '15px' }"
                    class="display-1"> {{ total[currency] }} </span>
                </v-flex>
                <v-flex xs5>
                  <span class="display-1 font-weight-light"> {{ currency }}</span>
                  <!-- <span class="display-2">
                    {{ total[currency] }}
                  </span> -->
                </v-flex>
              </v-layout>
              <!-- <v-layout v-if="sbdBalance" row wrap style="padding-top: 10px;">
                <v-flex xs6>
                  <span class="title font-weight-light">Current SBD balance:</span>
                </v-flex>
                <v-flex xs6>
                  <span class="title">{{ sbdBalance }}</span>
                </v-flex>
              </v-layout> -->
            </div>
          </v-flex>
          <v-divider></v-divider>
          <v-flex xs12>
            <div :style="{ 'float': 'right', 'width': '70%', 'padding-right': '100px', 'padding-top': '30px' }">
              <v-btn color="primary" class="font-weight-light display-1" :style="{ 'float': 'right', 'width': '25%', 'height': '50px' }">
                Buy now
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
      <v-card v-else>
        <v-layout column wrap class="pa-5">
          <v-flex xs12>
            <div :style="{ 'text-align': 'center', 'padding-top': '0px' }">
              <v-layout row wrap>
                <v-flex xs12>
                  <div>
                    <img style="height: 250px;" :src="dstorsLogo" alt="DStors.com">
                  </div>
                  <div class="display-3 font-weight-light">
                    Your cart is empty
                  </div>
                  <br>
                  <div class="display-1 font-weight-light">
                    Still don't know what to buy?
                    <router-link to="/">
                      Check out out hottest products!
                    </router-link>
                  </div>
                </v-flex>
              </v-layout>
            </div>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import DetailsPopup from './DetailsPopup.vue';
import {
  mapState,
  mapGetters,
  mapActions
} from 'vuex';
import DeleteFromCartBtn from './Buttons/DeleteFromCartBtn';
import BookmarkBtn from './Buttons/BookmarkBtn';
import ProductAmount from './ProductAmount';
import dstorsLogo from './assets/DSTORS-LOGO.png';

export default {
  components: {
    'details-popup': DetailsPopup,
    'delete-form-cart-btn': DeleteFromCartBtn,
    'bookmark-btn': BookmarkBtn,
    'product-amount': ProductAmount
  },
  name: 'cart',
  computed: {
    ...mapState({
      cart: state => state.cart,
      dark: state => state.styles.dark,
      sbdBalance: state => state.profile.sbd_balance
    }),
    ...mapGetters({
      total: 'cartTotal'
    }),
    dstorsLogo() {
      return dstorsLogo;
    }
  },
  methods: {
    ...mapActions({
      deleteFromCart: 'deleteFromCart'
    })
  },
  data() {
    return {
      hovered: false
    }
  }
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>