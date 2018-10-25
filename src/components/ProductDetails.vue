<template>
	<v-container fluid>
   <v-layout column wrap>
     <v-layout row wrap>
      <v-flex xs6 style="max-width:600px;">
        <v-card>
          <v-card-text>
            <v-carousel
              style="width:100%; max-height:400px"
              v-if="product.pictures && product.pictures.length > 0"
              :cycle="false">
              <v-carousel-item
                v-for="(picture,i) in product.pictures"
                v-if="picture !== ''"
                :key="i"
                :src="picture"
              ></v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card fill-height>
          <v-card-title class="title">
            {{ product.name }}
            <v-spacer></v-spacer>
            <like-btn></like-btn>
          </v-card-title>
          <v-card-text>
            <span class="caption">
              by <strong>{{ product.author }}</strong>
            </span>
            <br>
            <span class="display-1">
              {{ product.price }}
            </span>
            <add-to-cart-btn
              :product="product">
              <v-btn :disabled="product.shopcart" block color="primary">
                Add to cart
              </v-btn>
            </add-to-cart-btn>
          </v-card-text>
        </v-card>
      </v-flex>
       <!-- <v-flex xs1>
        <v-card>
          <v-card-title class="display-1">
            Offers/combinations
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex> -->
       <!-- <v-flex xs1>
        <v-card>
          <v-card-title class="display-1">
            Characteristics
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex> -->
       <!-- <v-flex xs1>
        <v-card>
          <v-card-title class="display-1">
            Reviews
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex> -->
       <!-- <v-flex xs1>
        <v-card>
          <v-card-title class="display-1">
            Q&A
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex> -->
      </v-layout>
      <v-layout row wrap class="mt-3">
        <v-flex xs12>
          <v-card>
            <v-card-title class="display-1">
              Description
            </v-card-title>
            <v-card-text>
              {{ product.description }}
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title class="display-1">
              Other products from same author
            </v-card-title>
            <v-card-text>
              A carousel should go here
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- <v-flex xs12>
          <v-card>
            <v-card-title>
              Details about store
            </v-card-title>
            <v-card-text>
              This is some random text about something
              See more about the store
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              Payment options
            </v-card-title>
            <v-card-text>
              Currencies accepted and so
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              Shipment options
            </v-card-title>
            <v-card-text>
              Placeholder text
            </v-card-text>
          </v-card>
        </v-flex> -->
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import LikeBtn from './Buttons/LikeBtn';
import AddToCartBtn from './Buttons/AddToCartBtn';

export default {
  name: 'product-details',
  components: {
    'like-btn': LikeBtn,
    'add-to-cart-btn': AddToCartBtn
  },
  props: ['product']
}
</script>

<style>
</style>