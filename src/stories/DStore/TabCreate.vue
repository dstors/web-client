<template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <v-card>
      <v-card-title class="headline">
        Create Tab
      </v-card-title>
      <v-card-text>
        <span class="headline">
          Name
        </span>
        <v-text-field
          solo>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="danger" flat @click.native="closeDialog">Cancel</v-btn>
        <v-btn color="primary" flat @click.native="closeDialog">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'tab-create',
  props: ['dialog'],
  computed: {
    computedDialog: {
      get() {
        return this.dialog
      }
    }
  },
  methods: {
    closeDialog() {
      this.$emit('close-modal');
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>