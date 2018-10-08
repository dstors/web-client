<template>
	<product-grid source="wishlist" :products="wishlist"></product-grid>
</template>

<script>
import { mapState } from 'vuex';
import ProductGrid from './ProductGrid';
export default {
  components: { ProductGrid },
	name: 'Wishlist',
  mounted() {
    this.$store.dispatch('getWishlistFeed')
  },
  computed: {
    ...mapState({
      wishlist: state => state.wishlistFeed
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>