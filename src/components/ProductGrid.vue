<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex v-if="!hideToggleButtons" xs12>
        <go-back-btn></go-back-btn>
        <span style="float: right;">
          <v-btn-toggle v-model="toggle_exclusive">
            <v-btn>
              <font-awesome-icon size="lg" :icon="['fas', 'th']"></font-awesome-icon>
            </v-btn>
            <v-btn>
              <font-awesome-icon size="lg" :icon="['fas', 'th-list']"></font-awesome-icon>
            </v-btn>
          </v-btn-toggle>
        </span>
      </v-flex>
      <v-flex d-flex v-bind="gridDisplay" v-for="(product, n) in products">
        <v-flex d-flex>
          <v-layout align-center row wrap>
            <v-flex
              d-flex
              xs12>
              <product-item
                :direction="toggle_exclusive"
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
import GoBackBtn from './Buttons/GoBackBtn';

import { mapState, mapActions } from 'vuex';

export default {
  name: 'ProductGrid',
  props: ['products', 'source', 'hideToggleButtons'],
  components: {
    'product-item': ProductItem,
    'go-back-btn': GoBackBtn
  },
  data() {
    return {
      toggle_exclusive: 0
    }
  },
  computed: {
    ...mapState({
      dark: state => state.styles.dark
    }),
    gridDisplay() {
      if (this.hideToggleButtons) {
        return {
          'xs12': true,
          'sm4': this.toggle_exclusive < 1,
          'md3': this.toggle_exclusive < 1
        }
      }
      else {
        return {
          'xs12': true,
          'sm6': this.toggle_exclusive < 1,
          'md4': this.toggle_exclusive < 1
        }
      }
    }
  },
  methods: {
    ...mapActions({
      addToWishlist: 'addToWishlist'
    }),
  }
}
</script>