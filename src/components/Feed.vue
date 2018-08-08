<template>
  <div class="hello">
    <ul>
      <li v-for="post in $store.state.posts">{{ post.title }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Feed',
  mounted() {
    this.$store.dispatch('getFeed');
  }
}
</script>