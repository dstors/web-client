<template>
  <v-container fluid>
    <v-layout row wrap class="ma-3">
      <v-flex xs12>
        <banner :src="banner"></banner>
      </v-flex>
      <v-flex xs12 style="position: relative; bottom: 80px; left: 30px;">
        <avatar :src="avatar"
          size="120"
          radius="10">
        </avatar>
        <span class="display-1 font-weight-light pa-1" style="position: relative; bottom: 80px; color: black;">
          {{ name }}
          <span class="title font-weight-light" style="position: relative; left: 127px; bottom: 5px;">
            <br>
            {{ description }}
          </span>
        </span>
      </v-flex>
      <v-flex v-if="['Store', 'StoreAll'].indexOf($route.name) > -1" xs12
        style="float: right; bottom: 155px; position: relative; z-index: 1; margin-left: 600px;">
        <form-layout stateModule="userStore">
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
          <product-stepper></product-stepper>
        </form-layout>
      </v-flex>
      <v-flex xs12>
        <span :style="{
            'left': '33px',
            'bottom': '210px',
            'position': 'relative'
          }">
          <router-link v-if="all" :to="{ name: 'Store', params: { username: owner, all: !all } }">
            See shelves
          </router-link>
          <router-link v-else :to="{ name: 'StoreAll', params: { username: owner, all: !all } }">
            See all products
          </router-link>
        </span>
      </v-flex>
      <v-flex xs12 v-if="!all" v-for="(listing, i) in listings" :style="{
        'position': 'relative',
        'bottom': ['Store', 'StoreAll'].indexOf($route.name) > -1 ? '196px' : '100px'
      }">
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
        :style="{
          'position': 'relative',
          'bottom': ['Store', 'StoreAll'].indexOf($route.name) > -1 ? '196px' : '100px'
        }"
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
import ProductGrid from './ProductGrid';
import ProductCarousel from './ProductCarousel';
import Avatar from './Avatar';
import Banner from './Banner';
import StoreFields from './StoreFields';

export default {
  name: 'store',
  components: {
    'form-layout': FormLayout,
    'product-form': ProductForm,
    'product-stepper': ProductStepper,
    'product-carousel': ProductCarousel,
    'product-grid': ProductGrid,
    'avatar': Avatar,
    'banner': Banner,
    'store-fields': StoreFields
  },
  props: ['username'],
  methods: {
    changeShelveName(i, newName) {
      this.$store.commit("userStore/changeListName", {
        index: i,
        newName
      })
    }
  },
  computed: {
    ...mapState({
      name: state => state.userStore.name,
      listings: state => state.userStore.listings,
      description: state => state.userStore.description,
      banner: state => state.userStore.banner,
      avatar: state => state.userStore.avatar,
      owner: state => state.userStore.owner,
      feed: state => state.userStore.allProducts
    }),
    all() {
      return this.$route.name === 'StoreAll'
    }
  },
  mounted() {
    this.$store.dispatch('userStore/getStore', this.username)
  },
  beforeRouteEnter(to, form, next){
    next(vm => {
      vm.$store.dispatch('userStore/getStore', to.params.username)
        .then(() => {
          if (to.params.all || to.name === 'StoreAll') {
            vm.$store.dispatch('userStore/getAllProducts', {
              steemUsername: to.params.username || vm.$store.state.userStore.owner
            })
          }

        })
        .catch(err => console.log(err))
    })
  },
  beforeRouteUpdate(to, form, next){
    console.log('update')
    this.$store.dispatch('userStore/getStore', to.params.username || this.$store.state.userStore.owner)
      .then(res => {
        if (to.params.all) {
          this.$store.dispatch('userStore/getAllProducts', to.params.username || this.$store.state.userStore.owner)
        }
        next()
      })
      .catch(err => console.log(err))
  }
}
</script>

<style>
</style>