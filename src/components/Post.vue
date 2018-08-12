<template>
  <div>
    <h1>{{ $store.state.currentPost.title }}</h1>
    <div v-html="$store.state.currentPost.content"></div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: ['permlink', 'author'],
  mounted() {
    const { permlink, author } = this
    this.$store.dispatch('getDiscussionDetails', { permlink, author });
  }
}
</script>