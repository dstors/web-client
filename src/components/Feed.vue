<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex v-for="(post, n) in $store.state.posts" d-flex xs12 sm6 md3>
        <v-layout row wrap>
          <v-flex d-flex>
            <v-layout align-center row wrap>
              <v-flex
                v-for="i in 1"
                :key="i"
                d-flex
                xs12
              >
                <post-item :post="post"></post-item>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import PostItem from './PostItem';

export default {
  name: 'Feed',
  components: {
    'post-item': PostItem
  },
  mounted() {
    this.$store.dispatch('refreshDiscussions')
  }
}
</script>