<template>
  <v-card
    :dark="dark"
    hover
    raised
    :color="dark ? '' : 'grey lighten-2'"
    class="pa-2"
  >
    <v-layout column wrap>
      <v-flex xs12>
        <v-card-media
          height="200px">
          <div class="image-box"></div>
        </v-card-media>
      </v-flex>
      <v-flex xs12>
        <v-card-title>
          <v-container class="pa-0">
            <v-layout row>
              <v-flex class="title-box" xs12>
              </v-flex>
              <v-flex class="title-box" xs12>
              </v-flex>
              <v-flex class="title-box" xs12>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-title>
      </v-flex>
      <v-flex xs12 class="mt-5">
        <v-card-actions>
          <v-btn icon large color="grey lighten-1"></v-btn>
          <v-spacer></v-spacer>
          <v-btn icon large color="grey lighten-1"></v-btn>
          <v-btn icon large color="grey lighten-1"></v-btn>
          <v-btn icon large color="grey lighten-1"></v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

import ProductTypeLabel from './Buttons/ProductTypeLabel.vue';
import LikeBtn from './Buttons/LikeBtn.vue';
import BookmarkBtn from './Buttons/BookmarkBtn.vue';
import AddToCartBtn from './Buttons/AddToCartBtn.vue';

export default {
  name: 'ghost-product-item',
  components: {
    'product-type-label': ProductTypeLabel,
    'like-btn': LikeBtn,
    'bookmark-btn': BookmarkBtn,
    'add-to-cart-btn': AddToCartBtn
  },
  computed: {
    ...mapState({
      dark: state => state.styles.dark
    })
  }
}
</script>

<style scoped>
.image-box {
  background-color: #cacaca;
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0px;
  top: 0%;
  border-radius: 1px;
}

.title-box {
  background-color: #cacaca;
  position: absolute;
  height: 5%;
  width: 90px;
  left: 15px;
  top: 60%;
  border-radius: 5px;
}

.title-box:nth-of-type(2) {
  background-color: #cacaca;
  position: absolute;
  height: 5%;
  width: 200px;
  left: 15px;
  margin-top: 20px;
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