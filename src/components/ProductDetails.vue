<template>
	<v-container fluid>
   <v-layout column wrap>
     <v-layout row wrap>
      <v-flex xs12 sm6 style="max-width:600px;">
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
      <v-flex xs12 sm6>
        <v-card fill-height>
          <v-card-title class="title text-capitalize">
            {{ product.name }}
            <v-spacer></v-spacer>
            <bookmark-btn
              v-on:togglebookmark="toggleBookmark"
              :product="product">
            </bookmark-btn>
            <like-btn
              v-on:toggleliked="toggleLiked"
              :id="product.id"
              :liked="product.liked">
            </like-btn>
          </v-card-title>
          <v-card-text>
            <span v-if="product.stock" class="font-weight-light">
              <span v-if="product.stock < 1" class="font-weight-regular">This item is sold out</span>
              <span v-else class="font-weight-regular">{{ product.stock }}</span> available
            </span>
            <br>
            <span v-if="product.date" class="font-weight-light">{{ 'published at ' + product.date.month.low + '/' + product.date.day.low + '/' + product.date.year.low }}</span>
            <br>
            <span class="caption" v-if="product.author"> by
              <router-link
                :style="{
                  'text-decoration': 'none'
                }"
                :to="{ name: 'StoreBrowser', params: { username: product.author } }" class="caption">
                {{ product.author }}
              </router-link>
            </span>
            <br>
            <span class="display-1">
              {{ product.price }}
            </span>
            <add-to-cart-btn
              v-if="!product.shopcart"
              v-on:toggleshopcart="toggleShopcart"
              :product="product">
              <v-btn block color="primary">
                Add to cart
              </v-btn>
            </add-to-cart-btn>
            <delete-form-cart-btn v-else
              v-on:toggleshopcart="toggleShopcart"
              :product="product">
              <v-btn block flat color="red">
                Remove from Cart
              </v-btn>
            </delete-form-cart-btn>
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
        <v-flex xs12 v-if="product.author">
          <v-card>
            <v-card-title class="display-1">
              {{ 'Other products from ' + product.author }}
            </v-card-title>
            <v-card-text>
              <product-carousel
                :source="`/app/product/all/user?steemUsername=${product.author}`">
              </product-carousel>
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
import Vue from 'vue';

import LikeBtn from './Buttons/LikeBtn';
import AddToCartBtn from './Buttons/AddToCartBtn';
import BookmarkBtn from './Buttons/BookmarkBtn';
import DeleteFromCartBtn from './Buttons/DeleteFromCartBtn';
import ProductCarousel from './ProductCarousel';

export default {
  name: 'product-details',
  components: {
    'like-btn': LikeBtn,
    'add-to-cart-btn': AddToCartBtn,
    'product-carousel': ProductCarousel,
    'delete-form-cart-btn': DeleteFromCartBtn,
    'bookmark-btn': BookmarkBtn
  },
  props: ['product'],
  methods: {
    toggleLiked(e) {
      Vue.set(this.product, 'liked', e)
    },
    toggleBookmark(e) {
      Vue.set(this.product, 'wishlist', e)
    },
    toggleShopcart(e) {
      Vue.set(this.product, 'shopcart', e);
    }
  }
}
</script>

<style>
</style>