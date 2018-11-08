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
      <span class="title">
        Categories
        <br>
      </span>
      <div @click="noCategory"
        class="router-link font-weight-regular">
        <span :style="{ color: dark ? 'white' : 'black' }"
          v-if="currentCategory === null"
          class="router-link font-weight-bold">
          All
        </span>
        <span :style="{ color: dark ? 'white' : 'black' }"
          class="router-link font-weight-regular"
          v-else>
          All
        </span>
        <br>
      </div>
      <router-link :to="{
        name: 'Search',
        params: {
          sourceRoute: `/browser/search?category=${encodeURIComponent(category)}`,
          category: category
        } }"
        class="router-link font-weight-regular"
        v-for="category in categories">
        <span :style="{ color: dark ? 'white' : 'black' }" v-if="category === currentCategory" class="router-link font-weight-bold">{{ category }}</span>
        <span :style="{ color: dark ? 'white' : 'black' }" class="router-link font-weight-regular" v-else>{{ category }}</span>
        <br>
      </router-link>
    </v-flex>
    <v-divider></v-divider>
    <!-- <v-flex xs12 class="my-2">
      <ul>
        <li>Sort by: Lower price - higher price - relevant(?)</li>
        <li>Availability - Include out of stock (checkbox)</li>
      </ul>
    </v-flex>
    <v-divider></v-divider> -->
    <!-- <v-flex xs12 class="my-2">
      <location-filter></location-filter>
    </v-flex>
    <v-divider></v-divider> -->
    <v-flex xs12 class="my-2">
      <price-filter></price-filter>
    </v-flex>
    <!-- <v-divider></v-divider> -->
    <!-- <v-flex xs12 class="my-2">
      <categories-filter></categories-filter>
    </v-flex> -->
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
  props: ['currentCategory'],
  // methods: {
  //   switchCategory(category) {

  //   }
  // },
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
      totalResults: state => state.pagination.totalProducts,
      categories: state => state.categories,
      dark: state => state.styles.dark
    })
  },

  methods: {
    noCategory() {
      this.$store.state.pagination.currentCategory = null;

      this.$store.dispatch("getBrowserFeed", "/browser/search")
    }
  }
}
</script>

<style scoped>
.router-link {
  text-decoration: none;
  transition: color 0.5s;
  cursor: pointer;
}

.router-link:hover {
  color: #90caf9!important;
}
</style>