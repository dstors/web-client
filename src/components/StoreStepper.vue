<template>
	<v-stepper :dark="dark" v-model="step" non-linear>
    <v-stepper-header>
      <v-stepper-step editable :complete="step > 1" step="1">
        Pick a plan
      </v-stepper-step>

      <v-divider></v-divider>

      <v-stepper-step editable :complete="step > 2" step="2">
        Describe your Store
      </v-stepper-step>


    </v-stepper-header>

    <v-stepper-items>

      <v-stepper-content step="1">
        <div style="text-align: center;">
          <span class="display-1 font-weight-light">Set up your dStor for FREE</span>
        </div>
        <v-container>
          <v-layout row wrap>
            <v-flex xs12 style="text-align: center;">
              <ul style="list-style-type: none;">
                <li :style="bulletStyle" class="headline font-weight-light">
                  <font-awesome-icon
                    color="green"
                    size="lg"
                    :style="{
                      'margin-right': '10px',
                      'margin-top': '50px'
                    }"
                    :icon="['far','check-circle']">
                  </font-awesome-icon>
                  List up to 20 products
                </li>
                <li :style="bulletStyle" class="headline font-weight-light">
                  <font-awesome-icon
                    color="green"
                    size="lg"
                    :style="{
                      'margin-right': '10px',
                      'margin-top': '50px'
                    }"
                    :icon="['far','check-circle']">
                  </font-awesome-icon>
                  Create shelves to place your products on
                </li>
                <li :style="bulletStyle" class="headline font-weight-light">
                  <font-awesome-icon
                    color="green"
                    size="lg"
                    :style="{
                      'margin-right': '10px',
                      'margin-top': '50px'
                    }"
                    :icon="['far','check-circle']">
                  </font-awesome-icon>
                  Start selling and managing your catalog
                </li>
              </ul>
              <br>
              <v-btn flat @click="toggleFormDialog">Cancel</v-btn>
              <v-btn
                large
                color="primary"
                @click="step = 2">
                Get Free Dstor
              </v-btn>
            </v-flex>
          </v-layout>
        </v-container>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-btn
          style="float: right;"
          color="primary"
          @click="updateStore">
          Activate your Store!
        </v-btn>
        <v-btn style="float: right;" flat @click="toggleFormDialog">Cancel</v-btn>
        <v-flex xs12 style="text-align: center;">
          <span class="display-1 font-weight-light">Describe your Store</span><br>
        </v-flex>
        <store-fields @updatestore="$emit('updatestore')" :hideControls="true"></store-fields>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import StoreFields from './StoreFields';

export default {
  name: 'store-stepper',
  components: {
    'store-fields': StoreFields
  },
  data() {
    return {
      step: 0
    }
  },
  computed: {
    ...mapState({
      dialog: state => state.dialog,
      dark: state => state.styles.dark,
      newProduct: state => state.newProduct
    }),
    bulletStyle() {
      return {
        'margin': '1px',
        'padding': '3px'
      }
    }
  },
  methods: {
    ...mapActions({
      toggleFormDialog: 'userStore/toggleFormDialog'
    }),
    updateStore() {
      this.$store.dispatch("userStore/updateStore")
        .then(() => {
          this.$store.dispatch("userStore/toggleFormDialog")
          this.$emit('updatestore')
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style>

</style>