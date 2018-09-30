<template>
  <v-layout row wrap justify-end>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <slot name="activator" slot="activator">
        <!-- <v-btn
          slot="activator"
          flat icon right color="primary">
          <v-icon rigth>
            edit
          </v-icon>
        </v-btn> -->
      </slot>
      <v-card>
        <v-toolbar color="amber lighten-3">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon><v-icon color="red">delete</v-icon></v-btn>
          <v-btn color="primary" @click.native="submitProduct">Save</v-btn>
        </v-toolbar>
        <slot></slot>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  name: 'form-layout',
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    submitProduct() {
      this.$store.dispatch('newProduct/createProduct');
      this.dialog=false
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>