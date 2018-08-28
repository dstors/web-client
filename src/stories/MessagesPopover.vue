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
      <v-badge overlap color="red" bottom>
        <span slot="badge">1</span>
        <v-icon
          @click=""
          color="grey darken-2"
        >
          mail
        </v-icon>
      </v-badge>
    </v-flex>
   </template>
    <v-card>
      <v-list>
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-sub-title>Recent conversations</v-list-tile-sub-title>
            <v-list-tile-title>You have 1 unread conversations</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-tooltip>
              <v-btn
                icon
                slot="activator"
                class="grey--text darken-3"
                @click=""
              >
                <v-icon>message</v-icon>
              </v-btn>
              <span>Check all conversations</span>
            </v-tooltip>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-divider></v-divider>

      <v-list>
        <template
          v-for="(message, i) in messages">

          <v-list-tile
            :key="i"
            avatar
            @click=""
          >
            <v-list-tile-avatar>
              <img :src="message.avatar">
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title :class="message.read ? 'text--secondary' : 'text--primary'"> {{ message.from }} </v-list-tile-title>
              <v-list-tile-sub-title :class="message.read ? '' : 'text--primary'">
                {{ (message.message.length > 40) ? (message.message.slice(0, 30) + '...') : message.message }}
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-list-tile-action-text>{{ message.date }}</v-list-tile-action-text>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>

export default {
  name: 'messages-popover',
  props: [
    'messages',
    'dark'
  ],
  data() {
    return {
      fav: true,
      menu: false,
      message: false,
      hints: true
    }
  },
  created() {
    console.log(this.messages)
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>