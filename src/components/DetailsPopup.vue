<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      full-width>
      <v-btn
        slot="activator"
        icon large flat color="grey" v-show="hovered">
        <v-icon>visibility</v-icon>
      </v-btn>

      <v-flex xs12 md12>
        <v-card>
          <v-layout row wrap>
            <v-flex xs12 md5>
              <v-card-media
                aspect-ratio="2.75"
                contain>
                <v-carousel
                  hide-delimiters
                  :cycle="false">
                  <v-carousel-item
                    v-for="(picture,i) in product.pictures"
                    v-if="picture !== ''"
                    :key="i"
                    :src="picture"
                  ></v-carousel-item>
                </v-carousel>
              </v-card-media>
            </v-flex>
            <v-flex xs12 md7>
              <v-layout row wrap xs12 justify-end>
                <v-btn small icon @click="dialog = false"><v-icon>close</v-icon></v-btn>
                <v-flex xs12>
                  <v-card-title primary-title>
                    <div>
                      <div>{{ product.author }}</div>
                      <div class="headline">{{ product.title }}</div>
                      <div class="headline" v-if="product.price">
                        {{ product.price }}
                      </div>
                      <div v-if="product.lastBid">
                        Last bid: {{ product.lastBid }}
                      </div>
                      <div v-if="product.timeLeft">
                        {{ product.timeLeft }} left
                      </div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs12>
                  <v-card-actions class="pa-3">
                    <v-btn>More</v-btn>
                    <v-btn v-if="product.type === 'direct-sell'">Add to cart <v-icon right>add_shopping_cart</v-icon> </v-btn>
                    <v-btn v-else-if="product.type === 'giveaway'">Join giveaway <v-icon right>person_add</v-icon> </v-btn>
                    <v-btn v-else-if="product.type === 'auction'">Place bid <v-icon right>gavel</v-icon> </v-btn>
                  </v-card-actions>
                </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-card-text>
                {{ product.description }}
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card>
      </v-flex>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'details-popup',
  props: [
    'hovered',
    'product'
  ],
  data() {
    return {
      dialog: false,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-3' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      }
    }
  },
  computed: {
    ...mapState({
      dark: state => state.dark
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>