<template>
	<v-layout px-3>
    <v-flex
      style="width: 60px"
      >
      <v-flex>
        <v-range-slider
          v-model="price"
          :max="1000"
          :min="0"
          :step="0.1"
        ></v-range-slider>
      </v-flex>
      <v-text-field
        label="Min"
        class="mt-0"
        hide-details
        single-line
        type="number"
      ></v-text-field>
      <v-text-field
          label="Max"
          class="mt-0"
          hide-details
          single-line
          type="number"
        ></v-text-field>
    </v-flex>
	</v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'PriceFilter',
  data() {
    return {
      msg: 'This is the browser',
    }
  },
  computed: {
    price: {
      get() {
        return [
          this.$store.state.browserFilter.price.min,
          this.$store.state.browserFilter.price.max
        ]
      },
      set(newPrice) {
        this.$store.state.browserFilter.price.min = newPrice[0],
        this.$store.state.browserFilter.price.max = newPrice[1]
      }
    }
  }
}
</script>