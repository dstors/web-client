<template>
  <div>
    <!-- <ghost-product-grid></ghost-product-grid> -->
    <!-- <product-carousel title="This is a listing" :pages="feed"></product-carousel> -->
    <v-btn @click="addProductToList">Add product to list</v-btn><br>
    <v-btn @click="getStore">Get Store</v-btn><br>
    <v-btn @click="getProductList">Get Product list</v-btn><br>
    <v-btn @click="getCategories">Get Categories</v-btn><br>
    <input type="text" v-model="featuredId" style="border: 3px solid; border-radius: 10px;"><v-btn @click="addProductToFeatured">Add product to featured id: {{ featuredId }}</v-btn><br>
    <input type="text" v-model="deleteId" style="border: 3px solid; border-radius: 10px;"><v-btn @click="deleteProduct">Delete product id: {{ deleteId }}</v-btn><br>
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
import GhostProductGrid from './GhostProductGrid';

export default {
  name: 'random',
  components: { 'product-carousel': ProductCarousel, 'ghost-product-grid': GhostProductGrid },
  data() {
    return {
      res: '',
      featuredId: null,
      deleteId: null
    }
  },
  computed: {
    ...mapGetters({
      feed: 'getPaginatedFeed'
    })
  },
  methods: {
    deleteProduct() {
      api().post('/app/product/delete/' + this.deleteId)
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    },
    addProductToFeatured() {
      api().post('/store/featured/add/' + this.featuredId)
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    },
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
    },
    getCategories() {
      console.log('Get categories')
      api().get('/app/product/categories/get')
        .then(res => {
          console.log(res)
          this.res = res
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style></style>