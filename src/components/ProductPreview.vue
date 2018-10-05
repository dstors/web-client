<template>
  <preview-layout>
    <span slot="title">Preview Title</span>
    <template>
      <v-flex xs4 class="pa-3">
        <product-item :editable="true" @toggle-edition="toggleEdition" :product="editableProduct"></product-item>
      </v-flex>
      <v-flex xs8 class="pa-3 ml-3">
        <v-card-text>
          {{
            ($vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm')
              ? editableProduct.description.slice(0, 450) + '...'
              : editableProduct.description
          }}
        </v-card-text>
      </v-flex>
    </template>
  </preview-layout>
</template>

<script>
import ProductItem from './ProductItem.vue';
import PreviewLayout from './PreviewLayout.vue';

export default {
  components: { ProductItem, PreviewLayout },
  name: 'product-preview',
  props: ['dark', 'content', 'featured', 'title'],
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
        return this.$store.state.newProduct
      }
    },
    splitPrice: {
      get() {
        return this.$store.state.newProduct.price.split(' ')[0]
      },

      set(price) {
        this.$store.state.newProduct.price = price + ' SBD'
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
  }
}
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
</style>