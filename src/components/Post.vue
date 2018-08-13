<template>
  <v-card raised>
    <h1>{{ $store.state.currentPost.title }} - {{ $store.state.currentPost.voters_list.length }} Upvotes</h1>
    <div v-html="$store.state.currentPost.content"></div>
  </v-card>
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