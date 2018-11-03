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
      <v-flex v-if="$route.name === 'Store'" xs12 style="float: right; bottom: 150px; position: relative; z-index: 999;">
        <form-layout stateModule="userStore">
          <v-btn flat slot="activator" class="text-capitalize">
            <font-awesome-icon :icon="['fas', 'store']" size="md" class="mx-2"></font-awesome-icon>
            Edit Store Details
          </v-btn>
          <store-fields></store-fields>
        </form-layout>
        <form-layout stateModule="newProduct">
          <v-btn flat slot="activator" class="text-capitalize">
            <font-awesome-icon :icon="['fas', 'dollar-sign']" size="md" class="mx-2"></font-awesome-icon>
            New Product
          </v-btn>
          <product-stepper></product-stepper>
        </form-layout>
      </v-flex>
      <v-flex xs12 v-for="listing in listings" :style="{'position': 'relative', 'bottom': $route.name === 'Store' ? '196px' : '100px'}">
        <product-carousel
          :source="`/store/product_list/get?name=${listing}&userName=${owner}`"
          :name="listing"
          :title="listing"
          :username="owner">
        </product-carousel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import FormLayout from './FormLayout';
import ProductForm from './ProductForm';
import ProductStepper from './ProductStepper';
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
    'avatar': Avatar,
    'banner': Banner,
    'store-fields': StoreFields
  },
  props: ['username'],
  computed: {
    ...mapState({
      name: state => state.userStore.name,
      listings: state => state.userStore.listings,
      description: state => state.userStore.description,
      banner: state => state.userStore.banner,
      avatar: state => state.userStore.avatar,
      owner: state => state.userStore.owner
    })
  },
  mounted() {
    this.$store.dispatch('userStore/getStore', this.username)
  }
}
</script>

<style>
</style>