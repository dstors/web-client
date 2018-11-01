<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="ma-5">
        <span class="display-1">
          {{ name }}
        </span>
        <br>
        <span class="title">
          {{ description }}
        </span>
        <v-spacer></v-spacer>
        <form-layout>
          <v-btn slot="activator">
            New Product
            <font-awesome-icon :icon="['fas', 'store']" size="lg" class="mx-2"></font-awesome-icon>
          </v-btn>
          <product-stepper></product-stepper>
        </form-layout>
      </v-flex>
      <v-flex xs12  v-for="listing in listings">
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

export default {
  name: 'store',
  components: {
    FormLayout,
    ProductForm,
    ProductStepper,
    ProductCarousel
  },
  computed: {
    ...mapState({
      name: state => state.userStore.name,
      listings: state => state.userStore.listings,
      description: state => state.userStore.description,
      owner: state => state.userStore.owner
    })
  },
  mounted() {
    this.$store.dispatch('userStore/getStore')
  }
}
</script>

<style></style>