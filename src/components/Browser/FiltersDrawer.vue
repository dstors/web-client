<template>
  <v-layout column wrap class="mx-2">
    <v-flex xs12 class="my-2">
      <span class="font-weight-regular title">
        Products found: {{ totalResults }}
      </span>
      <br>
    </v-flex>
    <v-divider></v-divider>
    <v-flex xs12 class="my-2">
      <ul>
        <li>Product categories breadcrumb somewhere</li>
        <li>Sort by: Lower price - higher price - relevant(?)</li>
        <li>Availability - Include out of stock (checkbox)</li>
      </ul>
    </v-flex>
    <v-divider></v-divider>
    <!-- <v-flex xs12 class="my-2">
      <location-filter></location-filter>
    </v-flex>
    <v-divider></v-divider> -->
    <v-flex xs12 class="my-2">
      <price-filter></price-filter>
    </v-flex>
    <v-divider></v-divider>
    <v-flex xs12 class="my-2">
      <categories-filter></categories-filter>
    </v-flex>
  </v-layout>
</template>

<script>

import LocationFilter from '@/components/Browser/Filters/LocationFilter'
import PriceFilter from '@/components/Browser/Filters/PriceFilter'
import CategoriesFilter from '@/components/Browser/Filters/CategoriesFilter'

import { mapState } from 'vuex';

export default {
  name: 'Browser',
  components: {
    'location-filter': LocationFilter,
    'price-filter': PriceFilter,
    'categories-filter': CategoriesFilter
  },
  data() {
    return {
      msg: 'This is the browser',
      items: [
        { component: 'location-filter', name: 'location' },
        { component: 'categories-filter', name: 'categories' },
        { component: 'price-filter', name: 'price' },
      ]
    }
  },
  computed: {
    ...mapState({
      totalResults: state => state.pagination.totalProducts
    })
  }
}
</script>