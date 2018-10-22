<template>
	<v-container fluid>
   <v-layout row>
     <v-layout column>
       <v-flex>
        <v-card>
          <v-card-title class="display-1">
            {{ product.name }}
          </v-card-title>
          <v-card-text>
            <v-carousel
              :cycle="false">
              <v-carousel-item
                v-for="(picture,i) in product.pictures"
                v-if="picture !== ''"
                :key="i"
                :src="picture"
              ></v-carousel-item>
            </v-carousel>
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex>
        <v-card>
          <v-card-title class="display-1">
            Other products from same author
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex>
        <v-card>
          <v-card-title class="display-1">
            Offers/combinations
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex>
        <v-card>
          <v-card-title class="display-1">
            Characteristics
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex>
        <v-card>
          <v-card-title class="display-1">
            Description
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex>
        <v-card>
          <v-card-title class="display-1">
            Reviews
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex>
        <v-card>
          <v-card-title class="display-1">
            Q&A
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
     </v-layout>
     <v-layout column>
       <v-flex>
        <v-card>
          <v-card-title>
            This is a title
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
       <v-flex>
        <v-card>
          <v-card-title>
            This is a title
          </v-card-title>
          <v-card-text>
            This is some random text about something
          </v-card-text>
        </v-card>
       </v-flex>
     </v-layout>
   </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'product-details',
  props: ['product_id'],
  computed: {
    product() {
      let product;

      this.$store.state.productsFeed.map(prod => {
        if (prod.id == this.product_id) {
          product = prod;
        }

        return prod;
      });

      return product;
    }
  }
}
</script>

<style>

</style>