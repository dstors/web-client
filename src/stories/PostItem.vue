<template>
  <v-card
    :dark="dark"
    hover
    v-on:mouseover="onHover"
    v-on:mouseleave="onLeave"
    raised
    :color="dark ? '' : 'grey lighten-2'"
    width="250px"
    >
    <v-card-media
      :src="post.image ? post.image : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'"
      height="200px">
      <details-popover :product="post" :hovered="hovered"></details-popover>
    </v-card-media>
    <v-card-title primary-title class="pa-3">
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
        <h3>
          {{ post.title }}
        </h3>
      </router-link>
      <router-link
        v-else-if="post.type === 'auction'"
        tag="a"
        :to="`/post/${post.author}/${post.permlink}`">
        <span>{{ post.title }}</span>
        <h3>
          {{ post.lastBid }}
        </h3>
      </router-link>
    </v-card-title>
    <!-- <v-card-text v-if="post.type === 'direct-sell' && hovered">
      {{ post.available }} available items
    </v-card-text> -->
    <v-divider light></v-divider>
    <v-card-actions class="px-3 pt-2 pb-1">
      <v-tooltip top v-if="post.type">
        <v-btn icon :color="types[post.type].color" slot="activator">
          <v-icon color="white">{{ types[post.type].icon }}</v-icon>
        </v-btn>
        <span>{{ types[post.type].label }}</span>
      </v-tooltip>
      <v-spacer></v-spacer>
      <v-btn
        v-if="post.type === 'direct-sell'"
        icon large flat :color="post.marked ? 'red' : 'grey lighten-1'">
        <v-icon>bookmark</v-icon>
      </v-btn>
      <v-btn
        v-else
        icon large flat :color="post.marked ? 'primary' : 'grey lighten-1'">
        <v-icon>add_alert</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-if="post.type === 'direct-sell'"
        color="grey">
        <v-icon>add_shopping_cart</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-if="post.type === 'auction'"
        color="grey">
        <v-icon>gavel</v-icon>
      </v-btn>
      <v-btn
        icon
        flat
        v-if="post.type === 'giveaway'"
        color="grey">
        <v-icon>person_add</v-icon>
      </v-btn>
      <!-- <v-menu offset-y>
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
      </v-menu> -->
    </v-card-actions>
  </v-card>
</template>

<script>
import DetailsPopover from './DetailsPopover';
export default {
  components: {
    DetailsPopover
  },
  name: 'post-item',
  props: ['post', 'dark'],
  data() {
    return {
      marked: false,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-2' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      },
      hovered: false
    }
  },
  methods: {
    onHover() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    }
  }
}
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
</style>