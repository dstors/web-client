<template>
	<v-layout row wrap class="pa-5">
		<v-flex xs12 class="my-3" v-for="item in profileItems">
			<span class="subheading">
				{{ item.title }}
        <!-- <v-btn icon flat color="primary" style="float: right;">
          <v-icon>edit</v-icon>
        </v-btn> -->
      </span>
      <br>
      <span class="title">
        {{ profile[item.key] }}
      </span>
		</v-flex>
	</v-layout>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'account-info',
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
  },
  computed: {
    ...mapState({
      profile: state => state.profile
    })
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>