<template>
	<v-btn
    icon
    @click="$store.commit('toggleDark')">
    <font-awesome-icon color="grey" :icon="dark ? ['fas', 'sun'] : ['fas', 'moon']"></font-awesome-icon>
  </v-btn>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'night-mode-btn',
  computed: {
  	...mapState({
  		dark: state => state.styles.dark
  	})
  }
}
</script>

<style scoped>

</style>