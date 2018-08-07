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
    this.$store.commit('login', this.$route.query)
    this.$router.push('/browse')
  }
}
</script>