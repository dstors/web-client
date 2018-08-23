<template>
  <v-card
    :dark="dark"
    hover
    raised
    width="250px"
    >
    <v-card-media
      :src="post.image ? post.image : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'"
      height="200px">
    </v-card-media>
    <v-card-title primary-title>
      <router-link
        v-if="post.type === 'direct-sell'"
        tag="a"
        :to="`/post/${post.author}/${post.permlink}`">
        <span>{{ post.title }}</span>
        <h3>
          {{ post.price }}
        </h3>
      </router-link>
      <router-link
        v-else-if="post.type === 'giveaway'"
        tag="a"
        :to="`/post/${post.author}/${post.permlink}`">
        <span>{{ post.timeLeft }} left</span>
        <h2>
          {{ post.title }}
        </h2>
      </router-link>
      <router-link
        v-else-if="post.type === 'auction'"
        tag="a"
        :to="`/post/${post.author}/${post.permlink}`">
        <span>{{ post.title }}</span>
        <h3>
          <span><small>Last bid:</small> <br> {{ post.lastBid }}</span>
        </h3>
      </router-link>
      <v-spacer></v-spacer>
      <v-tooltip bottom v-if="post.type">
        <v-chip
          :color="types[post.type].color"
          slot="activator"
          small
          text-color="white">
          <v-icon>{{ types[post.type].icon }}</v-icon>
        </v-chip>
        <span>{{ types[post.type].label }}</span>
      </v-tooltip>
    </v-card-title>
    <v-divider light></v-divider>
    <v-card-actions class="px-3 pt-1 pb-0">
      <!-- <v-layout>
        <v-flex>
          <span>Payout value: <br><strong>{{ post.pending_payout_value }}</strong></span>
        </v-flex>
      </v-layout> -->
      <v-spacer></v-spacer>
      <v-btn icon flat color="red">
        <v-icon v-if="post.marked">bookmark</v-icon>
        <v-icon v-else>bookmark_border</v-icon>
      </v-btn>
      <v-btn icon flat color="primary">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      <v-menu offset-y>
        <v-btn
          slot="activator"
          flat
          icon>
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
  name: 'post-item',
  props: ['post', 'dark'],
  data() {
    return {
      marked: false,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-3' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      }
    }
  },
}
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
</style>