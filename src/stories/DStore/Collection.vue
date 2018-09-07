<template>
  <v-card raised>
    <v-card-title class="headline" primary-title>
      {{ title }}
    </v-card-title>
    <v-divider></v-divider>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex d-flex xs12 sm4 v-for="(post, n) in content">
          <v-flex d-flex>
            <v-layout align-center row wrap>
              <v-flex
                d-flex
                xs12
                >
              <post-item
                :post="post">
              </post-item>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
import PostItem from '../PostItem.vue';

export default {
  components: { PostItem },
  name: 'collection',
  props: ['content', 'featured', 'title']
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>