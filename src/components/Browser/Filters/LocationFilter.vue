<template>
  <v-layout px-3>
    <v-flex>
      <v-flex my-3>
        <v-overflow-btn
          clearable
          :items="$store.state.filters.location.country.items"
          label="Select Country"
          v-model="$store.state.filters.location.country.value"
        ></v-overflow-btn>
      </v-flex>
      <v-flex my-3 v-if="$store.state.filters.location.country.value">
      	<v-overflow-btn
      	  clearable
          :items="$store.state.filters.location.state.items"
          label="Select State"
          v-model="$store.state.filters.location.state.value"
        ></v-overflow-btn>
      </v-flex>
      <v-flex my-3 v-if="$store.state.filters.location.state.value">
      	<v-overflow-btn
      	  clearable
          :items="$store.state.filters.location.city.items"
          label="Select City"
          v-model="$store.state.filters.location.city.value"
        ></v-overflow-btn>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'LocationFilter',
  data() {
    return {
      msg: 'This is the browser'
    }
  }
}
</script>