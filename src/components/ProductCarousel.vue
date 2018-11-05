<template>
  <div class="ma-1"
    v-resize="onResize"
    v-on:mouseover="onHover"
    v-on:mouseleave="onLeave">
    <router-link
      :to="username
        ? { name: 'ListBrowser', params: { source: name, sourceRoute: source, title: title, username: username } }
        : { name: 'Browser', params: { source: name, sourceRoute: source, title: title } }"
      v-if="feed.length > 0"
      :style="{ color: dark ? 'white' : 'black' }"
      class="router-link display-1 mb-5 mt-5 ml-3">
      {{ title }}
    </router-link>
    <delete-shelve-btn
      v-if="editable && feed.length > 0"
      :shelveName="title">
    </delete-shelve-btn>
    <edit-shelve-popup
      @changename="changeShelveName"
      v-if="editable && feed.length > 0"
      :shelveName="title">
    </edit-shelve-popup>
    <v-carousel
      v-if="feed.length > 0"
      ref="ul"
      style="height: 100%!important; box-shadow: none"
      class="ma-0 pa-0"
      hide-delimiters
      :hide-controls="!hovered"
      :cycle="false">
      <v-carousel-item v-if="loading">
        <ghost-product-grid :hideToggleButtons="true"></ghost-product-grid>
      </v-carousel-item>
      <v-carousel-item v-show="!loading" v-for="(page, i) in computedFeed">
        <product-grid
          :inShelve="inShelve"
          @removefromgrid="removeFromGrid"
          :shelveName="title"
          :hideToggleButtons="true"
          :editable="editable"
          :key="i"
          source="products"
          :products="page">
        </product-grid>
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import ProductGrid from './ProductGrid';
import GhostProductGrid from './GhostProductGrid';
import DeleteShelveBtn from './Buttons/DeleteShelveBtn';
import EditShelvePopup from './Buttons/EditShelvePopup';
import api from '../api';
import { mapState } from 'vuex';

export default {
  name: 'product-carousel',
  components: {
    'product-grid': ProductGrid,
    'ghost-product-grid': GhostProductGrid,
    'delete-shelve-btn': DeleteShelveBtn,
    'edit-shelve-popup': EditShelvePopup
  },
  props: [
    'title',
    'pages',
    'name',
    'source',
    'username',
    'editable',
    'inShelve'
  ],
  data() {
    return {
      hovered: false,
      windowSize: {
        x: 0,
        y: 0
      },
      feed: [],
      loading: false
    }
  },
  computed: {
    ...mapState({
      dark: state => state.styles.dark
    }),
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
    changeShelveName(newName) {
      this.$emit('changename', newName)
    },
    removeFromGrid(productId) {
      this.feed = this.feed.filter(product => {
        return product.id !== productId;
      })
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
      this.loading = true;
      api().get(this.source)
        .then(res => {
          this.loading = false;
          this.feed = res.data;
        })
        .catch(err => {
          this.loading = false;
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
  background-color: rgba(255,255,255,0.25);
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
  -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
  box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
}

.v-carousel__prev .v-btn:hover, .v-carousel__next .v-btn:hover {
  background-color: rgba(255,255,255,1);
  -webkit-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
  -moz-box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
  box-shadow: 0px 0px 12px 0px rgba(0,0,0,0.75)!important;
}

.router-link {
  text-decoration: none;
  font-weight: 100;
  transition: color 0.5s;
}

.router-link:hover {
  color: #90caf9!important;
}
</style>