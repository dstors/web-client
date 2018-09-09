<template>
  <v-layout row wrap justify-end>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-btn
        slot="activator"
        flat icon right color="primary">
        <v-icon rigth>
          edit
        </v-icon>
      </v-btn>
      <v-card>
        <v-toolbar color="amber lighten-3">
          <v-btn icon dark @click.native="dialog = false">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>Settings</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon><v-icon color="red">delete</v-icon></v-btn>
          <v-btn color="primary" @click.native="dialog = false">Save</v-btn>
        </v-toolbar>
        <v-layout row wrap>
          <v-flex xs6 class="pa-3">
            <component
              :content="componentToEdit.content"
              :title="componentToEdit.title"
              :products="componentToEdit.products"
              :is="componentToEdit.name">
            </component>
          </v-flex>
          <v-flex xs6>
            <component
              :content="componentToEdit.content"
              :title="componentToEdit.title"
              :products="componentToEdit.products"
              :is="componentToEdit.name + '-editor'">
            </component>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Product from './Product.vue';
import ProductEditor from './ProductEditor.vue';
import Slideshow from './Slideshow.vue';
import SlideshowEditor from './SlideshowEditor.vue';
import Collection from './Collection.vue';
import CollectionEditor from './CollectionEditor.vue';
import ImageWithText from './ImageWithText.vue';
import ImageWithTextEditor from './ImageWithTextEditor.vue';
import ContactInfo from './ContactInfo.vue';
import ContactInfoEditor from './ContactInfoEditor.vue';
import LocationInfo from './LocationInfo.vue';
import LocationInfoEditor from './LocationInfoEditor.vue';
import StoreDetails from './StoreDetails.vue';
import StoreDetailsEditor from './StoreDetailsEditor.vue';
import ComponentEditor from './ComponentEditor.vue';


export default {
  components: {
    Product,
    ProductEditor,
    Slideshow,
    SlideshowEditor,
    Collection,
    CollectionEditor,
    ImageWithText,
    ImageWithTextEditor,
    ContactInfo,
    ContactInfoEditor,
    LocationInfo,
    LocationInfoEditor,
    StoreDetails,
    StoreDetailsEditor,
    ComponentEditor
  },
  name: 'component-editor',
  props: ['componentToEdit'],
  data () {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>