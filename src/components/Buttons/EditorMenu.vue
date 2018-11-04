<template>
  <v-speed-dial
    v-model="fab"
    :bottom="true"
    :right="true"
    :direction="'top'"
    :open-on-hover="false"
    :transition="'slide-y-reverse-transition'">
    <v-btn
      small
      :style="{ 'position': 'relative', left: '15px', top: '15px' }"
      slot="activator"
      v-model="fab"
      color="grey"
      flat fab>
      <font-awesome-icon
        :style="{ 'position': 'relative', left: '5px' }"
        size="lg" color="grey" :icon="['fas', 'ellipsis-v']">
      </font-awesome-icon>
      <font-awesome-icon
        :style="{ 'position': 'relative', left: '-3px' }"
        size="lg" color="grey" :icon="['fas', 'times']"></font-awesome-icon>
    </v-btn>
    <v-btn
      :style="{ 'position': 'relative', left: '15px', top: '10px' }"
      fab dark
      small color="primary">
      <v-tooltip fixed left nudge-left="10">
        <font-awesome-icon slot="activator" :icon="['fas', 'edit']">
        </font-awesome-icon>
        <span>Edit product</span>
      </v-tooltip>
    </v-btn>
    <v-btn
      :style="{ 'position': 'relative', left: '10px', top: '5px' }"
      fab dark
      small color="red">
      <v-tooltip fixed left>
        <font-awesome-icon slot="activator" :icon="['fas', 'trash']"></font-awesome-icon>
        <span>Delete product</span>
      </v-tooltip>
    </v-btn>
    <v-btn
      :style="{ 'position': 'relative', left: '10px', top: '1px' }"
      fab dark v-if="inShelve"
      small color="red">
      <v-tooltip fixed left>
        <font-awesome-icon slot="activator" :icon="['fas', 'list-ul']"></font-awesome-icon>
        <span>Delete from <br> this shelve</span>
      </v-tooltip>
    </v-btn>
  </v-speed-dial>
</template>

<script>
export default {
  name: 'editor-menu',
  props: [
    'inShelve'
  ],
  data() {
    return {
      fab: false
    }
  }
}
</script>