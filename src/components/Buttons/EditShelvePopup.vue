<template>
  <v-dialog v-model="dialog" persistent max-width="290">
    <v-tooltip slot="activator" fixed top>
      <font-awesome-icon :style="{ 'position': 'relative', 'bottom': '2px' }"
        @click=""
        slot="activator"
        class="font-weight-light ml-2" size="1x"
        :icon="['fas', 'edit']">
      </font-awesome-icon>
      <span>Edit shelve name</span>
    </v-tooltip>
    <v-card>
      <v-card-title class="headline">
        New shelve name
      </v-card-title>
      <v-card-text>
        <v-text-field
          class="pt-2"
          v-model="newName"
          solo>
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn flat @click.native="dialog = false">
          Cancel
        </v-btn>
        <v-btn color="primary" flat @click.native="editShelveName">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  nane: 'edit-shelve-popup',
  props: [
    'shelveName'
  ],
  data() {
    return {
      dialog: false,
      newName: ''
    }
  },
  methods: {
    editShelveName() {
      this.$store.dispatch('userStore/editShelveName',
        { listName: this.shelveName, newName: this.newName })
        .then(() => {
          this.dialog = false;
          this.$emit('changename', this.newName)
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>