<template>
  <v-container fluid>
    <v-layout row wrap class="ma-3">
      <v-flex v-if="banner" xs12>
        <banner :src="banner"></banner>
      </v-flex>
      <v-flex xs12 v-if="avatar" style="position: relative; bottom: 80px; left: 30px;">
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
          <router-link v-if="all && active" :to="{ name: 'Store', params: { username: owner, all: !all } }">
            See shelves
          </router-link>
          <router-link v-if="!all" :to="{ name: 'StoreAll', params: { username: owner, all: !all } }">
            See all products
          </router-link>
        </span>
      </v-flex>
      <v-flex xs12>
        <span :style="{ 'position': 'relative', bottom: '50px' }" class="title font-weight-light">
          Looks like your Store is not activated yet. What are you waiting for?
        </span>
      </v-flex>
      <v-flex xs12>
        <form-layout v-if="!active" stateModule="userStore" :style="{ 'position': 'relative', bottom: '50px', 'float': 'left' }">
          <span slot="activator" class="title font-weight-light">Activate your Store now.</span>
          <store-stepper></store-stepper>
        </form-layout>
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
      feed: state => state.userStore.allProducts
    }),
    all() {
      return this.$route.name === 'StoreAll'
    },
    storeActionsStyle() {
      return {
        'float': 'right',
        'bottom': this.active ? '155px' : '1px',
        'position': 'relative',
        'z-index': '1',
        'margin-left': '600px'
      }
    },
    switchAllStyle() {
      return {
        'left': this.active ? '33px' : '10px',
        'bottom': this.active ? '210px' : '100px',
        'position': 'relative'
      }
    },
    allProductsStyle() {
      let bottom = ['Store', 'StoreAll'].indexOf(this.$route.name) > -1 ? '196px' : '100px';

      if (!this.active) {
        bottom = '50px'
      }

      return {
        'position': 'relative',
        'bottom': bottom
      }
    }
  },
  mounted() {
    this.$store.dispatch('userStore/getStore', this.username)
  },
  beforeRouteEnter(to, form, next){
    next(vm => {
      vm.$store.dispatch('userStore/getStore', to.params.username || vm.$store.state.userStore.owner)
        .then(() => {
            vm.$store.dispatch('userStore/getAllProducts', { steemUsername: to.params.username })
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