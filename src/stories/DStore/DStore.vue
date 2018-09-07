<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <v-layout row wrap>
          <v-flex xs12>
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
                  <h1>{{ t.name }}</h1>
                  <v-expansion-panel>
                    <draggable class="drag" v-model="t.components" :options="{group: 'sections'}">
                      <v-expansion-panel-content
                        v-for="(component, i) in t.components"
                        :key="i">
                        <div slot="header">
                          {{ component.sectionName }}
                        </div>
                        <v-card>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <component-editor :componentToEdit="component"></component-editor>
                          </v-card-actions>
                          <v-card-text>
                            <component
                              :content="component.content"
                              :title="component.title"
                              :products="component.products"
                              :is="component.name">
                            </component>
                          </v-card-text>
                        </v-card>
                      </v-expansion-panel-content>
                    </draggable>
                  </v-expansion-panel>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon tile><v-icon color="red">delete</v-icon></v-btn>
                    <v-btn>Cancel</v-btn>
                    <v-btn color="primary">Save</v-btn>
                  </v-card-actions>
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
import draggable from 'vuedraggable';

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
    draggable,
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
	props: ['profile', 'posts', 'config'],
  data() {
    return {
      tab: null,
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');

.drag {
  width: 100%;
}
</style>