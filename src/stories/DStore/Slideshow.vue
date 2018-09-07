<template>
  <v-responsive :aspect-ratio="16/9">
  	<v-carousel>
      <v-carousel-item
        v-for="(item,i) in content"
        :key="i"
        :src="products ? item.image : item"
      ></v-carousel-item>
    </v-carousel>
  </v-responsive>
</template>

<script>
export default {
  name: 'slideshow',
  props: ['content', 'products']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>