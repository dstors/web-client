<template>
	<v-slide-y-transition>
    <v-container>
      <v-layout column>
        <div v-bind:style="sticky">
          <span class="display-1 font-weight-light">Edit your store</span>
          <v-btn style="float: right;" color="primary">Save changes</v-btn>
          <v-btn style="float: right;" @click="toggleFormDialog">Cancel</v-btn>
        </div>
        <v-flex offset-xs1 xs12 class="mb-4 mt-2">
          <span class="title font-weight-light">Store Name</span>
          <v-text-field
            class="pt-2"
            v-model="store.name"
            solo>
          </v-text-field>
        </v-flex>
        <v-flex offset-xs1 xs12 class="mb-4">
          <span class="title font-weight-light">Store Description</span>
          <span class="caption font-weight-light">(or tagline)</span>
          <v-text-field
            class="pt-2"
            v-model="store.description"
            solo>
          </v-text-field>
        </v-flex>
        <v-flex offset-xs1 xs12 class="mb-4">
          <span class="title font-weight-light">Store Avatar</span>
          <span class="caption font-weight-light">(usually the store logo)</span>
          <v-text-field
            class="pt-2"
            v-model="store.avatar"
            solo>
          </v-text-field>
        </v-flex>
        <v-flex offset-xs1 xs12 class="mb-4">
          <span class="title font-weight-light">Store Banner</span>
          <span class="caption font-weight-light">(please pick a wide picture)</span>
          <v-text-field
            class="pt-2"
            v-model="store.banner"
            solo>
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-slide-y-transition>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'store-fields',
  computed: {
    ...mapState({
      store: state => state.userStore,
      dark: state => state.styles.dark
    }),
    sticky() {
      return {
        'padding': '10px',
        'position': 'sticky',
        'top': '0',
        'z-index': '999',
        'background-color': this.dark ? '#424242' : '#fff',
        'margin': '10px',
        'box-shadow': '0px 2px 5px -2px rgb(0,0,0,0.65)'
      }
    }
  },
  methods: {
    ...mapActions({
      toggleFormDialog: 'userStore/toggleFormDialog'
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>