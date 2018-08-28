<template>
	<v-menu
    :dark="dark"
    v-model="menu"
    :close-on-content-click="true"
    :nudge-width="100"
    offset-x
    left
   >
    <template slot="activator">
      <v-flex class="px-2 d-inline-flex hidden-xs-and-down">
        <v-badge overlap bottom color="blue">
          <span slot="badge">2</span>
          <v-icon
            color="grey darken-2"
          >
            notifications
          </v-icon>
        </v-badge>
      </v-flex>
    </template>
    <v-card>
    <v-list color="amber">
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-sub-title>Notifications</v-list-tile-sub-title>
          <v-list-tile-title>You have 2 unread notifications</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-tooltip>
            <v-btn
              icon
              slot="activator"
              class="grey--text darken-3"
              @click=""
            >
              <v-icon>notifications</v-icon>
            </v-btn>
            <span>Check all notifications</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <v-divider></v-divider>

    <v-list two-line>
      <template
        v-for="(notification, i) in notifications">

        <v-list-tile
          :key="i"
          avatar
          @click=""
        >
          <v-list-tile-avatar>
            <img :src="notification.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-sub-title> {{ notification.from }} </v-list-tile-sub-title>
            <v-list-tile-title :class="notification.read ? 'text--secondary' : 'text--primary'"> {{ notification.item }} </v-list-tile-title>
            <v-list-tile-sub-title :class="notification.read ? '' : 'text--primary'">
              {{ typeof(notification.action) === 'string'
                  ? notification.action
                  : `${notification.action.user} ${notification.action.action} ${notification.action.lastBid}`
              }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-list-tile-action-text>{{ notification.date }}</v-list-tile-action-text>
            <v-icon>{{ types[notification.type].icon }}</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </template>
    </v-list>
  </v-card>
  </v-menu>
</template>

<script>

export default {
  name: 'notifications-popover',
  props: [
    'notifications',
    'dark'
  ],
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true,
      types: {
        giveaway : { label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-3' },
        auction: { label: 'Auction', icon: 'gavel', color: 'red' },
        'direct-sell': { label: 'Direct Sell', icon: 'attach_money', color: 'green' },
      },
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>