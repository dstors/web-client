<template>
  <v-list three-line subheader>
    <!-- <v-subheader>Location Information</v-subheader> -->
    <v-list-tile>
      <v-list-tile-action>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title class="grey--text">Details</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-slide-y-transition>
      <v-container>
        <v-layout column>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Image</span>
            <v-layout row>
              <v-flex xs1 class="py-1">
                <v-checkbox>
                </v-checkbox>
              </v-flex>
              <v-flex xs11 class="px-1">
                <v-text-field
                  solo>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Title</span>
            <v-layout row>
              <v-flex xs1 class="py-1">
                <v-checkbox>
                </v-checkbox>
              </v-flex>
              <v-flex xs11 class="px-1">
                <v-text-field
                  solo>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-list>
</template>

<script>
export default {
  name: 'store-details-editor',
  props: ['dark', 'content', 'featured', 'title']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>