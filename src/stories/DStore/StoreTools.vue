<template>
  <v-navigation-drawer
    app
    permanent
    width="300"
    clipped>
    <v-list two-line class="pt-0">
      <v-list-group prepend-icon="tabs">
        <v-list-tile slot="activator">
          <v-list-tile-title>Tabs</v-list-tile-title>
        </v-list-tile>
        <draggable class="drag" v-model="config.tabs" :options="{group:'tabs'}">
          <template v-for="(tab, i) in config.tabs">
            <v-list-tile :key="i" @click="">
              <v-list-tile-content>
                <v-list-tile-title class="text--primary"> {{ tab.name }}</v-list-tile-title>
              </v-list-tile-content>
              <v-list-tile-action>
                <v-btn icon>
                  <v-icon>cancel</v-icon>
                </v-btn>
              </v-list-tile-action>
              <v-list-tile-action>
                <v-icon>drag_indicator</v-icon>
              </v-list-tile-action>
            </v-list-tile>
            <v-divider v-if="i < (config.tabs.length - 1)"></v-divider>
          </template>
        </draggable>
        <v-list-tile @click="">
          <v-list-tile-content>
            <v-btn color="primary">Add Tab</v-btn>
          </v-list-tile-content>
        </v-list-tile>
      </v-list-group>
      <v-list-group prepend-icon="extension">
        <v-list-tile slot="activator">
          <v-list-tile-title>Sections</v-list-tile-title>
        </v-list-tile>
        <v-text-field
          hide-details
          label="Search"
          class="ma-1 pa-1"
          solo>
        </v-text-field>
        <template v-for="(component, i) in components">
          <v-list-tile :key="i" class="section-item" @click="">
            <v-list-tile-content>
              <v-list-tile-title class="text--primary"> {{ component.name }}</v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon raised>
                <v-icon>
                  arrow_forward
                </v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
          <v-divider v-if="i < (components.length - 1)"></v-divider>
        </template>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import draggable from 'vuedraggable';
export default {
  components: { draggable },
  name: 'store-tools',
  props: [
    'config',
    'dark'
  ],
  data() {
    return {
      hovered: false,
      components: [
        { name: 'Collection' },
        { name: 'Contact Information' },
        { name: 'Location Information' },
        { name: 'Store Details' },
        { name: 'Product' },
        { name: 'Image with Text' },
        { name: 'Slideshow' }
      ],
      right: null
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');

.drag {
  width: 100%;
}

.section-item {
  border: solid 1px;
  border-radius: 15px;
  margin: 3px;
}
</style>