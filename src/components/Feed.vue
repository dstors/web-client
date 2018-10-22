<template>
  <v-container fluid>
    <v-layout row wrap class="ma-0">
      <v-flex xs12>
        <product-carousel v-if="feed.length > 0" name="products" title="Featured products" :pages="feed"></product-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="ma-0">
      <v-flex xs12>
        <product-carousel v-if="feed.length > 0" name="wishlist" title="Wishlist" :pages="wishlist"></product-carousel>
      </v-flex>
      <v-flex xs12>
        <product-carousel v-if="feed.length > 0" name="products" title="Hot products" :pages="feed"></product-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="ma-0">
      <v-flex xs12>
        <product-carousel v-if="feed.length > 0" name="products" title="Discounts" :pages="feed"></product-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductCarousel from './ProductCarousel';
import { mapState, mapGetters } from 'vuex';

export default {
  components: {
    'product-carousel': ProductCarousel
  },
  name: 'Feed',
  computed: {
    ...mapState({
      feed: state => state.productsFeed,
      wishlist: state => state.wishlistFeed
    })
  }
}
</script>