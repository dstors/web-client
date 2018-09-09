<template>
	<v-list three-line subheader>
    <!-- <v-subheader>General</v-subheader> -->
    <v-list-tile>
      <v-list-tile-action>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Contact Information</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-slide-y-transition>
      <v-container>
        <v-layout column>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Title</span>
            <v-text-field
              solo>
            </v-text-field>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Phone number</span>
            <v-text-field
              @click:append-outer=""
              solo>
              <v-icon slot="append-outer">add_circle</v-icon>
            </v-text-field>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Email</span>
            <v-text-field
              @click:append-outer=""
              solo>
              <v-icon slot="append-outer">add_circle</v-icon>
            </v-text-field>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Social Networks</span>
            <v-layout row>
              <v-flex xs4>
                <v-select
                  :items="social_networks"
                  label="Pick a network"
                  item-text="title"
                  return-object
                  solo>
                </v-select>
              </v-flex xs8>
              <v-flex>
                <v-text-field
                  @click:append-outer=""
                  label="Url"
                  solo>
                  <v-icon slot="append-outer">add_circle</v-icon>
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
  name: 'contact-info-editor',
  props: ['dark', 'content', 'featured', 'title'],
  data() {
    return {
      option: null,
      social_networks: ['Facebook', 'Instagram', 'Twitter', 'Google +']
    }
  },
  methods: {
    setType: function(e) {
      this.newProduct.type = e.target.value
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>