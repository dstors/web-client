<template>
  <div @click="addToCart({ id: product.id, index: index, source: source })">
    <slot>
      <v-btn icon large flat>
        <font-awesome-icon :color="shopcart ? 'blue' : 'grey'" size="lg" :icon="['fas', 'cart-plus']"></font-awesome-icon>
      </v-btn>
    </slot>
  </div>
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