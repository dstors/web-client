<template>
  <v-app>
    <v-container>
      <v-layout>
        <v-flex>
          <v-card
            hover
            raised
            width="250px"
            color="grey lighten-3">
            <v-card-media
              :src="post.image ? post.image : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'"
              height="200px">
            </v-card-media>
            <v-card-title primary-title class="black--text">
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
              <v-spacer></v-spacer>
              <router-link
                v-if="post.type === 'direct-sell'"
                tag="a"
                :to="`/post/${post.author}/${post.permlink}`">
                <span>{{ post.title }}</span>
                <h2>
                  {{ post.price }}
                </h2>
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
                <small>
                  <span>Started at: <strong>{{ post.startingPrice }}</strong></span>
                  <br>
                  <span>Last bid: <strong>{{ post.lastBid }}</strong></span>
                </small>
                <h2>
                  {{ post.title }}
                </h2>
              </router-link>
            </v-card-title>
            <v-card-actions>
              <v-layout>
                <v-flex>
                  <span>Payout value: <br><strong>{{ post.pending_payout_value }}</strong></span>
                </v-flex>
              </v-layout>
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
        </v-flex>
      </v-layout>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: 'post-item',
  props: ['post'],
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