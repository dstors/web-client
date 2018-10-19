<template>
  <div>
    <product-carousel title="This is a listing" :pages="feed"></product-carousel>
    <v-btn @click="addProductToList">Add product to list</v-btn>
    <v-btn @click="getStore">Get Store</v-btn>
    <v-btn @click="getProductList">Get Product list</v-btn>
    <h1>res.data</h1>
    {{ res.data }}
    <hr>
    <h1>res</h1>
    {{ res }}
  </div>
</template>

<script>
import api from '../api';
import ProductCarousel from './ProductCarousel';
import { mapGetters } from 'vuex';

export default {
  name: 'random',
  components: { 'product-carousel': ProductCarousel },
  data() {
    return {
      res: ''
    }
  },
  computed: {
    ...mapGetters({
      feed: 'getPaginatedFeed'
    })
  },
  methods: {
    createStore() {
      console.log('Create Store')
      api().post('/store/add', { name: 'The first Store', description: 'This is the first Store ever on dStors.' })
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    },
    addProductToList() {
      console.log('Adding product 61 to test list')
      api().post('/store/product_list/61', { name: 'Test List' })
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    },
    getStore() {
      console.log('Get Store')
      api().get('/store/get/user')
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    },
    getProductList() {
      console.log('Get ProductList')
      api().get('/store/product_list/get?name=Test List')
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>