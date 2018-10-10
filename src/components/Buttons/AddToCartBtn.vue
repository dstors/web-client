<template>
  <v-btn icon large flat @click="addToCart({ id: product.id, index: index, source: source })">
    <font-awesome-icon :color="shopcart ? 'blue' : 'grey'" size="lg" :icon="['fas', 'cart-plus']"></font-awesome-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'add-to-cart-btn',
  props: [
    'shopcart',
    'product',
    'index',
    'source'
  ],
  methods: {
    ...mapActions({
      addToCart: 'addToCart'
    })
  }
}
</script>

<style scoped>

</style>