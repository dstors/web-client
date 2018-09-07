<template>
  <v-layout xs12 column wrap>
    <span class="display-1 pb-3">
      {{ title }}
    </span>
    <p class="title" v-if="content.phones" v-for="(phone, p) in content.phones">
      <span>{{ phone }}</span>
    </p>
    <p class="title" v-if="content.emails" v-for="(email, p) in content.emails">
      <span>{{ email }}</span>
    </p>
    <p class="title" v-if="content.social_networks" v-for="(sn, p) in content.social_networks">
      <span>{{ sn.name }}: </span><span>{{ sn.url }}</span>
    </p>
  </v-layout>
</template>

<script>
export default {
  name: 'contact-info',
  props: ['content', 'title']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>