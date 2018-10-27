<template>
	<v-btn @click="likeProduct(id)" icon large flat>
    <!-- <span v-if="likes > 0">{{ likes }}</span> -->
    <v-progress-circular
      v-if="loading"
      indeterminate
      color="red"
    ></v-progress-circular>
    <font-awesome-icon v-else :color="liked ? 'red' : 'grey'" size="lg" :icon="['fas', 'heart']"></font-awesome-icon>
  </v-btn>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'like-btn',
  props: ['liked', 'likes', 'id'],
  data() {
    return {
      loading: false
    }
  },
  methods: {
    likeProduct(id) {
      if (this.$store.state.loggedIn) {
        this.loading = true;
        this.$store.dispatch('likeProduct', { id })
          .then(() => {
            this.loading = false;
            this.$emit('toggleliked', !this.liked)
          })
          .catch(() => {
            this.loading = false;
            console.log('Error on like')
          })
      }
    }
  }
}
</script>

<style scoped>

</style>