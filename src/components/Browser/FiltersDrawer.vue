<template>
  <v-navigation-drawer
      v-model="$store.state.drawer"
      fixed
      clipped
      class="grey lighten-4"
      app
    >
      <v-list
        dense
        class="grey lighten-4"
        >
        <template v-for="(item, i) in items">
          <v-layout
            v-if="item.heading"
            :key="i"
            row
            align-center
            >
            <v-flex xs6 v-if="item.heading">
              <v-subheader>
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-right">
            <v-spacer></v-spacer>
              <v-checkbox v-model="$store.state.filters[item.filter].on"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-divider
            v-else-if="item.divider"
            :key="i"
            dark
            class="my-3"
            >
          </v-divider>
          <component
            v-else-if="$store.state.filters[item.name].on"
            :key="i"
              v-bind:is="item.component">
          </component>
        </template>
      </v-list>
    </v-navigation-drawer>
</template>

<script>

import LocationFilter from '@/components/Browser/Filters/LocationFilter'
import PriceFilter from '@/components/Browser/Filters/PriceFilter'
import CategoriesFilter from '@/components/Browser/Filters/CategoriesFilter'

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
        { heading: 'Location filters', filter: 'location' },
        { component: 'location-filter', name: 'location' },
        { divider: true },
        { heading: 'Categories' , filter: 'categories' },
        { component: 'categories-filter', name: 'categories' },
        { divider: true },
        { heading: 'Price', filter: 'price' },
        { component: 'price-filter', name: 'price' },
      ]
    }
  },
}
</script>