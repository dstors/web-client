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
      :src="product.pictures ? product.pictures[0] : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'"
      height="200px">
      <details-popup :product="product" :hovered="hovered"></details-popup>
    </v-card-media>
    <v-card-title primary-title class="pa-3">
      <span
        v-if="product.type === 'direct-sell'">
        <span> {{ product.title || product.name}} </span>
        <span :title="product.category">
          {{ product.category && (product.title || product.name)
            ? (product.category.length > 15 ? '- ' + product.category.slice(0, 15) + '...' : '- ' + product.category)
            : ''
          }}
        </span>
        <h3>
          {{ product.price }}
        </h3>
      </span>
      <span
        v-else-if="product.type === 'giveaway'">
        <span>{{ product.timeLeft }} left</span>
        <h3>
          {{ product.title || product.name}}
        </h3>
      </span>
      <span
        v-else-if="product.type === 'auction'">
        <span>{{ product.title || product.name}}</span>
        <h3>
          {{ product.lastBid }}
        </h3>
      </span>
    </v-card-title>
    <!-- <v-card-text v-if="product.type === 'direct-sell' && hovered">
      {{ product.stock }} available items
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
        @click="addToWishlist({ id: product.id, index: index, source: source })"
        icon large flat :color="product.wishlist ? 'red' : 'grey lighten-1'">
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn
        v-else
        icon large flat :color="product.wishlist ? 'primary' : 'grey lighten-1'">
        <v-icon>add_alert</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-if="product.type === 'direct-sell'"
        color="grey">
        {{ product.stock }}
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
import { mapState, mapActions } from 'vuex';
import DetailsPopup from './DetailsPopup.vue';

export default {
  components: {
    'details-popup': DetailsPopup
  },
  name: 'ProductItem',
  props: [ 'product', 'index', 'addToWishlist', 'source'],
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
      dark: state => state.styles.dark
    })
  },
  methods: {
    // ...mapActions({
    //   addToWishlist: 'addToWishlist'
    // }),
    onHover() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    }
  }
}
</script>