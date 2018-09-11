<template>
  <v-card
    :dark="dark"
    hover
    v-on:mouseover="onHover"
    v-on:mouseleave="onLeave"
    raised
    :color="dark ? '' : 'grey lighten-2'"
    width="250px"
    >
    <v-card-media
      :src="product.image ? product.image : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'"
      height="200px">
      <details-popup :product="product" :hovered="hovered"></details-popup>
    </v-card-media>
    <v-card-title primary-title class="pa-3">
      <router-link
        v-if="product.type === 'direct-sell'"
        tag="a"
        :to="`/product/${product.author}/${product.permlink}`">
        <span>{{ product.title }}</span>
        <h3>
          {{ product.price }}
        </h3>
      </router-link>
      <router-link
        v-else-if="product.type === 'giveaway'"
        tag="a"
        :to="`/product/${product.author}/${product.permlink}`">
        <span>{{ product.timeLeft }} left</span>
        <h3>
          {{ product.title }}
        </h3>
      </router-link>
      <router-link
        v-else-if="product.type === 'auction'"
        tag="a"
        :to="`/product/${product.author}/${product.permlink}`">
        <span>{{ product.title }}</span>
        <h3>
          {{ product.lastBid }}
        </h3>
      </router-link>
    </v-card-title>
    <!-- <v-card-text v-if="product.type === 'direct-sell' && hovered">
      {{ product.available }} available items
    </v-card-text> -->
    <v-divider light></v-divider>
    <v-card-actions class="px-3 pt-2 pb-1">
      <v-tooltip top v-if="product.type">
        <v-btn icon :color="types[product.type].color" slot="activator">
          <v-icon color="white">{{ types[product.type].icon }}</v-icon>
        </v-btn>
        <span>{{ types[product.type].label }}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn
        v-if="product.type !== 'giveaway'"
        icon large flat :color="product.liked ? 'red' : 'grey lighten-1'">
        <v-icon>favorite</v-icon>
      </v-btn>
      <v-btn
        v-if="product.type === 'direct-sell'"
        icon large flat :color="product.marked ? 'red' : 'grey lighten-1'">
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn
        v-else
        icon large flat :color="product.marked ? 'primary' : 'grey lighten-1'">
        <v-icon>add_alert</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-if="product.type === 'direct-sell'"
        color="grey">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-if="product.type === 'auction'"
        color="grey">
        <v-icon>gavel</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-if="product.type === 'giveaway'"
        color="grey">
        <v-icon>person_add</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import DetailsPopup from './DetailsPopup.vue';

export default {
  components: {
    'details-popup': DetailsPopup
  },
  name: 'ProductItem',
  props: [ 'product'],
  data() {
    return {
      marked: false,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-2' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      },
      hovered: false
    }
  },
  computed: {
    ...mapState({
      dark: state => state.dark
    })
  },
  methods: {
    onHover() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    }
  }
}
</script>