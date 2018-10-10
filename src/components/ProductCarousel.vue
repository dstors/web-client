<template>
  <div class="ma-5">
    <span>
      <h2>{{ title }}</h2>
    </span>
    <v-carousel
      style="border: 1px solid; background-color: #eee;"
      class="mt-2 py-2"
      hide-delimiters
      :cycle="false">
      <v-carousel-item v-for="(page, i) in pages">
        <product-grid :key="i" source="products" :products="page"></product-grid>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import ProductGrid from './ProductGrid'

export default {
  name: 'product-carousel',
  components: { ProductGrid },
  props: ['title', 'pages'],
}
</script>

<style></style>