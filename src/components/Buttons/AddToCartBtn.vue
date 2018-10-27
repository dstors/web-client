<template>
  <div @click="addToCart({ id: product.id, index: index, source: source })">
    <slot>
      <v-btn icon large flat>
        <v-progress-circular
          v-if="loading"
          indeterminate
          color="blue">
        </v-progress-circular>
        <font-awesome-icon v-else :color="shopcart ? 'blue' : 'grey'" size="lg" :icon="['fas', 'cart-plus']"></font-awesome-icon>
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
  data() {
    return {
      loading: false
    }
  },
  methods: {
    addToCart({ id, index, source }) {
      if (this.$store.state.loggedIn) {
        this.loading = true;
        this.$store.dispatch('addToCart', { id, index, source })
          .then((res) => {
            this.loading = false;
            this.$emit('toggleshopcart', true)
          })
          .catch(() => {
            this.loading = false;
            console.log('Error on AddToCart')
          })
      }
    }
  }
}
</script>

<style scoped>

</style>