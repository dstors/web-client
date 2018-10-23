<template>
  <v-container fluid>
    <v-layout row wrap class="ma-0" v-for="section in sections">
      <v-flex xs12>
        <product-carousel
          :source="section.source"
          :name="section.name"
          :title="section.title">
        </product-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductCarousel from './ProductCarousel';

export default {
  components: {
    'product-carousel': ProductCarousel
  },
  name: 'Feed',
  data() {
    return {
      sections: [
        {
          title: 'All Products',
          name: 'all',
          source: '/app/product/all'
        },
        {
          title: 'Featured Products',
          name: 'featured',
          source: '/store/featured/get'
        },
        {
          title: 'New Products',
          name: 'new',
          source: '/store/news/get'
        },
        // {
        //   title: 'Offers',
        //   name: 'featured',
        //   source: '/store/offers/get'
        // },
      ]
    }
  },
}
</script>