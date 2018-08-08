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
            <h3>Reputation:</h3>
            {{ $store.state.profile.reputation }}
            <h3>Voting Power:</h3>
            {{ ($store.state.profile.voting_power / 100).toFixed(2) }} %
            <h3>STEEM balance:</h3>
            {{ $store.state.profile.balance }}
            <h3>SBD balance:</h3>
            {{ $store.state.profile.sbd_balance }}
            <h3>Real Life Name:</h3>
            {{ $store.state.profile.realName }}
            <h3>About:</h3>
            {{ $store.state.profile.about }}
            <h3>Location:</h3>
            {{ $store.state.profile.location }}
          </div>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
	name: 'profile',
}
</script>