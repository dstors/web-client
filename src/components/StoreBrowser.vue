<template>
  <v-container fluid>
    <v-layout column wrap class="ma-0" v-if="storeIsEmpty">
      <v-flex xs12 :style="{ 'text-align': 'center', 'margin-top': '3px' }">
        <span class="display-3 font-weight-light">Woops!</span>
      </v-flex>
      <v-flex xs12 :style="{ 'text-align': 'center', 'margin-top': '100px' }">
        <div>
          <img :style="{
            'height': '250px',
            'position': 'relative',
            'bottom': '100px'
          }" :src="dstorsLogo" alt="DStors.com">
        </div>
        <span :style="{
            'position': 'relative',
            'bottom': '100px'
          }" class="display-1 font-weight-light">It looks like this user doesn't exist!</span>
      </v-flex>
    </v-layout>
    <v-layout v-else row wrap class="ma-3">
      <v-flex v-if="banner" xs12>
        <banner :src="banner"></banner>
      </v-flex>
      <v-flex xs12 :style="avatarTitleStyle">
        <avatar v-if="avatar" :src="avatar"
          size="120"
          radius="10">
        </avatar>
        <span :class="nameClass" :style="nameStyle">
          {{ name }}
          <span v-if="description" class="title font-weight-light" :style="descriptionStyle">
            <br>
            {{ description }}
          </span>
        </span>
      </v-flex>
      <v-flex v-if="['Store', 'StoreAll'].indexOf($route.name) > -1" xs12
        :style="storeActionsStyle">
        <form-layout v-if="active" stateModule="userStore">
          <v-btn flat slot="activator" class="text-capitalize">
            <font-awesome-icon :icon="['fas', 'store']" size="1x" class="mx-2"></font-awesome-icon>
            Edit Store Details
          </v-btn>
          <store-fields></store-fields>
        </form-layout>
        <form-layout stateModule="newProduct">
          <v-btn flat slot="activator" class="text-capitalize">
            <font-awesome-icon :icon="['fas', 'dollar-sign']" size="1x" class="mx-2"></font-awesome-icon>
            New Product
          </v-btn>
          <product-stepper @newproduct="refreshStoreData"></product-stepper>
        </form-layout>
      </v-flex>
      <v-flex xs12>
        <span :style="switchAllStyle">
          <router-link v-if="all && active && listings.length > 0" :to="{ name: 'StoreBrowser', params: { username: owner, all:false } }">
            See shelves
          </router-link>
          <router-link v-if="!all" :to="{ name: 'StoreBrowserAll', params: { username: owner, all: true } }">
            See all products
          </router-link>
        </span>
      </v-flex>
      <v-flex xs12 v-if="!active && feed.length < 1">
        <span class="display-4">There are no products on this store</span>
      </v-flex>
      <v-flex xs12 v-if="!all" v-for="(listing, i) in listings" :style="carouselStyle">
        <product-carousel
          @changename="changeShelveName(i, $event)"
          :editable="['Store', 'StoreAll'].indexOf($route.name) > -1"
          :source="`/store/product_list/get?name=${listing}&userName=${owner}`"
          :name="listing"
          :inShelve="true"
          :title="listing"
          :username="owner">
        </product-carousel>
      </v-flex>
      <product-grid
        :style="allProductsStyle"
        v-if="all"
        :editable="true"
        :hideToggleButtons="true"
        :products="feed">
      </product-grid>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import FormLayout from './FormLayout';
import ProductForm from './ProductForm';
import ProductStepper from './ProductStepper';
import StoreStepper from './StoreStepper';
import ProductGrid from './ProductGrid';
import ProductCarousel from './ProductCarousel';
import Avatar from './Avatar';
import Banner from './Banner';
import StoreFields from './StoreFields';
import dstorsLogo from './assets/DSTORS-LOGO.png';

