<template>
	<v-layout column wrap>
    <v-flex xs12>
      <span class="title">
        Price
      </span>
    </v-flex>
    <v-layout row wrap>
      <v-flex class="pa-1" xs5>
        Min
        <v-text-field
          label="Min"
          hide-details
          solo flat
          v-model="price[0]"
          single-line
          type="number">
        </v-text-field>
      </v-flex>
      <v-flex class="pa-1" xs5>
        Max
        <v-text-field
          label="Max"
          hide-details
          solo flat
          v-model="price[1]"
          single-line
          type="number">
        </v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn :style="{ 'position': 'relative', 'top': '25px' }" icon>
          <font-awesome-icon :icon="['fas', 'angle-right']">
          </font-awesome-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <v-flex xs12>
      Currency
      <v-select
        :items="['SBD','STEEM']"
        label="Currency"
        class="pt-2"
        clearable
        color="orange"
        solo flat>
      </v-select>
    </v-flex>
	</v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'price-filter',
  data() {
    return {
      msg: 'This is the browser',
    }
  },
  computed: {
    ...mapState({
      currency: state => state.browserFilter.currency
    }),
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