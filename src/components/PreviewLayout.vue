<template>
  <v-card>
    <v-card-title>
      <span class="headline">
        <slot name="title">
        </slot>
      </span>
    </v-card-title>
    <v-layout row justify-center>
      <slot></slot>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  name: 'preview-layout'
}
</script>

<style></style>