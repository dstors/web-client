<template>
  <v-btn icon large flat @click="deleteFromCart({ id: product.id, index: index, source: source })">
    <font-awesome-icon color="grey" size="lg" :icon="['fas', 'trash']"></font-awesome-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'delete-form-cart-btn',
  props: [
    'product',
    'index'
  ],
  methods: {
    ...mapActions({
      deleteFromCart: 'deleteFromCart'
    })
  }
}
</script>

<style scoped>

</style>