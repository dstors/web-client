<template>
  <v-layout px-3>
    <v-flex>
      <v-flex my-3>
        <v-overflow-btn
          clearable
          :items="countries"
          label="Select Country"
          v-model="country"
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
      msg: 'This is the browser',
      countries: ['a', 'b']
    }
  }
}
</script>