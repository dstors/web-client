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
  name: 'details-view',
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
  beforeRouteUpdate(to, from, next) {
    this.fetchProduct(to.params.product_id, next)
  },
  methods: {
    fetchProduct(id, doAfter) {
      this.product = {};
      api().get('/app/product/byId?id=' + id)
      .then(res => {
        this.product = {
          ...res.data,
          categories: [
            { text: res.data.category }
          ],
          id: id
        };

        if(doAfter) {
          doAfter()
        }
      })
      .catch(err => {
        console.log('Product Details')
        console.log(err)
      })
    }
  },
  mounted() {
    this.fetchProduct(this.product_id)
  }
}
</script>

<style>
</style>