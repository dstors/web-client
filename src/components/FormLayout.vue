<template>
  <v-layout row wrap justify-end>
    <v-dialog v-model="dialog" persistent transition="dialog-bottom-transition">
      <slot name="activator" slot="activator">
      </slot>
      <v-card>
        <slot></slot>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'form-layout',
  props: [
    'stateModule'
  ],
  computed: {
    dialog: {
      get() {
        return this.$store.state[this.stateModule].formDialog
      },

      set(value) {
        this.$store.state[this.stateModule].formDialog = value
      }
    },
    ...mapState({
      dark: state => state.styles.dark,
      darkColor: state => state.styles.darkColor,
      color: state => state.styles.color
    })
  },
  methods: {
    ...mapActions({
      toggleFormDialog: 'toggleFormDialog'
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>