<template>
  <v-stepper :dark="dark" v-model="step" non-linear>
    <v-stepper-header>
      <v-stepper-step editable :complete="step > 1" step="1">What are you going to publish?</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :editable="secondStepCondition" :complete="step > 2" step="2">Describe your product</v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step :editable="secondStepCondition && thirdStepCondition" step="3">Confirm</v-stepper-step>
    </v-stepper-header>

    <v-stepper-items>

      <v-stepper-content step="1">
        <div style="text-align: center; padding-right: 40px; padding-top: 10px;">
          <v-btn
            :disabled="!secondStepCondition"
            style="float: right;"
            color="primary"
            @click="step = 2">
            Continue
          </v-btn>
          <span class="display-1 font-weight-light">What kind of offer is it?</span>
          <v-btn style="float: right;" flat @click="toggleFormDialog">Cancel</v-btn>
        </div>
        <product-type-selector></product-type-selector>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-btn
          :disabled="!thirdStepCondition"
          style="float: right;"
          color="primary"
          @click="step = 3">
          Continue
        </v-btn>
        <v-btn style="float: right;" flat @click="toggleFormDialog">Cancel</v-btn>
        <v-flex xs12 style="text-align: center;">
          <span class="display-1 font-weight-light">Describe your product</span><br>
          <span class="caption font-weight-light" v-if="!thirdStepCondition">At least one picture, name and price are required</span>
        </v-flex>
        <product-fields></product-fields>


      </v-stepper-content>

      <v-stepper-content step="3">
        <v-btn
          style="float: right;"
          color="primary"
          @click="submitProduct">
          {{ newProduct.id === null ? 'Publish' : 'Edit' }} your product
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
import { mapState } from 'vuex';
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
      step: 0,
      directSellColor: '#cacaca'
    }
  },
  computed: {
    ...mapState({
      dialog: state => state.dialog,
      dark: state => state.styles.dark,
      newProduct: state => state.newProduct
    }),
    secondStepCondition() {
      return this.newProduct.type !== null
    },
    thirdStepCondition() {
      const {
        name,
        pictures
      } = this.newProduct

      return (
        (name !== '' && name !== undefined)
        && (pictures[0] !== '')
      )
    }
  },
  methods: {
    toggleFormDialog() {
      this.$store.dispatch('newProduct/toggleFormDialog')
        .then(() => {
          this.step = 1;
        })
        .catch(err => console.log(err))
    },
    submitProduct() {
      this.$store.dispatch('newProduct/createProduct')
        .then((res) => {
          this.step = 1;
          this.$store.state.newProduct.formDialog = false
          console.log('RES D RES')
          console.log(res)
          this.$emit('newproduct')
        })
        .catch(err => console.log(err))
    },
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