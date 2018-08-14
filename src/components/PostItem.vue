<template>
  <v-card
    hover
    flat
    color="grey lighten-3">
    <v-card-media
      :src="post.image ? post.image : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'"
      height="200px">
    </v-card-media>
    <v-card-title primary-title class="black--text">
      @{{ post.author }} -
      <router-link
        :to="`/post/${post.author}/${post.permlink}`">
        <h3>
          {{ post.title }}
        </h3>
      </router-link>
    </v-card-title>
    <v-card-actions>
      <v-layout>
        <v-flex>
          <v-tooltip bottom v-for="(type, i) in types" :key="i">
            <v-chip
              :color="type.color"
              slot="activator"
              small
              text-color="white">
              <v-icon>{{ type.icon }}</v-icon>
            </v-chip>
            <span>{{ type.label }}</span>
          </v-tooltip>
          <h4>{{ post.pending_payout_value }}</h4>
        </v-flex>
      </v-layout>
      <v-spacer></v-spacer>
      <v-btn icon flat color="primary">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      <v-menu offset-y>
        <v-btn
          slot="activator"
          flat
          icon
          color="black">
          <v-icon>more_vert</v-icon>
        </v-btn>
        <v-list>
          <v-list-tile v-for="i in 3" :key="i" @click="">
            <v-list-tile-title> View more</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'PostItem',
  props: ['post'],
  data() {
    return {
      types: [
        { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-3' },
        { label: 'Auction', icon: 'gavel', color: 'red' },
        { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      ]
    }
  }
}
</script>