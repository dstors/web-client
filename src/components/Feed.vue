<template>
  <v-container fluid>
    <v-layout column wrap class="ma-0" v-if="isEmpty === 4">
      <v-flex xs12 :style="{ 'text-align': 'center', 'margin-top': '3px' }">
        <span class="display-3 font-weight-light">Woops!</span>
      </v-flex>
      <v-flex xs12 :style="{ 'text-align': 'center', 'margin-top': '100px' }">
        <div>
          <img :style="{
            'height': '250px',
            'position': 'relative',
            'bottom': '100px'
          }" :src="dstorsLogo" alt="DStors.com">
        </div>
        <span :style="{
            'position': 'relative',
            'bottom': '100px'
          }" class="display-1 font-weight-light">It looks like there are no products...</span>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-else class="ma-0" v-for="section in sections">
      <v-flex xs12>
        <product-carousel
          @emptycarousel="isEmpty = isEmpty + 1"
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
import dstorsLogo from './assets/DSTORS-LOGO.png';

export default {
  components: {
    'product-carousel': ProductCarousel
  },
  name: 'Feed',
  data() {
    return {
      isEmpty: 0,
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
          source: '/app/product/news/get'
        },
        {
          title: 'Hot Products',
          name: 'hot',
          source: 'app/product/hot/get'
        },
        // {
        //   title: 'Offers',
        //   name: 'featured',
        //   source: '/store/offers/get'
        // },
      ]
    }
  },
  mounted() {
    this.$store.state.browserFeed = [];
  },
  computed: {
    dstorsLogo() {
      return dstorsLogo;
    }
  }
}
</script>