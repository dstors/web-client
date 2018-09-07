<template>
  <v-layout row wrap>
    <v-flex xs6>
      <post-item :editable="true" @toggle-edition="toggleEdition" :post="editableProduct"></post-item>
    </v-flex>
    <v-flex xs6>
      <v-layout row wrap>
        <v-card>
          <v-layout xs12 row wrap>
            <v-flex xs12>
              <v-card-text>
                {{
                  ($vuetify.breakpoint.name === 'xs' || $vuetify.breakpoint.name === 'sm')
                    ? editableProduct.description.slice(0, 450) + '...'
                    : editableProduct.description
                }}
              </v-card-text>
            </v-flex>
          </v-layout>
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
  props: ['dark', 'content', 'featured'],
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
        return this.content
      }
    },
    splitPrice: {
      get() {
        return this.content.price.split(' ')[0]
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
    console.log(this.content)
  }
}
</script>

<style type="text/css">
@import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons");
</style>