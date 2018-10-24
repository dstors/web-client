<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs3 class="mt-5">
        Search filters go here
      </v-flex>
      <v-flex xs9>
        <span class="display-1 font-weight-light ma-5">
          {{ title }}
        </span>
        <product-grid :products='browserFeed'></product-grid>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductGrid from '../ProductGrid';
import api from '../../api';

import { mapState } from 'vuex';

export default {
  name: 'Browser',
  components: { 'product-grid': ProductGrid },
  props: ['title', 'source', 'sourceRoute'],
  data() {
    return {
      feed: []
    }
  },
  computed: {
    ...mapState({
      browserFeed: state => state.browserFeed
    })
  },
  mounted() {
    let sourceRoute;

    if (!this.sourceRoute) {
      switch(this.source) {
        case 'all':
          sourceRoute = '/app/product/all';
          break;
        case 'featured':
          sourceRoute = '/store/featured/get';
          break;
        case 'new':
          sourceRoute = '/store/news/get';
          break;
        // case 'offers':
        //   sourceRoute = '/store/offers/get';
        //   break;
      }
    }
    else {
      sourceRoute = this.sourceRoute;
    }

    if (this.$store.state.browserFeed.length < 1) {
      this.$store.dispatch('getBrowserFeed', sourceRoute)
    }
  }
}
</script>