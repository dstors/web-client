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
        <v-badge overlap bottom color="blue">
          <span slot="badge">2</span>
          <v-icon
            color="grey darken-2"
          >
            shopping_cart
          </v-icon>
        </v-badge>
      </v-flex>
    </template>
    <v-card>
    <v-list color="amber">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Cart</v-list-tile-sub-title>
          <v-list-tile-title>You have 2 items in your cart</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-tooltip>
            <v-btn
              icon
              slot="activator"
              class="grey--text darken-3"
              @click=""
            >
              <v-icon>shopping_cart</v-icon>
            </v-btn>
            <span>Go to cart!</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line>
      <template
        v-for="(item, i) in cart">

        <v-list-tile
          :key="i"
          avatar
          @click=""
        >
          <v-list-tile-avatar>
            <img :src="item.image">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-sub-title> {{ item.author }} </v-list-tile-sub-title>
            <v-list-tile-title :class="item.read ? 'text--secondary' : 'text--primary'">
              {{ (item.title.length > 35) ? item.title.slice(0, 25) + '...' : item.title }}
            </v-list-tile-title>
            <v-list-tile-sub-title :class="item.read ? '' : 'text--primary'">
              What
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>{{ item.price }}</v-list-tile-action-text>
            <v-icon>delete</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
      <v-list-tile>
        <v-spacer></v-spacer>
        <v-list-tile-content>
          <v-list-tile-sub-title> Total</v-list-tile-sub-title>
          <v-list-tile-title>
            <h2>120.000 SBD</h2>
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
  </v-menu>
</template>

<script>

export default {
  name: 'cart-popover',
  props: [
    'cart',
    'dark'
  ],
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-3' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      },
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>