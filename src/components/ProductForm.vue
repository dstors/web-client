<template>
  <v-layout row wrap>
    <v-flex xs5 class="fields">
      <product-fields></product-fields>
    </v-flex>
    <v-flex xs7 class="pa-3">
      <product-preview></product-preview>
      <div style="float: right;">
        <v-btn icon><v-icon color="red">delete</v-icon></v-btn>
        <v-btn color="primary" @click.native="submitProduct">Save</v-btn>
      </div>
    </v-flex>
  </v-layout>
</template>


<script>
import ProductPreview from './ProductPreview.vue';
import ProductFields from './ProductFields.vue';
import { mapState } from 'vuex';

export default {
  components: {
    ProductPreview,
    ProductFields,
  },
  name: 'product-form',
  data () {
    return {
      componentToEdit: { name: 'product' }
    }
  },
  computed: {
    ...mapState({
      dialog: state => state.dialog
    })
  },
  methods: {
    submitProduct() {
      this.$store.dispatch('newProduct/createProduct');
      this.$store.state.formDialog = false
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
</style>