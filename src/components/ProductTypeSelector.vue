<template>
  <v-container>
    <v-layout row wrap>
      <div>
        <span class="display-1 font-weight-light">What kind of offer is it?</span>
        <slot></slot>
      </div>
      <v-flex xs4 @click="type.disabled? '' : setType(type.value)" v-for="(type, i) in types">
        <v-card :style="{
            'text-align': 'center',
            height: '200px',
            'padding-top': '60px',
            'border':  type.value === productType ? `1px solid ${type.hoverColor}` : ''
          }"
          :key="i"
          v-on:mouseover="types[i].color = type.hoverColor"
          v-on:mouseleave="types[i].color = '#CACACA'"

          class="ma-2" :hover="!type.disabled">
          <font-awesome-icon :color="type.color" :icon="type.icon" size="4x"></font-awesome-icon>
          <br>
          <span :style="{ 'color' : type.color }">{{ type.label }}</span>
          <br>
          <span class="subheader" v-if="type.subheader" style="color: #8a8a8a">{{ type.subheader }}</span>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'product-type-selector',
  data() {
    return {
      directSellColor: '#cacaca'
    }
  },
  computed: {
    ...mapState({
      productType: state => state.newProduct.type,
      dark: state => state.styles.dark
    }),
    types() {
      return [
        {
          value: 'direct-sell',
          label: 'Direct Sell',
          icon: ['fas', 'dollar-sign'],
          color: '#5E9732',
          hoverColor: '#5E9732',
          disabled: false
        },
        {
          value: 'auction',
          label: 'Auction',
          icon: ['fas', 'gavel'],
          color: '#8a8a8a',
          hoverColor: '#CACACA',
          disabled: true,
          subheader: 'Coming Soon'
        },
        {
          value: 'giveaway',
          label: 'Giveaway',
          icon: ['fas', 'gift'],
          color: '#8a8a8a',
          hoverColor: '#CACACA',
          disabled: true,
          subheader: 'Coming Soon'
        }
      ]
    },
  },
  methods: {
    setType(value) {
      this.$store.dispatch('newProduct/setType', value);
    }
  }
}
</script>

<style></style>