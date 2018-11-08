<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 v-if="!hideToggleButtons">
        <v-btn :disabled="true"></v-btn>
        <span style="float: right;">
          <v-btn-toggle>
            <v-btn :disabled="true">
              <font-awesome-icon size="lg" :icon="['fas', 'th']"></font-awesome-icon>
            </v-btn>
            <v-btn :disabled="true">
              <font-awesome-icon size="lg" :icon="['fas', 'th-list']"></font-awesome-icon>
            </v-btn>
          </v-btn-toggle>
        </span>
      </v-flex>
      <v-flex d-flex v-bind="gridDisplay" v-for="i in limit">
        <v-flex d-flex>
          <v-layout align-center row wrap>
            <v-flex
              d-flex
              xs12>
              <ghost-product-item>
              </ghost-product-item>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Vue from 'vue';

import GhostProductItem from './GhostProductItem';

import { mapState } from 'vuex';

export default {
  name: 'ghost-product-grid',
  components: {
    'ghost-product-item': GhostProductItem
  },
  props: ['hideToggleButtons'],
  computed: {
    ...mapState({
      dark: state => state.styles.dark
    }),
    limit() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return 1;
        case 'sm': return 3;
        case 'md': return 4;
        case 'lg': return 4;
        case 'xl': return 4;
      }
    },
    gridDisplay() {
      if (this.hideToggleButtons) {
        return {
          'xs12': true,
          'sm4': true,
          'md3': true
        }
      }
      else {
        return {
          'xs12': true,
          'sm6': true,
          'md4': true
        }
      }
    }
  }
}
</script>