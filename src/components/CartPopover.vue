<template>
	<v-menu
    :dark="dark"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="100"
    offset-x
    left
   >
    <template slot="activator">
      <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
        <v-badge bottom color="blue">
          <span slot="badge">{{ cart.length }}</span>
          <font-awesome-icon :color="dark ? 'white' : 'grey'" size="lg" :icon="['fas', 'shopping-cart']"></font-awesome-icon>
        </v-badge>
      </v-flex>
    </template>
    <v-card>
    <v-list color="amber">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Cart</v-list-tile-sub-title>
          <v-list-tile-title>You have {{ cart.length }} items in your cart</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-tooltip>
            <v-btn
              icon
              slot="activator"
              class="grey--text darken-3"
              to="/cart"
              @click="menu = false">
              <font-awesome-icon color="grey" size="lg" :icon="['fas', 'shopping-cart']"></font-awesome-icon>
            </v-btn>
            <span>Go to cart!</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line>
      <div class="cart-scroll">
        <template
          v-for="(product, i) in cart">

          <v-list-tile
            :key="i"
            avatar
            @click=""
          >
            <v-list-tile-avatar>
              <img :src="product.pictures[0]">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-sub-title> {{ product.author }} </v-list-tile-sub-title>
              <v-list-tile-title class="text--primary">
                {{ (product.name.length > 35) ? product.name.slice(0, 25) + '...' : product.name }}
              </v-list-tile-title>
              <v-list-tile-sub-title class="text--primary">
                {{ (product.description.length > 35) ? product.description.slice(0, 25) + '...' : product.description }}
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-action-text>{{ product.price }}</v-list-tile-action-text>
              <delete-form-cart-btn :product="product" :index="i" source="products"></delete-form-cart-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </div>
      <v-list-tile color="grey darken-3">
        <v-spacer></v-spacer>
        <v-list-tile-content>
          <v-list-tile-sub-title> Total</v-list-tile-sub-title>
          <v-list-tile-title>
            <span class="title" v-bind:style="{ color: dark ? 'white' : 'black' }">{{ total }} SBD</span>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import DeleteFromCartBtn from './Buttons/DeleteFromCartBtn';

export default {
  name: 'cart-popover',
  components: {
    'delete-form-cart-btn': DeleteFromCartBtn
  },
  data() {
    return {
      menu: false,
    }
  },
  computed: {
    ...mapState({
      cart: state => state.cart,
      dark: state => state.styles.dark
    }),
    ...mapGetters({
      total: 'cartTotal'
    })
  },
  beforeCreate() {
    if (this.$store.state.loggedIn) {
      this.$store.dispatch('getCart')
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
.cart-scroll {
  overflow-y: scroll;
  max-height: 250px;
}
</style>