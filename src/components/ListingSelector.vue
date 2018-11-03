<template>
  <div>
    <v-btn @click="newListing = !newListing" style="float: right;">
      {{ newListing ? 'Pick a shelve' : 'List a new Shelve' }}
    </v-btn>
    <v-select
      v-if="!newListing"
      :items="listings"
      v-model="newProduct.listing"
      label="Pick a listing"
      class="pt-2"
      solo>
    </v-select>
    <v-text-field
      v-else
      class="pt-2"
      v-model="newProduct.listing"
      solo>
    </v-text-field>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'listing-selector',
  data() {
    return {
      newListing: false
    }
  },
  computed: {
    ...mapState({
      listings: state => state.userStore.listings,
      newProduct: state => state.newProduct
    })
  }
}
</script>

<style></style>