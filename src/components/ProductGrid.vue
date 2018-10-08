<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm4 md3 v-for="(product, n) in products">
        <v-flex d-flex>
          <v-layout align-center row wrap>
            <v-flex
              d-flex
              xs12
              >
            <product-item
              :addToWishlist="addToWishlist"
              :source="source"
              :index="n"
              :dark="dark"
              :product="product">
            </product-item>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductItem from './ProductItem';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductGrid',
  props: ['products', 'source'],
  components: {
    'product-item': ProductItem
  },
  computed: {
    ...mapState({
      dark: state => state.styles.dark
    })
  },
  methods: {
    ...mapActions({
      addToWishlist: 'addToWishlist'
    }),
  }
}
</script>