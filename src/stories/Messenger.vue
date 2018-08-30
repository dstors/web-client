<template>
  <v-navigation-drawer
    app
    permanent
    width="400"
    clipped>
    <v-text-field
      hide-details
      label="Search"
      class="ma-1 pa-1"
      solo>
    </v-text-field>
    <v-list two-line class="pt-0">
      <v-template v-for="(message, i) in messages"
        :key="i">
        <v-list-tile @click="">
          <v-list-tile-avatar>
            <img :src="message.avatar">
          </v-list-tile-avatar>

          <v-list-tile-content>

            <v-list-tile-title :class="message.read ? 'text--secondary' : 'text--primary'"> {{ message.from }} <span class="caption">- {{ message.date }}</span> </v-list-tile-title>
            <v-list-tile-sub-title :class="message.read ? '' : 'text--primary'">
              {{ (message.message.length > 50) ? (message.message.slice(0, 40) + '...') : message.message }}
            </v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action v-if="!message.read">
            <!-- <v-list-tile-action-text>{{ message.date }}</v-list-tile-action-text> -->
            <v-btn
              small icon
              color="purple lighten-1"
              slot="activator">
              <span class="white--text">1</span>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
        <v-divider v-if="i < (messages.length - 1)"></v-divider>
      </v-template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'messenger',
  props: [
    'messages',
    'dark'
  ],
  data() {
    return {
      hovered: false,
      items: [
        { title: 'Home', icon: 'dashboard' },
        { title: 'About', icon: 'question_answer' }
      ],
      right: null
    }
  }
}
</script>


<style>
	@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>