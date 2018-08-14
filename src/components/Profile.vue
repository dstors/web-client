<template>
  <v-layout>
    <v-flex>
      <v-card width="600px">
        <v-card-media
          :src="$store.state.profile.cover_image"
          height="200px"
        ></v-card-media>
        <v-card-title primary-title>
          <div>
            <h3 class="headline mb-0">{{ $store.state.profile.name }}'s profile</h3>
            <draggable v-model="profileItems" :options="{group:'people'}" @start="drag=true" @end="drag=false">
              <div v-for="element in profileItems" :key="element.id">
                <h3>{{ element.title }}:</h3>
                {{ $store.state.profile[element.key] }}
              </div>
            </draggable>
            <h3>Voting Power:</h3>
            {{ ($store.state.profile.voting_power / 100).toFixed(2) }} %
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
	name: 'profile',
  data() {
    return {
      profileItems: [
        { title: 'Reputation', key: 'reputation' },
        { title: 'Voting Power', key: 'voting_power' },
        { title: 'STEEM Balance', key: 'balance' },
        { title: 'SBD Balance', key: 'sbd_balance' },
        { title: 'Real Life Name', key: 'realName' },
        { title: 'About', key: 'about' },
        { title: 'Location', key: 'location' }
      ]
    }
  }
}
</script>