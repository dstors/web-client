import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withMarkdownNotes } from '@storybook/addon-notes';

import PostItem from "./PostItem.vue";
import Layout from "./Layout.vue";
import ProfilePopover from "./ProfilePopover.vue";
import VuetifyLayout from "./VuetifyLayout.vue";
import PostList from "./PostList.vue";

const Posts = [
  {
    title: 'Ethereum Mug',
    author: 'julianmnst',
    permlink: 'eth-mug654682',
    pending_payout_value: '211.630 FMD',
    price: '10.000 FMD',
    image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
    type: 'direct-sell',
    marked: false
  },
  {
    title: 'Steem Mug',
    author: 'julianmnst',
    permlink: 'steem-mug654682',
    pending_payout_value: '15.021 FMD',
    startingPrice: '5 USD',
    lastBid: '7.50 USD',
    timeLeft: '2 days',
    image: 'https://images-na.ssl-images-amazon.com/images/I/51Zw9hJASzL._SL1024_.jpg',
    type: 'auction',
    marked: false
  },
  {
    title: 'BCH Mug',
    author: 'julianmnst',
    permlink: 'bch-mug654682',
    pending_payout_value: '15.021 FMD',
    timeLeft: '2 days',
    votes: 2,
    image: 'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
    type: 'giveaway',
    marked: true
  }
]

const fillPosts = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      Posts.push(Posts[j])
    }
  }
}

fillPosts();

const appState = {
  extended: false,
  loggedIn: true,
  profile: {
    name: 'julianmnst',
    profile_image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/778640/800/600/m1/fpnw/wm0/1raccl-.png?1447525058&s=09c2e1c4c7980006ef5ca3bff3f6bac2'
  },
  scLoginUrl: 'aaaa',
  categories: [
    'Arts, Crafts & Sweings',
    'Automotive Parts & Accesories',
    'Baby',
    'Beauty & Personal Care',
    'Books',
    'CDs & Vinyl',
    'Cell Phones & Accesories',
    'Clothing, Shoes & Jewelry'
  ],
  filters: ['Trending', 'Hot', 'New', 'Discounts', 'Giveaways', 'Auctions']
};

storiesOf("ProfilePopover", module)
  .add("b&w", () => ({
    components: { ProfilePopover, VuetifyLayout },
    template: `
    <vuetify-layout>
      <profile-popover></profile-popover>
    </vuetify-layout>`
  }))
  .add("dark", () => ({
    components: { ProfilePopover, VuetifyLayout },
    template: `
    <vuetify-layout>
      <profile-popover :dark="true"></profile-popover>
    </vuetify-layout>`
  }))

storiesOf("Layout", module)
  .add("regular layout", () =>({
    components: {
      Layout,
      PostItem,
      PostList
    },
  	data() {
  		return {
  			appState: appState,
        posts: Posts,
        style: {
          dark: false,
          color: 'amber lighten-3',
          flat: true,
          clippedLeft: true,
          absolute: true,
          login: {
            flat: true,
            color: 'black',
            outline: false
          },
          nav: {
            outline: false
          }
        },
        content: true
  		};
  	},
    template: `
    <layout
      :styles="style"
      :appState="appState">
      <post-list :posts="posts">
      </post-list>
    </layout>`
  }))
  .add("black & white", () =>({
    components: {
      Layout,
      PostItem,
      PostList
    },
    data() {
      return {
        appState: appState,
        posts: Posts,
        style: {
          dark: false,
          color: '',
          flat: false,
          clippedLeft: true,
          absolute: false,
          login: {
            flat: true,
            color: 'black',
            outline: false
          },
          nav: {
            outline: true
          }
        }
      };
    },
    template: `
      <layout :styles="style" :appState="appState">
        <post-list :posts="posts"></post-list>
      </layout>`
  }))
  .add("black & white - DARK", () =>({
    components: {
      Layout,
      PostItem,
      PostList
    },
    data() {
      return {
        appState: appState,
        posts: Posts,
        style: {
          dark: true,
          color: '',
          flat: false,
          clippedLeft: true,
          absolute: false,
          login: {
            flat: true,
            color: 'black',
            outline: false
          },
          nav: {
            outline: false
          }
        }
      };
    },
    template: `
      <layout :styles="style" :dark="dark" :appState="appState">
        <post-list :dark="style.dark" :posts="posts"></post-list>
      </layout>`
  }))

storiesOf("PostItem", module)
// Post Item as a direct sell
  .addDecorator(withKnobs)
  .add("as a direct sell",
    withMarkdownNotes(`
    ## Post item as a direct sell.

    When post item represents a direct sell, it should display the item's price and action buttons to
    __Add to the cart__,
    __Bookmark__ the Item, and other opotions such as
    __"buy now"__.
    `)
    (() => ({
    components: { PostItem, VuetifyLayout },
    data() {
      return {
        post: {
          title: text('title', 'Ethereum Mug'),
          author: text('author', 'julianmnst'),
          permlink: 'eth-mug654682',
          pending_payout_value: text('pending_payout_value', '211.630 FMD'),
          price: text('price', '10.000 FMD'),
          image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
          type: 'direct-sell',
          marked: boolean('marked', false)
        }
      };
    },
    template: `
    <vuetify-layout>
      <post-item :post="post"></post-item>
    </vuetify-layout>`
    })))
  // Post Item as an auction
  .addDecorator(withKnobs)
  .add("as an auction", () => ({
    components: { PostItem, VuetifyLayout },
    methods: { action: linkTo("Button") },
    data() {
      return {
        post: {
          title: text('title', 'Steem Mug'),
          author: text('author', 'julianmnst'),
          permlink: 'steem-mug654682',
          pending_payout_value: text('pending_payout_value', '15.021 FMD'),
          startingPrice: text('startingPrice', '5 USD'),
          lastBid: text('lastBid', '7.50 USD'),
          timeLeft: text('timeLeft', '2 days'),
          image: text('image', 'https://images-na.ssl-images-amazon.com/images/I/51Zw9hJASzL._SL1024_.jpg'),
          type: 'auction',
          marked: boolean('marked', false)
        }
      };
    },
    template: `
    <vuetify-layout>
      <post-item :post="post"></post-item>
    </vuetify-layout>`
  }))
  // Post Item as a giveaway
  .add("as a giveaway", () => ({
    components: { PostItem, VuetifyLayout },
    data() {
      return {
        post: {
          title: text('title', 'BCH Mug'),
          author: text('author', 'julianmnst'),
          permlink: 'bch-mug654682',
          pending_payout_value: text('pending_payout_value', '15.021 FMD'),
          timeLeft: text('timeLeft', '2 days'),
          votes: 2,
          image: 'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
          type: 'giveaway',
          marked: boolean('marked', false)
        }
      };
    },
    template: `
    <vuetify-layout>
      <post-item :post="post"></post-item>
    </vuetify-layout>`
  }))