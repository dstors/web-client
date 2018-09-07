<template>
  <v-card raised>
    <v-card-media
      class="white--text"
      height="200px"
      :src="content.image">
      <v-container fill-height fluid>
        <v-layout fill-height>
          <v-flex xs12 align-end flexbox>
            <span class="headline">{{ content.text }}</span>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-media>
  </v-card>
</template>

<script>
import { VImg } from 'vuetify'
export default {
  components: { VImg },
  name: 'image-with-text',
  props: ['content']
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>