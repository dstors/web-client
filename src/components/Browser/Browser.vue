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
        <ghost-product-grid v-if="loading"></ghost-product-grid>
        <product-grid v-else :products='browserFeed'></product-grid>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductGrid from '../ProductGrid';
import GhostProductGrid from '../GhostProductGrid';
import api from '../../api';

import { mapState } from 'vuex';

export default {
  name: 'Browser',
  components: {
    'product-grid': ProductGrid,
    'ghost-product-grid': GhostProductGrid
  },
  props: ['title', 'source', 'sourceRoute', 'username'],
  data() {
    return {
      feed: [],
      loading: false
    }
  },
  computed: {
    ...mapState({
      browserFeed: state => state.browserFeed
    })
  },
  mounted() {
    let sourceRoute;
    this.loading = true;

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

      if (!sourceRoute && (this.username && this.source)) {
        sourceRoute = `/store/product_list/get?name=${this.source}&userName=${this.username}`
      }
    }
    else {
      sourceRoute = this.sourceRoute;
    }

    if (this.$store.state.browserFeed.length < 1) {
      // this.loading = true;
      this.$store.dispatch('getBrowserFeed', sourceRoute)
        .then(() => {
          this.loading = false
        })
        .catch(() => console.log('Error fetching feed'))
    }
  }
}
</script>