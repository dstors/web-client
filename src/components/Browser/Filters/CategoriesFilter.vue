<template>
  <v-layout px-3>
    <v-flex>
      <v-flex my-3>
        <v-overflow-btn
          clearable
          :items="$store.state.filters.categories.items"
          label="Main Category"
          v-model="$store.state.filters.categories.value"
        ></v-overflow-btn>
      </v-flex>
      <v-flex my-3>
        <v-select
            v-model="$store.state.filters.categories.tags.value"
            :items="$store.state.filters.categories.tags.items"
            attach
            chips
            label="Tags"
            multiple
          ></v-select>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'categories-filter',
  data() {
    return {
      msg: 'This is the browser'
    }
  }
}
</script>