<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex v-if="wishlist" d-flex xs12 sm4 md3 v-for="(product, n) in wishlist">
        <v-flex d-flex>
          <v-layout align-center row wrap>
            <v-flex
              d-flex
              xs12
              >
            <product-item
              :dark="dark"
              :product="product">
            </product-item>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
      <v-flex d-flex xs12 sm4 md3 v-for="(product, n) in products">
        <v-flex d-flex>
          <v-layout align-center row wrap>
            <v-flex
              d-flex
              xs12
              >
            <!-- <product-item
              :dark="dark"
              :product="product">
            </product-item> -->
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductItem from './ProductItem';
import { mapState } from 'vuex';

export default {
  name: 'ProductGrid',
  components: {
    'product-item': ProductItem
  },
  props: ['wishlist'],
  mounted() {
    this.$store.dispatch('refreshDiscussions')
  },
  computed: {
    ...mapState({
      products: state => state.posts,
      dark: state => state.dark
    })
  }
}
</script>