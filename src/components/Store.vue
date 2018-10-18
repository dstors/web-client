<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <v-card-title primary-title>
          <h2>{{ name }}</h2>
          {{ description }}
        </v-card-title>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card flat class="pa-3 ma-3">
              <v-card>
                <v-card-text>
                  Whatever it is, it goes here
                </v-card-text>
                <v-divider></v-divider>
              </v-card>
            </v-card>
          </v-flex>
          </v-tabs>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'store',
  computed: {
    ...mapState({
      name: state => state.userStore.name,
      description: state => state.userStore.description
    })
  },
  mounted() {
    this.$store.dispatch('userStore/getStore')
  }
}
</script>

<style></style>