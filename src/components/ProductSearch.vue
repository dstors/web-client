<template>
  <v-autocomplete
    class="pa-3"
    v-model="model"
    :items="items"
    clearable
    :loading="isLoading"
    :search-input.sync="search"
    color="white"
    hide-details
    hide-selected
    solo flat
    label="Search"
    prepend-inner-icon="search"
    item-text="Description"
    placeholder="Start typing to Search"
    prepend-icon="mdi-database-search"
    return-object>
  </v-autocomplete>
</template>

<script>
import api from '../api';

export default {
  name: 'product-search',
  data: () => ({
    descriptionLimit: 60,
    entries: [],
    isLoading: false,
    model: null,
    search: null
  }),

  computed: {
    items () {
      return this.entries
    }
  },

  watch: {
    search (val) {
      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      // Lazily load input items
      api().get(`/app/product/autocomplete?s=${val}`)
        .then(res => {
          res.data.push(val)
          this.count = res.data.length
          this.entries = res.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    model(val) {
      console.log(val)
      this.$router.push({ name: 'Search', params: { sourceRoute: `/browser/search?name=${val}` } })
      // this.$store.dispatch('getBrowserFeed', `/browser/search?name=${val}`)
      //   .then(() => {
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
    }
  }
}
</script>

<style></style>