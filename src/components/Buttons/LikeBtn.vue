<template>
	<v-btn @click="likeProduct({ id })" icon large flat>
    <font-awesome-icon :color="liked ? 'red' : 'grey'" size="lg" :icon="['fas', 'heart']"></font-awesome-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'like-btn',
  props: ['liked', 'id'],
  methods: {
    ...mapActions({
      likeProduct: 'likeProduct'
    })
  }
}
</script>

<style scoped>

</style>