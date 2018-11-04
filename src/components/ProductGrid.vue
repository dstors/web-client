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
                :editable="editable"
                :direction="toggle_exclusive"
                :source="source"
                :index="n"
                :dark="dark"
                :inShelve="inShelve"
                v-on:toggleliked="toggleLiked(n, $event)"
                v-on:toggleshopcart="toggleShopcart(n, $event)"
                v-on:togglebookmark="toggleBookmark(n, $event)"
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
import Vue from 'vue';

import ProductItem from './ProductItem';
import GoBackBtn from './Buttons/GoBackBtn';

import { mapState } from 'vuex';

export default {
  name: 'ProductGrid',
  props: [
    'products',
    'source',
    'hideToggleButtons',
    'editable',
    'inShelve'
  ],
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
    toggleLiked(i, e) {
      Vue.set(this.products[i], 'liked', e)
    },
    toggleShopcart(i, e) {
      Vue.set(this.products[i], 'shopcart', e)
    },
    toggleBookmark(i, e) {
      Vue.set(this.products[i], 'wishlist', e)
    }
  }
}
</script>