<template>
  <v-layout row wrap>
    <v-flex xs4>
      <component
        :content="componentToEdit.content"
        :title="componentToEdit.title"
        :products="componentToEdit.products"
        :is="componentToEdit.name + '-form'">
      </component>
    </v-flex>
    <v-flex xs8 class="pa-3">
      <component
        :content="componentToEdit.content"
        :title="componentToEdit.title"
        :products="componentToEdit.products"
        :is="componentToEdit.name + '-preview'">
      </component>
    </v-flex>
  </v-layout>
</template>


<script>
import ProductPreview from './ProductPreview.vue';
import ProductForm from './ProductForm.vue';
// import SlideshowPreview from './SlideshowPreview.vue';
// import SlideshowEditor from './SlideshowEditor.vue';
// import CollectionPreview from './CollectionPreview.vue';
// import CollectionEditor from './CollectionEditor.vue';
// import ImageWithTextPreview from './ImageWithTextPreview.vue';
// import ImageWithTextEditor from './ImageWithTextEditor.vue';
// import ContactInfoPreview from './ContactInfoPreview.vue';
// import ContactInfoEditor from './ContactInfoEditor.vue';
// import LocationInfoPreview from './LocationInfoPreview.vue';
// import LocationInfoEditor from './LocationInfoEditor.vue';
// import StoreDetailsPreview from './StoreDetailsPreview.vue';
// import StoreDetailsEditor from './StoreDetailsEditor.vue';

export default {
  components: {
    ProductPreview,
    ProductForm,
    // SlideshowPreview,
    // SlideshowEditor,
    // CollectionPreview,
    // CollectionEditor,
    // ImageWithTextPreview,
    // ImageWithTextEditor,
    // ContactInfoPreview,
    // ContactInfoEditor,
    // LocationInfoPreview,
    // LocationInfoEditor,
    // StoreDetailsPreview,
    // StoreDetailsEditor
  },
  name: 'component-editor',
  props: ['componentToEdit'],
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>