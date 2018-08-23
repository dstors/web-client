<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex d-flex xs12 sm4 md3 v-for="(post, n) in posts">
        <v-flex d-flex>
          <v-layout align-center row wrap>
            <v-flex
              d-flex
              xs12
              >
            <post-item
              :dark="dark"
              :post="post">
            </post-item>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import PostItem from './PostItem';
  export default {
    name: 'post-list',
    components: { PostItem },
    props: [
      'posts',
      'dark'
    ]
  }
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>