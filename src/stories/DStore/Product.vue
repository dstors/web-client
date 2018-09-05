<template>
  <v-layout row wrap>
    <v-flex xs6>
      <post-item :editable="true" @toggle-edition="toggleEdition" :post="editableProduct"></post-item>
    </v-flex>
    <v-flex xs6>
      <v-layout row wrap>
        <v-card>
          <v-card-title>
            <span class="font-weight-medium display-1">
              Edit product template
            </span>
          </v-card-title>
          <v-layout xs12 row wrap class="pa-3">
            <span class="title pb-1">Product name:</span>
            <v-flex xs12 class="pb-3">
              <v-text-field
                solo
                hide-details
                label="Product name"
                v-model="editableProduct.title"
              ></v-text-field>
            </v-flex>
            <span class="title pb-1">Price:</span>
            <v-flex xs12 class="pb-3">
              <v-flex d-inline-flex xs12>
                <v-text-field
                  solo
                  hide-details
                  label="Price"
                  v-model="splitPrice"
                ></v-text-field>
                <span class="headline pl-5">SBD</span>
              </v-flex>
            </v-flex>
            <span class="title pb-1">Image link:</span>
            <v-flex xs12 class="pb-3">
              <v-text-field
                solo
                hide-details
                label="Image link"
                v-model="editableProduct.image"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn primary @click="toggleEdition">Done</v-btn>
          </v-card-actions>
        </v-card>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import PostItem from '../PostItem.vue';

export default {
  components: { PostItem },
  name: 'product',
  props: ['dark', 'product'],
  data() {
    return {
      marked: false,
      edit: true,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-2' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      },
      hovered: false
    }
  },
  computed: {
    editableProduct: {
      get() {
        return this.product
      }
    },
    splitPrice: {
      get() {
        return this.product.price.split(' ')[0]
      },

      set(price) {
        this.product.price = price + ' SBD'
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
    toggleEdition() {
      this.edit = !this.edit
    }
  },
  mounted() {
    console.log(this.product)
  }
}
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
</style>