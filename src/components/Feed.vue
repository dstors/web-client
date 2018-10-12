<template>
	<product-grid source="products" :products="products"></product-grid>
</template>

<script>
import ProductGrid from './ProductGrid';
import { mapState } from 'vuex';

export default {
  components: { 'product-grid': ProductGrid },
  name: 'Feed',
  mounted() {
      // this.$store.dispatch('getProductsFeed')
  },
  computed: {
    ...mapState({
      products: state => state.productsFeed,
      dark: state => state.styles.dark
    })
  }
}
</script>