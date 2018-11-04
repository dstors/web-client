<template>
  <v-container class="landing" fluid>
    <v-layout
        column
        align-center
        justify-center
        fill-height>
        <img width="70%" style="position: relative; bottom: 70px;" :src="logo" alt="">
        <!-- <span class="mb-2 text-xs-center display-4" style="color: #cacaca; position: relative; bottom: 70px;">Dstors</span> -->
        <span class="display-1 font-weight-light mb-3 text-xs-center"
          style="color: #cacaca; position: relative; bottom: 120px; left: 120px;">
          Powered by Steem Blockchain
        </span>
        <span class="mb-2 text-xs-center font-weight-light display-3" style="color: #cacaca; position: relative; bottom: 70px;">
          Coming soon
        </span>
    </v-layout>
    <v-layout row wrap :style="{'float': 'right'}">
      <a class="discord-link" href="https://discord.gg/a6F5PkQ" :style="{
        'text-decoration': 'none'
      }">
        <font-awesome-icon size="3x" :icon="['fab', 'discord']"></font-awesome-icon>
        <span class="display-1 font-weight-light"
          :style="{ 'bottom': '5px', 'position': 'relative', 'left': '5px' }">
          Join us on Discord
        </span>
      </a>
      <!-- <a href="">Steemit blog</a> -->
    </v-layout>
    <!-- <v-layout row wrap>
      <v-flex v-for="(link, i) in links" :key="`6${i}`" xs6>
        <v-layout
            column
            align-center
            justify-center
            class="black--text">
            <h1 class="mb-2 text-xs-center custom-title">{{ link.title }}</h1>
            <div class="subheading mb-3 text-xs-center">{{ link.description }}</div>
            <router-link
              tag="v-btn"
              class="yellow darken-2 mt-5"
              large
              :to="link.value">
              {{ link.text }}
            </router-link>
        </v-layout>
      </v-flex>
    </v-layout> -->
  </v-container>
</template>

<script>
import logo from '../components/assets/DSTORS.png';
import { store } from '../store/index.js';

export default {
  name: 'Landing',
  props: {
    msg: String
  },
  beforeRouteEnter (to, from, next) {
    store.state.styles.dark = true;
    next();
  },
  beforeRouteLeave (to, from, next) {
    store.state.styles.dark = false;
    next();
  },
  data() {
    return {
      links: [
        {
          text: 'Browse Market',
          description: "Browse categories and locations to find what you've been looking for.",
          title: 'Buy',
          value: "/browse"
        },
        {
          text: 'Start Selling' ,
          description: 'Direct Sells, Automated Giveaways, Auctions - you name it.',
          title: 'Sell',
          value: "/sell"
        }
      ],
      logo: logo
    }
  },
  mounted() {
    // this.$vuetify.dark = true
    console.log(this.$vuetify.dark)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');
.v-content {
  background: linear-gradient(10deg, #424242, #101010);
  /*background-color: black!important;*/
  height: 100%;
  margin: 0;
  padding: 0;
}

.discord-link {
  color: #cacaca;
  transition: color 0.5s
}

.discord-link:hover {
  color: #90a8f9;
}
</style>
