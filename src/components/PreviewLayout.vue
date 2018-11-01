<template>
  <div>
    <div>
      <span class="headline">
        <slot name="title">
        </slot>
      </span>
    </div>
    <v-layout row justify-center>
      <slot></slot>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'preview-layout'
}
</script>

<style></style>