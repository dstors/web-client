<template>
  <div @click="deleteFromCart({ id: product.id, index: index, source: source })">
    <slot>
      <v-btn icon large flat>
        <font-awesome-icon color="grey" size="lg" :icon="['fas', 'trash']"></font-awesome-icon>
      </v-btn>
    </slot>
  </div>
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
    deleteFromCart({ id, index, source }) {
      if (this.$store.state.loggedIn) {
        this.$store.dispatch('deleteFromCart', { id, index, source })
        this.$emit('toggleshopcart', false)
      }
    }
  }
}
</script>

<style scoped>

</style>