<template>
	<v-container class="ml-5">
    <v-layout column wrap>
      <v-flex xs12 :style="{ 'margin-left': '15px' }">
        <v-layout row wrap>
          <v-flex xs2>
            <go-back-btn></go-back-btn>
          </v-flex>
          <v-flex xs10>
            <v-breadcrumbs>
              <v-breadcrumbs-item
                v-for="item in product.categories"
                v-if="item.text !== ''"
                :key="item.text"
              >
                {{ item.text }}
              </v-breadcrumbs-item>
            </v-breadcrumbs>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <product-details :product="product">
        </product-details>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductDetails from './ProductDetails'
import GoBackBtn from './Buttons/GoBackBtn';
import api from '../api';

export default {
  name: 'details',
  components: {
    'product-details': ProductDetails,
    'go-back-btn': GoBackBtn
  },
  props: [
    'product_id'
  ],
  data() {
    return {
      product: {}
    }
  },
  mounted() {
    api().get('/app/product/byId?id=' + this.product_id)
      .then(res => {
        this.product = {
          ...res.data,
          categories: [
            { text: res.data.category },
            { text: 'Finances' },
            { text: '' },
          ]
        };
      })
      .catch(err => {
        console.log('Product Details')
        console.log(err)
      })
  }
}
</script>

<style>
</style>