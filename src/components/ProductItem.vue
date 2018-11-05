<template>
  <v-card
    :dark="dark"
    hover
    v-on:mouseover="onHover"
    v-on:mouseleave="onLeave"
    raised
    :color="dark ? '' : 'grey lighten-2'"
    :class="this.cardDirection.row ? 'pa-2' : 'pt-1'">
    <v-layout v-bind="cardDirection" wrap>
      <v-flex xs2>
        <router-link :to="'/product/details/' + product.id" v-bind:style="linkToProductDetails">
          <v-card-media
            :src="product.pictures ? product.pictures[0] : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'"
            height="200px"
            :style="this.cardDirection.row ? 'width: 200px' : '200px'">
            <!-- <details-popup v-if="cardDirection.column" :product="product" :hovered="hovered"></details-popup> -->
          </v-card-media>
        </router-link>
      </v-flex>
      <v-flex xs6>
        <v-container class="pa-0">
          <v-layout column>
            <router-link :to="'/product/details/' + product.id" v-bind:style="linkToProductDetails">
              <v-flex v-bind="titleOffset">
                <v-card-title>
                  <span
                    v-if="product.type === 'direct-sell'">
                    <span :title="product.category" class="body-2">
                      {{ product.category && (product.title || product.name)
                        ? ((product.category.length > 30 && cardDirection.column)
                          ? product.category.slice(0, 30) + '...'
                          : product.category)
                        : ''
                      }}
                    <br>
                    <span class="subheading" :title="product.name">
                      {{(
                          (product.name.length > 25 && cardDirection.column)
                            ? product.name.slice(0, 25) + '...'
                            : product.name
                         )
                      }}
                    </span>
                    </span>
                    <br>
                    <span class="headline">
                      {{ product.price }}
                    </span>
                  </span>
                  <span
                    v-else-if="product.type === 'giveaway'">
                    <span class="subheading">{{ product.timeLeft }} left</span>
                    <br>
                    <span class="headline">
                      {{ product.title || product.name}}
                    </span>
                  </span>
                  <span
                    v-else-if="product.type === 'auction'">
                    <span class="subheading">{{ product.title || product.name}}</span>
                    <br>
                    <span class="headline">
                      {{ product.lastBid }}
                    </span>
                  </span>

                </v-card-title>
              </v-flex>
            </router-link>
            <v-flex v-bind="titleOffset" v-if="cardDirection.row">
              <v-card-actions class="px-3 pt-2 pb-1">
                <!-- <v-spacer></v-spacer> -->
                <product-type-label v-if="cardDirection.row" :type="product.type"></product-type-label>
                <!-- <details-popup v-if="cardDirection.row" :product="product" :hovered="true"></details-popup> -->
                <like-btn
                  v-on:toggleliked="toggleLiked"
                  :likes="0"
                  v-bind:liked="product.liked"
                  :id="product.id"
                  v-if="product.type !== 'giveaway'">
                </like-btn>
                <bookmark-btn
                  v-on:togglebookmark="toggleBookmark"
                  v-if="product.type === 'direct-sell'"
                  :source="source"
                  :index="index"
                  :product="product">
                </bookmark-btn>
                <v-btn
                  v-else
                  icon large flat :color="product.wishlist ? 'primary' : 'grey lighten-1'">
                  <v-icon>add_alert</v-icon>
                </v-btn>
                <add-to-cart-btn
                  v-on:toggleshopcart="toggleShopcart"
                  :shopcart="product.shopcart"
                  :product="product"
                  :source="source"
                  :index="index"
                  v-if="product.type === 'direct-sell'">
                </add-to-cart-btn>
                <v-btn
                  icon
                  flatc
                  v-if="product.type === 'auction'"
                  color="grey">
                  <v-icon>gavel</v-icon>
                </v-btn>
                <v-btn
                  icon
                  flat
                  v-if="product.type === 'giveaway'"
                  color="grey">
                  <v-icon>person_add</v-icon>
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex xs4 v-if="cardDirection.column">
        <v-card-actions class="px-3 pt-2 pb-1">
          <product-type-label v-if="cardDirection.column" :type="product.type"></product-type-label>
          <v-spacer></v-spacer>
          <!-- <details-popup v-if="cardDirection.row" :product="product" :hovered="true"></details-popup> -->
          <like-btn
            v-on:toggleliked="toggleLiked"
            :likes="0"
            v-bind:liked="product.liked"
            :id="product.id"
            v-if="product.type !== 'giveaway'">
          </like-btn>
          <bookmark-btn
            v-on:togglebookmark="toggleBookmark"
            v-if="product.type === 'direct-sell'"
            :source="source"
            :index="index"
            :product="product">
          </bookmark-btn>
          <v-btn
            v-else
            icon large flat :color="product.wishlist ? 'primary' : 'grey lighten-1'">
            <v-icon>add_alert</v-icon>
          </v-btn>
          <add-to-cart-btn
            v-on:toggleshopcart="toggleShopcart"
            :shopcart="product.shopcart"
            :product="product"
            :source="source"
            :index="index"
            v-if="product.type === 'direct-sell'">
          </add-to-cart-btn>
          <v-btn
            icon
            flat
            v-if="product.type === 'auction'"
            color="grey">
            <v-icon>gavel</v-icon>
          </v-btn>
          <v-btn
            icon
            flat
            v-if="product.type === 'giveaway'"
            color="grey">
            <v-icon>person_add</v-icon>
          </v-btn>
          <v-speed-dial
            v-if="editable"
            v-model="fab"
            :bottom="true"
            :right="true"
            :direction="'top'"
            :open-on-hover="false"
            :transition="'slide-y-reverse-transition'">
            <v-btn
              small
              :style="{ 'position': 'relative', left: '15px', top: '15px' }"
              slot="activator"
              v-model="fab"
              color="grey"
              flat fab>
              <font-awesome-icon
                :style="{ 'position': 'relative', left: '5px' }"
                size="lg" color="grey" :icon="['fas', 'ellipsis-v']">
              </font-awesome-icon>
              <font-awesome-icon
                :style="{ 'position': 'relative', left: '-3px' }"
                size="lg" color="grey" :icon="['fas', 'times']">
              </font-awesome-icon>
            </v-btn>
            <v-btn
              :style="{ 'position': 'relative', left: '15px', top: '10px' }"
              fab dark
              small color="primary">
              <v-tooltip fixed left nudge-left="10">
                <font-awesome-icon slot="activator" :icon="['fas', 'edit']">
                </font-awesome-icon>
                <span>Edit product</span>
              </v-tooltip>
            </v-btn>
            <v-btn
              :style="{ 'position': 'relative', left: '10px', top: '5px' }"
              fab dark
              @click="deleteProduct(product.id)"
              small color="red">
              <v-tooltip fixed left>
                <font-awesome-icon slot="activator" :icon="['fas', 'trash']"></font-awesome-icon>
                <span>Delete product</span>
              </v-tooltip>
            </v-btn>
            <v-btn
              :style="{ 'position': 'relative', left: '10px', top: '1px' }"
              fab dark v-if="inShelve"
              @click="removeFromShelve"
              small color="red">
              <v-tooltip fixed left>
                <font-awesome-icon slot="activator" :icon="['fas', 'list-ul']"></font-awesome-icon>
                <span>Delete from <br> this shelve</span>
              </v-tooltip>
            </v-btn>
          </v-speed-dial>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import DetailsPopup from './DetailsPopup.vue';
