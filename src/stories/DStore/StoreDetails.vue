<template>
  <v-layout xs12 column wrap>
    <span class="display-1 pb-3">
      {{ title }}
    </span>
    <p class="title" v-if="content.shippingCost">
      <span>{{ content.shippingCost }}</span>
    </p>
    <p class="title" v-if="content.area">
      <span>{{ content.area }}</span>
    </p>
  </v-layout>
</template>

<script>
export default {
  name: 'store-details',
  props: ['content', 'title']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>