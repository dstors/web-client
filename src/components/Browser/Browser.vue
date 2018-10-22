<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs3 class="mt-5">
        Search filters go here
      </v-flex>
      <v-flex xs9>
        <span class="display-1 font-weight-light ma-5">
          {{ title }}
        </span>
        <product-grid :products='feed'></product-grid>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ProductGrid from '../ProductGrid'
export default {
  name: 'Browser',
  components: { 'product-grid': ProductGrid },
  props: ['title', 'source'],
  computed: {
    feed() {
      if (this.$store.state[this.$route.params.source + 'Feed'].length < 1) {
        this.$store.dispatch(
          'get' +
          this.$route.params.source.charAt(0).toUpperCase() +
          this.$route.params.source.slice(1) +
          'Feed'
        )
      }

      return this.$store.state[this.$route.params.source + 'Feed'];
    }
  }
}
</script>