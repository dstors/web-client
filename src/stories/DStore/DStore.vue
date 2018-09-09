<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <v-layout row wrap>
          <v-flex xs12 v-show="!tabsOff">
            <v-tabs centered v-model="tab">
              <v-tabs-slider color="amber"></v-tabs-slider>
              <v-tab v-for="(t, i) in config.tabs" :key="i">
                {{ t.name }}
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-flex xs12>
            <v-tabs-items v-model="tab">
              <v-tab-item v-for="(t, i) in config.tabs" :key="i">
                <v-card flat class="pa-3 ma-3">
                  <template>
                    <v-card v-for="(component, i) in t.components"
                      :key="i">
                      <v-card-text>
                        <component
                          :content="component.content"
                          :title="component.title"
                          :products="component.products"
                          :is="component.name">
                        </component>
                      </v-card-text>
                      <v-divider></v-divider>
                    </v-card>
                  </template>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-flex>
          </v-tabs>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
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
	name: 'd-store',
	props: ['profile', 'posts', 'config', 'tabsOff', 'tab']
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');

.drag {
  width: 100%;
}
</style>