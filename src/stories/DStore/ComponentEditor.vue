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
          <v-toolbar-items>
            <v-btn dark flat @click.native="dialog = false">Save</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-layout row wrap>
          <v-flex xs6>
            <component
              :content="componentToEdit.content"
              :title="componentToEdit.title"
              :products="componentToEdit.products"
              :is="componentToEdit.name">
            </component>
          </v-flex>
          <v-flex xs6>
            <v-list three-line subheader>
              <v-subheader>General</v-subheader>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="notifications"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Notifications</v-list-tile-title>
                  <v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="sound"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Sound</v-list-tile-title>
                  <v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile avatar>
                <v-list-tile-action>
                  <v-checkbox v-model="widgets"></v-checkbox>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>Auto-add widgets</v-list-tile-title>
                  <v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import Product from './Product.vue';
import Slideshow from './Slideshow.vue';
import Collection from './Collection.vue';
import ImageWithText from './ImageWithText.vue';
import ContactInfo from './ContactInfo.vue';
import LocationInfo from './LocationInfo.vue';
import StoreDetails from './StoreDetails.vue';
import ComponentEditor from './ComponentEditor.vue';


export default {
  components: {
    Product,
    Slideshow,
    Collection,
    ImageWithText,
    ContactInfo,
    LocationInfo,
    StoreDetails,
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