<template>
	<v-layout column wrap>
    <v-flex xs12>
      <span class="title">
        Price
      </span>
    </v-flex>
    <v-layout row wrap>
      <v-flex class="pa-1" xs4>
        Min
        <v-text-field
          label="Min"
          hide-details
          solo flat
          v-model="priceMin"
          single-line
          type="number">
        </v-text-field>
      </v-flex>
      <v-flex class="pa-1" xs4>
        Max
        <v-text-field
          label="Max"
          hide-details
          solo flat
          v-model="priceMax"
          single-line
          type="number">
        </v-text-field>
      </v-flex>
      <v-flex xs4>
        <v-layout :style="{ 'position': 'relative', 'top': '30px' }" row wrap>
          <v-flex xs6>
            <v-btn small @click="clearPrice" icon>
              <font-awesome-icon :icon="['fas', 'window-close']">
              </font-awesome-icon>
            </v-btn>
          </v-flex>
          <v-flex xs6>
            <v-btn @click="filterSearch" small icon>
              <font-awesome-icon :icon="['fas', 'angle-right']">
              </font-awesome-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-flex xs12>
      Currency
      <v-select
        :items="['SBD','STEEM']"
        label="Currency"
        class="pt-2"
        clearable
        v-model="currency"
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
    priceMin: {
      get() {
        return this.$store.state.browserFilter.priceMin
      },
      set(newPrice) {
        this.$store.state.browserFilter.priceMin = newPrice
      }
    },
    priceMax: {
      get() {
        return this.$store.state.browserFilter.priceMax
      },
      set(newPrice) {
        this.$store.state.browserFilter.priceMax = newPrice
      }
    },
    currency: {
      get() {
        return this.$store.state.browserFilter.currency
      },
      set(currency) {
        this.$store.state.browserFilter.currency = currency
      }
    }
  },

  watch: {
    currency(val) {
      this.$store.state.browserFilter.currency = (val === undefined) ? null : val;
      this.$store.dispatch("getBrowserFeed")
    }
  },

  methods: {
    clearPrice() {
      this.$store.commit("browserFilter/clearPrice")
    },
    filterSearch() {
      this.$store.dispatch("getBrowserFeed")
    }
  }

}
</script>