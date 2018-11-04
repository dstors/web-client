<template>
  <v-tooltip fixed top>
    <font-awesome-icon
      @click="deleteShelve"
      slot="activator"
      class="font-weight-light ml-2" size="1x"
      :icon="['fas', 'times']">
    </font-awesome-icon>
    <span>Delete shelve <span class="caption">(No products will be lost)</span></span>
  </v-tooltip>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  nane: 'delete-shelve-btn',
  props: [
    'shelveName'
  ],
  methods: {
    deleteShelve() {
      this.$store.dispatch('userStore/deleteShelve', this.shelveName)
        .then(() => {
          this.$store.dispatch('userStore/getStore')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>