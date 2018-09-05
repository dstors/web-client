<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-expansion-panel popout>
          <draggable class="drag" v-model="profileItems" :options="{group:'people'}">
            <v-expansion-panel-content
              v-for="(element, i) in profileItems"
              :key="i">
              <div slot="header">{{ element.name }}</div>
              <v-card>
                <v-card-text>
                  <product :product="posts[0]"></product>
                </v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </draggable>
          <v-btn color="primary" @click="profileItems.push({name:'aaa'})">Add Section</v-btn>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import draggable from 'vuedraggable';

import Product from './Product.vue';

export default {
  components: { draggable, Product },
	name: 'd-store',
	props: ['profile', 'posts'],
  data() {
    return {
      profileItems: [
        { name: 'Reputation', key: 'reputation' },
        { name: 'Voting Power', key: 'voting_power' },
        { name: 'STEEM Balance', key: 'balance' },
        { name: 'SBD Balance', key: 'sbd_balance' },
        { name: 'Real Life Name', key: 'realName' },
        { name: 'About', key: 'about' },
        { name: 'Location', key: 'location' }
      ],
      list: [{
        name: "John"
      }, {
        name: "Joao"
      }, {
        name: "Jean"
      }],
      list2: [{
        name: "Juan"
      }, {
        name: "Edgard"
      }, {
        name: "Johnson"
      }]
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