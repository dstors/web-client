<template>
	<v-btn
    icon
    class="grey--text darken-3"
    @click="$store.commit('toggleDark')">
    <font-awesome-icon color="grey" :icon="['fas', 'moon']"></font-awesome-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'night-mode-btn'
}
</script>

<style scoped>

</style>