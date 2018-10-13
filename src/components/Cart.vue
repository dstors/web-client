<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <v-list>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-sub-title>Cart</v-list-tile-sub-title>
              <v-list-tile-title>You have {{ cart.length }} items in your cart. Please carefully verify the list before buying.</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>

        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs8>
            <v-list two-line>
              <template
                v-for="(product, i) in cart">
                <v-list-tile
                  :key="i"
                  avatar
                  @click="">
                  <v-list-tile-avatar tile>
                    <img :src="product.pictures[0]">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title class="text--primary">
                      {{ (product.name.length > 30) ? (product.name.slice(0, 30) + '...') : product.name }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title class="blue--text">
                      <h3>{{ product.price }}</h3>
                    </v-list-tile-sub-title>
                  </v-list-tile-content>

                  <v-list-tile-action>
                    <v-flex xs12 sm6>
                      <v-text-field
                        label="0"
                        type="number"
                        single-line
                        solo flat
                      ></v-text-field>
                    </v-flex>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn icon flat color="red lighten-2">
                      <v-icon>bookmark</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <details-popup
                      :product="product"
                      :hovered="true"></details-popup>
                  </v-list-tile-action>
                  <v-list-tile-action>
                    <v-btn icon flat color="red">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </v-flex>
          <v-flex xs1>
            <v-divider vertical class="mx-1"></v-divider>
          </v-flex>
          <v-flex xs3>
            <v-layout align-content-space-around wrap fill-height>
              <v-flex xs12>
                <span class="grey--text pa1">Total:</span>
                <h2>{{ total }} SBD</h2>
                <v-list-tile-action>
                  <v-btn block color="primary">Buy now</v-btn>
                </v-list-tile-action>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import DetailsPopup from './DetailsPopup.vue';
import { mapState, mapGetters } from 'vuex';
import DeleteFromCartBtn from './Buttons/DeleteFromCartBtn';

export default {
  components: {
    'details-popup': DetailsPopup,
    'delete-form-cart-btn': DeleteFromCartBtn
  },
  name: 'cart',
  computed: {
    ...mapState({
      cart: state => state.cart,
      dark: state => state.styles.dark
    }),
    ...mapGetters({
      total: 'cartTotal'
    })
  },
  data() {
    return {
      hovered: false
    }
  }
}
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>