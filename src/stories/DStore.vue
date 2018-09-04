<template>
  <v-layout row wrap>
    <v-flex xs12 class="my-3 pa-2">
      <div>
        So, we'll do this:

        We'll have several predefined components:
        <ol>
          <li>
            <strong>Layouts</strong>, such as:
              <ul>
                <li>Home</li>
                <li>Catalog</li>
                <li>About</li>
              </ul>
          </li>
          <li>
            <strong>Widgets</strong> specific for each layout, such as:
            <ul>
              <li>featured product</li>
              <li>blog posts</li>
              <li>collections</li>
              <li>featured collections</li>
              <li>slideshow</li>
              <li>image with text overlay</li>
            </ul>
          </li>
        </ol>
      </div>
      <!-- <draggable v-model="profileItems" :options="{group:'people'}" @start="drag=true" @end="drag=false">
        <div v-for="element in profileItems">
          {{ element.name }}
        </div>
      </draggable>
      <h2>List 1 Draggable</h2>
        <draggable v-model="list" class="dragArea" :options="{group:'people'}">
        <div v-for="element in list">{{element.name}}</div>
        </draggable>
      <h2>List 2 Draggable</h2>
        <draggable v-model="list2" class="dragArea" :options="{group:'people'}">
        <div v-for="element in list2">{{element.name}}</div>
        </draggable> -->
    </v-flex>
  </v-layout>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: { draggable },
	name: 'd-store',
	props: ['profile'],
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
</style>