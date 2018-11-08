<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs3 class="mt-5">
        <filters-drawer :currentCategory="category"></filters-drawer>
      </v-flex>
      <v-flex xs9>
        <span class="display-1 font-weight-light ma-5">
          {{ title }}
        </span>
        <v-fade-transition group>
          <ghost-product-grid v-if="loading"></ghost-product-grid>
          <product-grid v-else :products='browserFeed'></product-grid>
        </v-fade-transition>
        <v-flex v-if="browserFeed.length > 0" class="text-xs-center" xs12>
          <v-pagination
            v-model="currentPage"
            :length="pagesCount || 1"
            circle
            :total-visible="7">
          </v-pagination>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductGrid from '../ProductGrid';
import GhostProductGrid from '../GhostProductGrid';
import FiltersDrawer from './FiltersDrawer';
import api from '../../api';

import { mapState, mapGetters } from 'vuex';

export default {
  name: 'Browser',
  components: {
    'product-grid': ProductGrid,
    'ghost-product-grid': GhostProductGrid,
    'filters-drawer': FiltersDrawer
  },
  props: [
    'title',
    'source',
    'sourceRoute',
    'username',
    'category'
  ],
  data() {
    return {
      feed: [],
      loading: false,
    }
  },
  computed: {
    ...mapState({
      browserFeed: state => state.browserFeed,
      limit: state => state.pagination.limit
    }),
    ...mapGetters({
      pagesCount: 'pagesCount'
    }),
    currentPage: {
      get() {
        return this.$store.state.pagination.page
      },

      set(page) {
        this.$store.state.pagination.page = page
      }
    }
  },
  watch: {
    currentPage(newPage, old) {
      // let route = this.currentRoute.split('?')[0] + `?limit=${this.limit}&page=${newPage}`
      this.loading = true
      this.$store.dispatch('getBrowserFeed')
        .then(res => {
          this.loading = false
        })
        .catch(err => {
          this.loading = false
          console.log(err)
        })
    }
  },
  mounted() {
    let sourceRoute;

    if (!this.sourceRoute && !this.category) {
      if (this.username && this.source) {
        this.$store.state.currentRoute = `/store/product_list/get?listName=${this.source}&userName=${this.username}`
      }

      if (!this.$store.state.currentRoute) {
        switch(this.source) {
          case 'all':
            this.$store.state.currentRoute = `/app/product/all`;
            break;
          case 'featured':
            this.$store.state.currentRoute = `/store/featured/get`;
            break;
          case 'new':
            this.$store.state.currentRoute = `/store/news/get`;
            break;
          default:
            this.$store.state.currentRoute = `/app/product/all`;
          // case 'offers':
          //   this.$store.state.currentRoute = '/store/offers/get';
          //   break;
        }
      }
    }
    else if (this.category) {
      this.$store.state.pagination.currentCategory = this.category;
      this.$store.state.currentRoute = `/browser/search`
    }
    else {
      this.$store.state.currentRoute = this.sourceRoute;
    }

    if (this.$store.state.browserFeed.length < 1) {
      this.loading = true;
      this.$store.dispatch('getBrowserFeed', this.$store.state.currentRoute)
        .then(() => {
          this.loading = false
        })
        .catch(() => console.log('Error fetching feed'))
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (to.name === "Search") {
        console.log(to.params.category)
        vm.$store.state.pagination.currentCategory = to.params.category
      }
    })
  },
  beforeRouteUpdate(to, from, next) {
    if (to.name === "Search") {
      this.$store.state.pagination.currentCategory = to.params.category
      this.$store.dispatch("getBrowserFeed", to.params.sourceRoute)
        .then(() =>{
          next()
        })
        .catch(err => {
          console.log(err)
        })
    }
    else {
      next()
    }
  },
  beforeRouteLeave(to, form, next) {
    this.$store.state.currentCategory = null;
    next()
  }
}
</script>