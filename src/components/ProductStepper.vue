<template>
  <v-stepper :dark="dark" v-model="e1" non-linear>
    <v-stepper-header>
      <v-stepper-step editable :complete="e1 > 1" step="1">What are you going to publish?</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step editable :complete="e1 > 2" step="2">Describe your product</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step editable step="3">Confirm</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-btn
          style="float: right;"
          color="primary"
          @click="e1 = 2"
        >
          Continue
        </v-btn>

        <v-btn style="float: right;" flat @click="toggleFormDialog">Cancel</v-btn>
        <product-type-selector></product-type-selector>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-btn
          style="float: right;"
          color="primary"
          @click="e1 = 3"
        >
          Continue
        </v-btn>
        <v-btn style="float: right;" flat @click="toggleFormDialog">Cancel</v-btn>
        <v-flex xs12 style="text-align: center;">
          <span class="display-1 font-weight-light">Describe your product</span><br>
        </v-flex>
        <product-fields></product-fields>


      </v-stepper-content>

      <v-stepper-content step="3">
        <v-btn
          style="float: right;"
          color="primary"
          @click="submitProduct">
          Publish your product
        </v-btn>
        <v-btn style="float: right;" flat @click="toggleFormDialog">Cancel</v-btn>
        <product-preview></product-preview>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>


<script>
import ProductPreview from './ProductPreview.vue';
import ProductFields from './ProductFields.vue';
import { mapState, mapActions } from 'vuex';
import ProductTypeSelector from './ProductTypeSelector.vue';

export default {
  components: {
    ProductPreview,
    ProductFields,
    ProductTypeSelector
  },
  name: 'product-stepper',
  data () {
    return {
      componentToEdit: { name: 'product' },
      e1: 0,
      directSellColor: '#cacaca'
    }
  },
  computed: {
    ...mapState({
      dialog: state => state.dialog,
      dark: state => state.styles.dark
    })
  },
  methods: {
    ...mapActions({
      toggleFormDialog: 'newProduct/toggleFormDialog'
    }),
    submitProduct() {
      this.$store.dispatch('newProduct/createProduct');
      this.$store.state.newProduct.formDialog = false
    }
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');

.fields {
  overflow-y: scroll;
  max-height: 535px;
}

.black-to-green {
  color: #cacaca;
  transition: color 0.5s;
}

.black-to-green:hover {
  color: #5E9732;
}
</style>