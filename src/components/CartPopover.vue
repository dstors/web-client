<template>
	<v-menu
    :dark="dark"
    v-model="menu"
    :close-on-content-click="true"
    :nudge-width="100"
    offset-x
    left
   >
    <template slot="activator">
      <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
        <v-badge bottom color="blue">
          <span slot="badge">{{ cart.length }}</span>
          <font-awesome-icon color="grey" size="lg" :icon="['fas', 'shopping-cart']"></font-awesome-icon>
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
              @click=""
            >
              <font-awesome-icon color="grey" size="lg" :icon="['fas', 'shopping-cart']"></font-awesome-icon>
            </v-btn>
            <span>Go to cart!</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line>
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
            <font-awesome-icon color="grey" size="lg" :icon="['fas', 'trash']"></font-awesome-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-list-tile>
        <v-spacer></v-spacer>
        <v-list-tile-content>
          <v-list-tile-sub-title> Total</v-list-tile-sub-title>
          <v-list-tile-title>
            <h2>{{ total }} SBD</h2>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
  </v-menu>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: 'cart-popover',
  props: [
    'cart',
  ],
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
    this.$store.dispatch('getCart')
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>