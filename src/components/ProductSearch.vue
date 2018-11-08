<template>
  <v-autocomplete
    class="pa-3"
    dense
    v-model="model"
    :items="items"
    clearable
    :loading="isLoading"
    :search-input.sync="search"
    color="orange"
    hide-details
    hide-selected
    solo flat
    :menu-props="{
      closeOnClick: false,
      closeOnContentClick: false,
      openOnClick: false,
      maxHeight: 400,
      offsetY: true,
      offsetOverflow: true,
      transition: true
    }"
    hieght="400px"
    hide-no-data
    prepend-inner-icon="search"
    item-text="Description"
    :placeholder="(currentCategory !== null) ? `Search in ${currentCategory}` : 'Start typing to Search'"
    return-object>
  </v-autocomplete>
</template>

<script>
import api from '../api';
import { mapState } from 'vuex';

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
    ...mapState({
      currentCategory: state => state.currentCategory
    }),
    items () {
      return this.entries
    }
  },

  watch: {
    search (val) {
      // Items have already been requested
      if (this.isLoading) return

      this.isLoading = true

      let url = this.currentCategory
        ? `/app/product/autocomplete?s=${val}&c=${encodeURIComponent(this.currentCategory)}`
        : `/app/product/autocomplete?s=${val}`;

      // Lazily load input items
      api().get(url)
        .then(res => {
          if (val !== '' && val !== undefined) {
            res.data.unshift(val)
          }
          this.count = res.data.length
          this.entries = res.data
        })
        .catch(err => {
          console.log(err)
        })
        .finally(() => (this.isLoading = false))
    },
    model(val) {
      this.$store.state.pagination.name = val
      api().post('/app/product/saveSearch', { searchString: encodeURIComponent(val) })

      if (val !== null && val !== "null" && val !== undefined && val !== "undefined") {
        if (this.$route.name !== "Search") {
          this.$router.push({ name: 'Search', params: { sourceRoute: `/browser/search` } })
        }
        else if (this.$route.name === "Search") {
          this.$store.dispatch("getBrowserFeed", `/browser/search`)
            .then(res => {

            })
            .catch(err => {
              console.log(err)
            })
        }
      }
    }
  }
}
</script>

<style></style>