<template>
  <div class="ma-5"
    v-on:mouseover="onHover"
    v-on:mouseleave="onLeave">
    <span>
      <h2>{{ title }}</h2>
    </span>
    <v-carousel
      style="height: 100%!important; box-shadow: none"
      class="ma-0 pa-0"
      hide-delimiters
      :hide-controls="!hovered"
      :cycle="false">
      <v-carousel-item v-for="(page, i) in pages">
        <product-grid :hideToggleButtons="true" :key="i" source="products" :products="page"></product-grid>
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
  data() {
    return {
      hovered: false
    }
  },
  methods: {
    onHover() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    }
  }
}
</script>

<style>
.v-carousel__prev .v-btn, .v-carousel__next .v-btn {
    color: blue!important;
    background-color: rgba(255,255,255,0.75);
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
    -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
}
</style>