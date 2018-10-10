<template>
	<v-btn icon large flat
    @click="addToWishlist({ id: product.id, index: index, source: source })">
    <font-awesome-icon :color="product.wishlist ? '#FD5F63' : 'grey'" size="lg" :icon="['fas', 'bookmark']"></font-awesome-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'bookmark-btn',
  props: [
    'product',
    'index',
    'source',
    'addToWishlist'
  ]
}
</script>

<style scoped>

</style>