<template>
  <v-layout xs12 wrap>
    <v-flex mb-4 xs12>
      <v-card xs12 v-for="({ price, post: { title, content }, category, tags, location: { country, state, city } }, i) in feed" :key="i">
        <h2>{{ title }}</h2>
        {{ content }} <br>
        CATEGORY: {{category}} <br>
        TAGS: {{tags}} <br>
        {{ country + ' | ' + state + ' | ' + city  }} <br>
        <h3>{{ '$' + price }}</h3>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'Browser',
  data() {
    return {
      msg: 'This is the browser'
    }
  },
  computed: {
    feed: {
      get() {
        return this.$store.getters.getFilteredFeed
      }
    }
  }
}
</script>