export default {
  name: 'store-browser',
  components: {
    'form-layout': FormLayout,
    'product-form': ProductForm,
    'product-stepper': ProductStepper,
    'product-carousel': ProductCarousel,
    'product-grid': ProductGrid,
    'avatar': Avatar,
    'banner': Banner,
    'store-fields': StoreFields,
    'store-stepper': StoreStepper
  },
  props: ['username'],
  methods: {
    changeShelveName(i, newName) {
      this.$store.commit("userStore/changeListName", {
        index: i,
        newName
      })
    },
    refreshStoreData() {
      this.$store.dispatch('userStore/getStore', this.username || this.$store.state.userStore.owner)
        .then(() => {
            this.$store.dispatch('userStore/getAllProducts', { steemUsername: this.username })
        })
        .catch(err => console.log(err))
    }
  },
  computed: {
    ...mapState({
      name: state => state.userStore.name,
      listings: state => state.userStore.listings,
      description: state => state.userStore.description,
      banner: state => state.userStore.banner,
      avatar: state => state.userStore.avatar,
      active: state => state.userStore.active,
      owner: state => state.userStore.owner,
      feed: state => state.userStore.allProducts,
      storeIsEmpty: state => state.userStore.storeIsEmpty
    }),
    dstorsLogo() {
      return dstorsLogo;
    },
    all() {
      return this.$route.name === 'StoreBrowserAll'
    },
    storeActionsStyle() {
      let bottom = this.active ? 155 : 1;

      if (this.listings.length < 1) {
        bottom = 130
      }

      if (!this.banner && !this.avatar) {
        bottom = 45

        if (this.description) {
          bottom = 90
        }
      }

      if (!this.banner && this.avatar) {
        bottom = 140

        if (this.description) {
          bottom = 180
        }
      }

      if (this.banner && !this.avatar) {
        bottom = 30
      }

      return {
        'float': 'right',
        'bottom': bottom + 'px',
        'position': 'relative',
        'z-index': '1',
        'margin-left': '600px'
      }
    },
    switchAllStyle() {
      let bottom = this.active ? 110 : 100

      if (!this.banner && !this.avatar) {
        bottom = 120
      }

      if (!this.banner && this.avatar) {
        bottom = 110
      }

      if (this.banner && !this.avatar) {
        bottom = 120
      }

      return {
        'left': this.active ? '33px' : '10px',
        'bottom': bottom + 'px',
        'position': 'relative'
      }
    },
    carouselStyle() {
      let bottom = ['Store', 'StoreAll'].indexOf(this.$route.name) > -1 ? 196 : 100;

      if (this.listings.length < 1) {
        bottom = 145
      }

      if (!this.active) {
        bottom = 50
      }

      if (!this.banner && !this.avatar) {
        bottom = 40
      }

      if (!this.banner && this.avatar) {
        bottom = 120
      }

      if (this.banner && !this.avatar) {
        bottom = 30
      }

      return {
        'position': 'relative',
        'bottom': bottom + 'px'
      }
    },
    allProductsStyle() {
      let bottom = ['Store', 'StoreAll'].indexOf(this.$route.name) > -1 ? 196 : 100;

      if (this.listings.length < 1) {
        bottom = 145
      }

      if (!this.active) {
        bottom = 50
      }

      if (!this.banner && !this.avatar) {
        bottom = 40
      }

      if (!this.banner && this.avatar) {
        bottom = 20
      }

      if (this.banner && !this.avatar) {
        bottom = 30
      }

      return {
        'position': 'relative',
        'bottom': bottom + 'px'
      }
    },
    nameClass() {
      let display = 'display-1'

      if (this.banner && !this.description) {
        display = 'display-2'
      }

      return display + ' font-weight-light pa-1'
    },
    nameStyle() {
      let bottom = 80

      if(!this.description) {
          bottom = 50
        }

      if (!this.banner && !this.avatar) {
        bottom = 1
      }

      if (this.banner && !this.avatar) {
        bottom = 10

        if(!this.description) {
          bottom = 20
        }
      }

      return {
        position: 'relative',
        bottom: bottom + 'px',
        color: 'black'
      }
    },
    avatarTitleStyle() {
      let bottom = 80;
      let left = 30;

      if (!this.banner && !this.avatar) {
        bottom = 1
      }

      if (!this.banner && this.avatar) {
        bottom = 10
      }

      if (this.banner && !this.avatar) {
        bottom = 30
        left = 10
      }

      return {
        position: 'relative',
        bottom: bottom + 'px',
        left: left + 'px'
      }
    },
    descriptionStyle() {
      let left = 127

      if (!this.banner && !this.avatar) {
        left = 5
      }

      return {
        position: 'relative',
        left: left + 'px',
        bottom: '5px'
      }
    }
  },
  beforeRouteEnter(to, form, next){
    next(vm => {
      vm.$store.dispatch('userStore/getStore', {
        steemUsername: to.params.username || vm.$store.state.userStore.owner,
        redirectRoute: `/s/${to.params.username}/all`
      })
        .then(() => {
            vm.$store.dispatch('userStore/getAllProducts', { steemUsername: to.params.username })
        })
        .catch(err => console.log(err))
    })
  },
  beforeRouteUpdate(to, form, next){
    this.$store.dispatch('userStore/getStore', { steemUsername: to.params.username, redirectRoute: `/s/${to.params.username}/all` })
      .then(res => {
        if (to.params.all) {
          this.$store.dispatch('userStore/getAllProducts', { steemUsername: to.params.username })
        }
        next()
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>
</style>