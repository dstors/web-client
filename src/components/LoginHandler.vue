<template>
  <div>
    <h1>Login in</h1>
    <v-progress-linear :indeterminate="true"></v-progress-linear>
  </div>
</template>

<script>
export default {
	name: 'login-handle',
	mounted() {
		console.log('¿handle?');
    this.$store.dispatch('login');
    this.$router.push('/');
  }
}
</script>