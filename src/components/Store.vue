<template>
  <v-card class="ma-5">
    <v-card-title primary-title>
      <h2>Collection</h2>
    </v-card-title>
    <v-carousel
      hide-delimiters
      :cycle="false">
      <v-carousel-item v-for="page in productPages">
        <product-grid source="products" :products="page"></product-grid>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import ProductGrid from './ProductGrid'
export default {
  name: 'store',
  components: { ProductGrid },
  computed: {
    productPages() {
      let result = [];

      let last_page = Math.ceil(this.$store.state.productsFeed.length/this.limitPerPage)

      for (var page = 0; page < last_page; page++) {
        let start_index = ((page+1)-1) * this.limitPerPage;
        result.push(this.$store.state.productsFeed.slice(start_index, start_index + this.limitPerPage))
      }

      console.log(result);
      return result;
    },
    limitPerPage() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1
        case 'sm': return 3
        case 'md': return 4
        case 'lg': return 4
        case 'xl': return 4
      }
    }
  },
  mounted() {
    this.$store.dispatch('getProductsFeed')
    console.log(this.$vuetify.breakpoint.name)
  },
}
</script>

<style></style>