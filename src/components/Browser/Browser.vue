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
import api from '../../api'

export default {
  name: 'Browser',
  components: { 'product-grid': ProductGrid },
  props: ['title', 'source', 'sourceRoute'],
  data() {
    return {
      feed: []
    }
  },
  mounted() {
    api().get(this.sourceRoute)
      .then(res => {
        console.log(res.data);
        this.feed = res.data;
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>