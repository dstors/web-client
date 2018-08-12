<template>
  <v-container grid-list-xl>
    <v-layout v-for="(post, n) in $store.state.posts"
        :key="n" row>
      <v-flex xs12>
        <v-card raised tile>
          <v-card-media
            :src="post.image"
            height="150px">
          </v-card-media>
          <v-card-title primary-title>
            <router-link :to="`/post/${post.author}/${post.permlink}`">
              <h3 class="headline mb-0">
                {{ post.title }}
              </h3>
            </router-link>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Feed',
  mounted() {
    // this.$store.commit('getPosts');
  }
}
</script>