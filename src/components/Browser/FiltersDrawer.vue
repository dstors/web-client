<template>
  <div>
    <ul>
      <li>Product categories breadcrumb somewhere</li>
      <li>Sort by: Lower price - higher price - relevant(?)</li>
      <li>Availability - Include out of stock (checkbox)</li>
    </ul>
    <location-filter></location-filter>
    <price-filter></price-filter>
    <categories-filter></categories-filter>
  </div>
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
        { component: 'location-filter', name: 'location' },
        { component: 'categories-filter', name: 'categories' },
        { component: 'price-filter', name: 'price' },
      ]
    }
  },
}
</script>