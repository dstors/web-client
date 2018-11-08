<template>
    <v-layout row wrap>
      <v-flex v-for="(category, i) in categories"
        v-if="i < categoryLimit"
        :key="i">
        <v-btn @click="goToCategory(category)" flat>
          {{ category }}
        </v-btn>
      </v-flex>
      <v-flex>
        <v-menu bottom offset-y>
          <v-btn
            slot="activator"
            transparent flat
            :outline="navStyle.outline">
            {{ categoryLimit === 0 ? 'All Categories' : 'More' }}
          </v-btn>
          <v-list dense subheader>
            <v-list-tile @click="noCategory" v-if="categoryLimit === 0">
              <v-list-tile-title>All</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="goToCategory(category)" v-for="(category, i) in categories" v-if="i >= categoryLimit">
              <v-list-tile-title>{{ category }}</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-flex>
      <v-flex class="hidden-sm-and-up">
        <product-search></product-search>
      </v-flex>
    </v-layout>
</template>

<script>
import api from '../api';

import ProductSearch from './ProductSearch';

import { mapState } from 'vuex'

export default {
  name: 'categories-menu',

  components: {
    'product-search': ProductSearch
  },

  computed: {
    ...mapState({
      categories: state => state.categories,
      navStyle: state => state.styles.nav
    }),
    categoryLimit() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return  0;
        case 'sm': return  2;
        case 'md': return  4;
        case 'lg': return  7;
        case 'xl': return  7;
      }
    }
  },

  methods: {
    goToCategory(category) {
      this.$router.push({
        name: 'Search',
        params: {
          sourceRoute: `/browser/search?category=${encodeURIComponent(category)}`,
          category
        }
      })
    },
    noCategory() {
      this.$store.state.pagination.currentCategory = null;

      this.$store.dispatch("getBrowserFeed", "/browser/search")
    }
  }
}
</script>

<style>

.router-link {
  text-decoration: none;
  font-weight: 100;
  transition: color 0.5s;
}

.router-link:hover {
  color: #90caf9!important;
}
</style>