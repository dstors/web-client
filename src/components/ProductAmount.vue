<template>
  <v-container
    fluid
    style="margin-left: 10px;">
    <v-layout row wrap>
      <v-flex xs12>
        <font-awesome-icon
          v-on:mouseover="upColor = (value === 1) ? 'red' : '#90caf9'"
          v-on:mouseleave="upColor = '#cacaca'"
          :color="upColor" :size="(value === 1) ? 'md' : 'lg'"
          @click="decrease"
          :icon="value === 1 ? ['fas', 'trash'] : ['fas', 'angle-down']">
        </font-awesome-icon>
        <input
          class="title"
          @input="updateInput"
          :style="{
            'width': width,
            'border-radius': '5px',
            'border': '1px solid',
            'border-color': '#90caf9',
            'padding-left': '8px',
            'text-align': 'center'
          }"
          :value="value"
          type="number">
        </input>
        <font-awesome-icon
          v-on:mouseover="downColor = '#90caf9'"
          v-on:mouseleave="downColor = '#cacaca'"
          :color="downColor" size="lg"
          @click="increase"
          :icon="['fas', 'angle-up']">
        </font-awesome-icon>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'product-amount',
  props: ['value'],
  data() {
    return {
      width: '80px',
      upColor: '#cacaca',
      downColor: '#cacaca'
    }
  },
  methods: {
    updateInput() {
      this.$emit('input', this.value)
    },
    increase() {
      this.$emit('input', this.value + 1)
    },
    decrease() {
      if (this.value - 1 > 0) {
        this.$emit('input', this.value - 1)
      }
      else {
        this.$emit('deletefromcart');
      }
    }
  }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}
</style>