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
      <v-flex d-flex v-if="products.length > 0" v-bind="gridDisplay" v-for="(product, n) in products">
        <v-flex d-flex>
          <v-layout align-center row wrap>
            <v-flex
              d-flex
              xs12>
              <product-item
                :shelveName="shelveName"
                @removefromgrid="removeFromGrid"
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
      <v-flex
        :style="{
          'text-align': 'center',
          'padding-left': '80px',
          'padding-right': '80px',
          'padding-bottom': '80px',
        }"
        v-show="products.length < 1" xs12>
        <div>
          <img style="height: 250px;" :src="dstorsLogo" alt="DStors.com">
        </div>
        <span class="display-1 font-weight-light">
          No products were found!
        </span>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';

import ProductItem from './ProductItem';
import GoBackBtn from './Buttons/GoBackBtn';

import { mapState } from 'vuex';

import dstorsLogo from './assets/DSTORS-LOGO.png';

export default {
  name: 'ProductGrid',
  props: [
    'products',
    'source',
    'hideToggleButtons',
    'editable',
    'inShelve',
    'shelveName'
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
    },
    dstorsLogo() {
      return dstorsLogo;
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
    },
    removeFromGrid(productId) {
      this.$emit('removefromgrid', productId)
    }
  }
}
</script>