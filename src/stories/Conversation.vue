<template>
  <v-card height="100%" class="ma-0 pa-0">
    <v-container class="pt-0 pl-0 pr-0 pb-0">
      <v-layout row wrap class="conversation-box grey lighten-3">
        <v-flex xs12 v-for="(message, i) in conversation">
          <v-flex v-if="message.divider" offset-xs1 offset-sm3 offset-md5>
            <v-card width="100px"
              color="light-blue lighten-3"
              :key="i"
              class="ma-1 mx-5 mt-2 pa-1 px-3 date-divider">
              <v-card-text class="pa-0 text-xs-center">
                <span class="caption">{{ message.date.toLowerCase() }}</span>
              </v-card-text>
            </v-card>
          </v-flex>
          <v-card v-else width="auto"
            :color="message.from === 'julianmnst' ? 'light-green lighten-4' : ''"
            hover
            :style="[message.from === 'julianmnst' ? {'float': 'right'} : {'float': 'left'}, { 'min-width': '125px' }]"
            :key="i"
            class="ma-1 mx-5 mt-2 pa-1 px-3 msg-box">
            <v-card-title
              v-if="message.from !== 'julianmnst'"
              primary-title class="pa-0">
              <h4>{{ message.from }}</h4>
            </v-card-title>
            <v-card-text class="pa-0">
              <span :class="message.action ? 'font-weight-black' : ''">{{ message.msg }}</span>
            </v-card-text>
            <v-card-action>
              <v-btn v-if="message.action && message.actionMessage"
                small
                :disabled="!message.pendingAction"
                color="primary">
                {{ message.actionMessage }}
              </v-btn>
              <v-spacer></v-spacer>
              <span style="float: right;" class="caption grey--text">{{ message.time }}</span>
            </v-card-action>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-bottom-nav
      color="grey lighten-3"
      :value="true"
      absolute
      shift>
      <v-layout class="px-3 py-1" row wrap>
        <v-flex xs11>
          <v-text-field
            hide-details
            @click:append-outer=""
            label="Message"
            class="message-input"
            solo flat>
              <v-icon class="pl-3" slot="append-outer">send</v-icon>
            </v-text-field>
        </v-flex>
      </v-layout>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  name: 'conversation',
  props: [
    'conversation',
    'dark'
  ],
  data() {
    return {
      hovered: false,
    }
  }
}
</script>


<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
.conversation-box {
  position: absolute;
  height: 89%;
  overflow: auto;
}

.v-card .msg-box {
  border-radius: 10px;
}

.message-input > .v-input__control > .v-input__slot {
  border-radius: 50px !important;
}

.v-card .date-divider {
  border-radius: 100px;
}
</style>