<template>
  <span>
    <v-btn @click="$router.go(-1)">
      <font-awesome-icon size="lg" :icon="['fas', 'long-arrow-alt-left']"></font-awesome-icon>
    </v-btn>
  </span>
</template>

<script>
export default {
  name: 'go-back-btn'
}
</script>