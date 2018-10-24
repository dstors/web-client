<template>
  <div class="ma-1"
    v-resize="onResize"
    v-on:mouseover="onHover"
    v-on:mouseleave="onLeave">
    <span
      v-if="feed.length > 0"
      class="display-1 font-weight-light ma-5">
      {{ title }}
    <router-link
      v-if="feed.length > 0"
      class="title font-weight-light"
      v-bind:style="{ float: 'right', 'margin-right': '45px', 'text-decoration': 'underline' }"
      :to="{ name: 'Browser', params: { source: name, sourceRoute: source, title: title } }">
      View more
      <font-awesome-icon :icon="['fas', 'long-arrow-alt-right']"></font-awesome-icon>
    </router-link>
    </span>
    <v-carousel
      v-if="feed.length > 0"
      ref="ul"
      style="height: 100%!important; box-shadow: none"
      class="ma-0 pa-0"
      hide-delimiters
      :hide-controls="!hovered"
      :cycle="false">
      <v-carousel-item v-for="(page, i) in computedFeed">
        <product-grid :hideToggleButtons="true" :key="i" source="products" :products="page"></product-grid>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import ProductGrid from './ProductGrid'
import api from '../api';

export default {
  name: 'product-carousel',
  components: { ProductGrid },
  props: [
    'title',
    'pages',
    'name',
    'source'
  ],
  data() {
    return {
      hovered: false,
      windowSize: {
        x: 0,
        y: 0
      },
      feed: []
    }
  },
  computed: {
    computedFeed() {
      return this.paginateFeed(this.feed)
    },
  },
  methods: {
    onHover() {
      this.hovered = true;
    },
    onLeave() {
      this.hovered = false;
    },
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
    paginateFeed(feed) {
      let result = [];

      let limitPerPage;

      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          limitPerPage = 1;
          break;
        case 'sm':
          limitPerPage = 3;
          break;
        case 'md':
          limitPerPage = 4;
          break;
        case 'lg':
          limitPerPage = 4;
          break;
        case 'xl':
          limitPerPage = 4;
          break;
      }

      let last_page = Math.ceil(feed.length/limitPerPage)

      for (var page = 0; page < last_page; page++) {
        let start_index = ((page+1)-1) * limitPerPage;
        result.push(feed.slice(start_index, start_index + limitPerPage))
      }

      return result;
    }
  },
  mounted() {
    if (this.pages === undefined && this.source) {
      api().get(this.source)
        .then(res => {
          this.feed = res.data
        })
        .catch(err => {
          this.feed = [];
        })
    }
    else if (this.pages) {
      this.feed = this.pages
    }
  },
}
</script>

<style>
.v-carousel__prev .v-btn, .v-carousel__next .v-btn {
    color: blue!important;
    background-color: rgba(255,255,255,0.75);
    -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
    -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
    box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
}
</style>