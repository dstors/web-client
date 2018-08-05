<template>
  <v-container class="landing" fluid>
    <v-layout
        column
        align-center
        justify-center
        fill-height
      >
        <img src="https://steemflea.market/wp-content/uploads/2018/06/UIBV7EB.png" alt="SteemFleaMarket" height="200">
        <h1 class="mb-2 text-xs-center custom-title">SteemFleaMarket</h1>
        <div class="subheading mb-3 text-xs-center">Powered by Steem</div>
    </v-layout>
    <v-layout row wrap>
      <v-flex v-for="(link, i) in links" :key="`6${i}`" xs6>
        <v-layout
            column
            align-center
            justify-center
            class="black--text"
          >
            <h1 class="mb-2 text-xs-center custom-title">{{ link.title }}</h1>
            <div class="subheading mb-3 text-xs-center">{{ link.description }}</div>
            <router-link
              tag="v-btn"
              class="yellow darken-2 mt-5"
              large
              :to="link.value"
            >
              {{ link.text }}
            </router-link>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container></template>

<script>
export default {
  name: 'Landing',
  props: {
    msg: String
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
      ]
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@import url('https://fonts.googleapis.com/css?family=Pacifico');
body {
  background: linear-gradient(50deg, #ffa400, #fff200);
  height: 100%;
  margin: 0;
  padding: 0;
}

h1.custom-title {
  font-family: 'Pacifico', cursive;
}
</style>
