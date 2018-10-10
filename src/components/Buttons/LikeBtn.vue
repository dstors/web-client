<template>
	<v-btn icon large flat>
    <font-awesome-icon :color="liked ? 'red' : 'grey'" size="lg" :icon="['fas', 'heart']"></font-awesome-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'like-btn',
  props: ['liked']
}
</script>

<style scoped>

</style>