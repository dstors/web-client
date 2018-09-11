<template>
	<product-grid :wishlist="wishlist"></product-grid>
</template>

<script>
import { mapState } from 'vuex';
import ProductGrid from './ProductGrid';
export default {
  components: { ProductGrid },
	name: 'Wishlist',
  computed: {
    ...mapState({
      wishlist: state => state.posts
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>