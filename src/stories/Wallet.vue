<template>
	<v-layout row wrap>
		<v-flex xs6 md8 class="my-3 pa-2">
      <v-list>
        <v-list-tile
          avatar
          @click="">
          <v-list-tile-avatar size="27" tile>
            <img src="https://cdn.iconscout.com/icon/free/png-256/steem-1-645826.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="text--primary"> Steem </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>
              <span class="title primary--text">15.563 STEEM</span>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile
          avatar
          @click="">
          <v-list-tile-avatar tile>
            <v-icon large>flash_on</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="text--primary"> Steem Power </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>
              <span class="title primary--text">1.796 SP (+13.212 SP)</span>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
        <v-list-tile
          avatar
          @click="">
          <v-list-tile-avatar tile>
            <v-icon large>attach_money</v-icon>
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="text--primary"> Steem Dollar </v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>
              <span class="title primary--text">65.114 SBD</span>
            </v-list-tile-action-text>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>
    </v-flex>
		<v-flex xs6 md4 class="my-3 px-5 py-2">
			<v-card tile>
				<v-card-title primary-title>
					<v-icon class="pr-2">trending_up</v-icon><span class="">Market</span>
          <v-spacer></v-spacer>
          <v-icon>refresh</v-icon>
				</v-card-title>
        <v-divider></v-divider>

        <v-layout xs12 row wrap class="pa-3">
          <v-flex xs12>
            <span class="headline font-weight-light">Steem</span>
          </v-flex>
          <v-flex xs12>
            <span class="primary--text headline font-weight-medium">$0.96</span>
            <span class="hide-sm-and-down green--text font-weight-medium">(1.87%) <v-icon class="green--text font-weight-medium body-2">arrow_drop_up</v-icon></span>
          </v-flex>
          <v-flex xs12>
            <span class="grey--text font-weight-medium">0.0001363 BTC</span>
            <span class="green--text font-weight-medium">(1.39%) <v-icon class="green--text font-weight-medium body-2">arrow_drop_up</v-icon></span>
          </v-flex>
        </v-layout>

        <v-layout xs12 row wrap class="pa-3">
            <v-flex xs12>
              <span class="headline font-weight-light">Steem Dollar</span>
            </v-flex>
            <v-flex xs12>
              <span class="primary--text headline font-weight-medium">$1.00</span>
              <span class="hide-sm-and-down green--text font-weight-medium">(1.03%) <v-icon class="green--text font-weight-medium body-2">arrow_drop_up</v-icon></span>
            </v-flex>
            <v-flex xs12>
              <span class="grey--text font-weight-medium">0.0001415 BTC</span>
              <span class="green--text font-weight-medium">(0.57%) <v-icon class="green--text font-weight-medium body-2">arrow_drop_up</v-icon></span>
            </v-flex>
        </v-layout>

			</v-card>
		</v-flex>
	</v-layout>
</template>

<script>
export default {
	name: 'wallet'
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>