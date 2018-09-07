<template>
  <v-layout xs12 column wrap>
    <span class="display-1 pb-3">
      {{ title }}
    </span>
    <p class="title" v-if="content.address">
      <span>{{ content.address }}</span>
    </p>
    <p class="title" v-if="content.city">
      <span>{{ content.city }}</span>
    </p>
    <p class="title" v-if="content.state">
      <span>{{ content.state }}</span>
    </p>
    <p class="title" v-if="content.country">
      <span>{{ content.country }}</span>
    </p>
  </v-layout>
</template>

<script>
export default {
  name: 'location-info',
  props: ['content', 'title']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>