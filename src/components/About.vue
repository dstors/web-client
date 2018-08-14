<template>
  <h1>About us</h1>
</template>

<script>
export default {
  name: 'About',
  data() {
    return {
      post: {title: 'Me', author: 'julianmnst'}
    }
  },
  mounted() {
    // const { permlink, author } = this
    // this.$store.dispatch('getDiscussionDetails', { permlink, author });
  }
}
</script>