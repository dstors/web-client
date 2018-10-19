<template>
  <div class="ma-1"
    v-resize="onResize"
    v-on:mouseover="onHover"
    v-on:mouseleave="onLeave">
    <span class="display-1 font-weight-light ma-5">
      {{ title }}
    </span>
    <v-carousel
      ref="ul"
      style="height: 100%!important; box-shadow: none"
      class="ma-0 pa-0"
      hide-delimiters
      :hide-controls="!hovered"
      :cycle="false">
      <v-carousel-item v-for="(page, i) in getPaginatedFeed">
        <product-grid :hideToggleButtons="true" :key="i" source="products" :products="page"></product-grid>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import ProductGrid from './ProductGrid'

export default {
  name: 'product-carousel',
  components: { ProductGrid },
  props: ['title', 'pages'],
  data() {
    return {
      hovered: false,
      windowSize: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    getPaginatedFeed() {
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

      let last_page = Math.ceil(this.pages.length/limitPerPage)

      for (var page = 0; page < last_page; page++) {
        let start_index = ((page+1)-1) * limitPerPage;
        result.push(this.pages.slice(start_index, start_index + limitPerPage))
      }

      return result;
    }
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
    }
  },
  mounted() {
    // this.$nextTick(function () {
    //   var lis = this.$refs.ul.$el.getElementsByTagName("li");
    //   console.log(lis);
    //   for (var i = 0, len = lis.length; i < len; i++) {
    //     console.log(lis[i].clientWidth); // do something
    //   }
    // });
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