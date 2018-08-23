<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex>
          <slot></slot>
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>
<script>
export default {
	name: 'vuetify-layout'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>