import ProductTypeLabel from './Buttons/ProductTypeLabel.vue';
import LikeBtn from './Buttons/LikeBtn.vue';
import BookmarkBtn from './Buttons/BookmarkBtn.vue';
import AddToCartBtn from './Buttons/AddToCartBtn.vue';

export default {
  components: {
    'details-popup': DetailsPopup,
    'product-type-label': ProductTypeLabel,
    'like-btn': LikeBtn,
    'bookmark-btn': BookmarkBtn,
    'add-to-cart-btn': AddToCartBtn
  },
  name: 'ProductItem',
  props: [
    'product',
    'index',
    'source',
    'direction',
    'editable',
    'inShelve',
    'shelveName'
  ],
  data() {
    return {
      marked: false,
      hovered: false,
      fab: false
    }
  },
  computed: {
    ...mapState({
      dark: state => state.styles.dark
    }),
    cardDirection() {
      return {
        column: this.direction < 1,
        row: this.direction > 0
      }
    },
    titleOffset() {
      return {
        'offset-lg3': this.direction > 0,
        'offset-md4': this.direction > 0,
        'offset-sm4': this.direction > 0,
        'offset-xs6': this.direction > 0
      }
    },
    linkToProductDetails() {
      return {
        'text-decoration': 'none',
        color: this.dark ? 'white' : 'black'
      }
    }
  },
  methods: {
    onHover() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    },
    toggleLiked(e) {
      this.$emit('toggleliked', e)
    },
    toggleShopcart(e) {
      this.$emit('toggleshopcart', e)
    },
    toggleBookmark(e) {
      this.$emit('togglebookmark', e)
    },
    removeFromShelve(productId) {
      console.log('remove from shelve ', productId)
      this.$store.dispatch("userStore/removeFromShelve",
        { productId: productId, shelveName: this.shelveName })
        .then(() => {
          this.$emit('removefromgrid', productId)
        })
        .catch(err => console.log(err))
    },
    deleteProduct(productId) {
      console.log('delete product ', productId)
      this.$store.dispatch("userStore/deleteProduct",
        { productId: productId, shelveName: this.shelveName })
        .then(() => {
          this.$store.dispatch(
            this.inShelve ? "userStore/getStore" : "userStore/getAllProducts",
            this.$store.state.userStore.owner
          )
        })
        .catch(err => console.log(err))
    },
  }
}
</script>

<style>
</style>