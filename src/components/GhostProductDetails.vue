<template>
	<v-container fluid>
    <v-layout column wrap>
      <v-layout row wrap>
        <v-flex xs12 sm6 style="max-width:600px;">
          <v-card>
            <v-card-text>
              <v-card-media
                height="377px">
                <div class="image-box"></div>
              </v-card-media>
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card fill-height>
            <v-card-title class="title">
              <span class="title-box">
              </span>
              <v-spacer></v-spacer>
              <v-btn icon color="grey lighten-1"></v-btn>
              <v-btn icon color="grey lighten-1"></v-btn>
            </v-card-title>
            <v-card-text>
              <span class="title-box">
              </span>
              <br>
              <span class="title-box">
              </span>
              <v-btn disabled block>
                Add to cart
              </v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-3">
        <v-flex xs12>
          <v-card>
            <v-card-title class="display-1">
              Description
            </v-card-title>
            <v-card-text>
              ...
            </v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <v-card-title class="display-1">
              Other products from the same author
            </v-card-title>
            <v-card-text>
              <ghost-product-grid :hideToggleButtons="true"></ghost-product-grid>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';

import ProductCarousel from './ProductCarousel';
import GhostProductGrid from './GhostProductGrid';

export default {
  name: 'ghost-product-details',
  components: {
    'product-carousel': ProductCarousel,
    'ghost-product-grid': GhostProductGrid
  },
}
</script>

<style>
.image-box {
  background-color: #cacaca;
  position: absolute;
  height: 377px!important;
  width: 100%;
  border-radius: 3px;
}

.title-box {
  background-color: #cacaca;
  position: absolute;
  height: 10%;
  width: 200px;
  left: 15px;
  top: 9%;
  border-radius: 5px;
}

.title-box:nth-of-type(2) {
  background-color: #cacaca;
  position: absolute;
  height: 20%;
  width: 110px;
  left: 15px;
  margin-top: 60px;
  border-radius: 5px;
}

.title-box:nth-of-type(3) {
  background-color: #cacaca;
  position: absolute;
  height: 9%;
  width: 50px;
  left: 15px;
  margin-top: 40px;
  border-radius: 5px;
  margin-bottom: 400px;
}
</style>