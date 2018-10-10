<template>
  <product-carousel v-if="productPages.length > 0" title="New collection" :pages="productPages">
  </product-carousel>
</template>

<script>
import { mapGetters } from 'vuex';
import ProductCarousel from './ProductCarousel.vue';

export default {
  name: 'store',
  components: {
    'product-carousel': ProductCarousel
  },
  computed: {
    ...mapGetters({
      productPages: 'getPaginatedFeed'
    })
  },
  // beforeCreate() {
  //   this.$store.dispatch('getProductsFeed')
  // }
}
</script>

<style></style>