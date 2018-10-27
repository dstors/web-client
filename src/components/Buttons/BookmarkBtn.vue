<template>
	<v-btn icon large flat
    @click="addToWishlist({ id: product.id, index: index, source: source })">
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="deep-orange accent-1"
    ></v-progress-circular>
    <font-awesome-icon v-else :color="product.wishlist ? '#FF9E80' : 'grey'" size="lg" :icon="['fas', 'bookmark']"></font-awesome-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'bookmark-btn',
  props: [
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
    addToWishlist({ id, index, source}) {
      if (this.$store.state.loggedIn) {
        this.loading = true;
        this.$store.dispatch('addToWishlist', { id, index, source})
          .then(() => {
            this.loading = false;
            this.$emit('togglebookmark', !this.product.wishlist)
          })
          .catch(() => {
            this.loading = false;
            console.log('Error on Bookmark')
          })
      }
    }
  }
}
</script>

<style scoped>

</style>