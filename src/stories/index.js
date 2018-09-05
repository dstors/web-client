import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, text, boolean } from '@storybook/addon-knobs/vue';
import { withMarkdownNotes } from '@storybook/addon-notes';

import PostItem from "./PostItem.vue";
import Layout from "./Layout.vue";
import ProfilePopover from "./ProfilePopover.vue";
import MessagesPopover from "./MessagesPopover.vue";
import NotificationsPopover from "./NotificationsPopover.vue";
import CartPopover from "./CartPopover.vue";
import VuetifyLayout from "./VuetifyLayout.vue";
import PostList from "./PostList.vue";
import Cart from "./Cart.vue";
import Messenger from "./Messenger.vue";
import Conversation from "./Conversation.vue";
import Profile from "./Profile.vue";
import DStore from "./DStore/DStore.vue";

import Product from "./DStore/Product.vue";

const Posts = [
  {
    title: 'Ethereum Mug',
    author: 'julianmnst',
    permlink: 'eth-mug654682',
    pending_payout_value: '211.630 SBD',
    price: '10.000 SBD',
    image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
    type: 'direct-sell',
    marked: false,
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed in erat non ante pellentesque faucibus. Curabitur velit eros, varius et placerat a, porta vitae tortor. Ut quis vehicula est, eu ultricies odio. Etiam non dolor sagittis, consequat ipsum sit amet, sollicitudin libero. Aliquam eu lectus id risus vulputate cursus sed vel quam. Vestibulum scelerisque, nunc blandit efficitur interdum, ipsum lacus semper purus, quis rhoncus dui leo pulvinar nulla. Proin tellus nunc, gravida sed tristique non, efficitur vitae leo. Quisque gravida sed purus sed lobortis. Ut mi elit, condimentum vitae dapibus eu, tristique et dui. Phasellus commodo orci at ornare consequat. Etiam ut diam ut ligula ullamcorper consectetur. Aenean hendrerit volutpat rutrum. Quisque et tempor turpis, eu ultricies lectus. ',
    pictures: [
      'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
      'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
      'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
      'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    ],
    available: 1
  },
  {
    title: 'Steem Mug',
    author: 'julianmnst',
    permlink: 'steem-mug654682',
    pending_payout_value: '15.021 SBD',
    startingPrice: '5 SBD',
    lastBid: '220.50 SBD',
    timeLeft: '2 days',
    image: 'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
    type: 'auction',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse dictum imperdiet ante, consequat tincidunt lectus. Pellentesque sed magna a nunc blandit pharetra. Curabitur dapibus, ligula ut volutpat ornare, ipsum mauris ultricies ipsum, vel convallis tortor lorem at augue. Sed eget nulla consectetur, venenatis erat et, tincidunt mi. Cras velit sem, mattis eu mi vel, sagittis gravida ligula. Fusce non libero tincidunt, pretium nibh sed, consequat ex. Aenean gravida purus in imperdiet pellentesque. Donec viverra metus aliquam fringilla tincidunt. Suspendisse nisl purus, laoreet id arcu non, malesuada sagittis odio. Proin semper mattis metus quis pellentesque. ',
    marked: false,
    pictures: [
      'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
      'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
      'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
      'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    ],
    available: 2
  },
  {
    title: '1 BCH',
    author: 'julianmnst',
    permlink: 'bch-mug654682',
    pending_payout_value: '150.021 SBD',
    timeLeft: '2 days',
    votes: 2,
    image: 'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
    type: 'giveaway',
    marked: true,
    description: 'Aliquam vestibulum nisl mi, et scelerisque risus placerat eu. Nulla dignissim, augue tempus suscipit eleifend, justo nibh dapibus sapien, tempus facilisis tortor leo eget nisl. Phasellus rutrum sit amet enim id commodo. Cras sed lorem a turpis ultrices sollicitudin eu ac mauris. Etiam ac massa id purus pulvinar porttitor a eget dolor. Pellentesque porta neque ut efficitur aliquet. Integer mattis enim feugiat pharetra dignissim. Donec faucibus neque eget est cursus, ac condimentum massa cursus. Aenean vel vehicula tellus, eget pulvinar dui. Nullam ac nibh dictum, elementum arcu sed, congue sem. Pellentesque vel ornare mauris. Phasellus lobortis vel arcu sit amet consectetur.',
    pictures: [
      'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
      'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
      'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
      'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    ],
    available: 1
  }
];

const Bookmarks = [
  {
    title: 'Ethereum Mug',
    author: 'julianmnst',
    permlink: 'eth-mug654682',
    pending_payout_value: '211.630 SBD',
    price: '10.000 SBD',
    image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
    type: 'direct-sell',
    marked: false,
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed in erat non ante pellentesque faucibus. Curabitur velit eros, varius et placerat a, porta vitae tortor. Ut quis vehicula est, eu ultricies odio. Etiam non dolor sagittis, consequat ipsum sit amet, sollicitudin libero. Aliquam eu lectus id risus vulputate cursus sed vel quam. Vestibulum scelerisque, nunc blandit efficitur interdum, ipsum lacus semper purus, quis rhoncus dui leo pulvinar nulla. Proin tellus nunc, gravida sed tristique non, efficitur vitae leo. Quisque gravida sed purus sed lobortis. Ut mi elit, condimentum vitae dapibus eu, tristique et dui. Phasellus commodo orci at ornare consequat. Etiam ut diam ut ligula ullamcorper consectetur. Aenean hendrerit volutpat rutrum. Quisque et tempor turpis, eu ultricies lectus. ',
    pictures: [
      'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
      'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
      'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
      'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    ],
    available: 1
  },
  {
    title: 'Necklace: 925 Sterling Silver & natural Charoite',
    author: 'dfworld',
    permlink: 'necklace654682',
    pending_payout_value: '211.630 SBD',
    price: 'Negotiable',
    image: 'https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmZxr3chVEac8YjGQNHVN1cSoezZh2iypgLEdPe66NLuSs/DSC_0061.JPG',
    type: 'direct-sell',
    marked: false,
    description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed in erat non ante pellentesque faucibus. Curabitur velit eros, varius et placerat a, porta vitae tortor. Ut quis vehicula est, eu ultricies odio. Etiam non dolor sagittis, consequat ipsum sit amet, sollicitudin libero. Aliquam eu lectus id risus vulputate cursus sed vel quam. Vestibulum scelerisque, nunc blandit efficitur interdum, ipsum lacus semper purus, quis rhoncus dui leo pulvinar nulla. Proin tellus nunc, gravida sed tristique non, efficitur vitae leo. Quisque gravida sed purus sed lobortis. Ut mi elit, condimentum vitae dapibus eu, tristique et dui. Phasellus commodo orci at ornare consequat. Etiam ut diam ut ligula ullamcorper consectetur. Aenean hendrerit volutpat rutrum. Quisque et tempor turpis, eu ultricies lectus. ',
    pictures: [
      'https://steemitimages.com/0x0/https://cdn.steemitimages.com/DQmZxr3chVEac8YjGQNHVN1cSoezZh2iypgLEdPe66NLuSs/DSC_0061.JPG'
    ],
    available: 1
  },
]

const CartList = [
  {
    title: 'Ethereum Mug',
    author: 'julianmnst',
    permlink: 'eth-mug654682',
    pending_payout_value: '211.630 SBD',
    price: '10.000 SBD',
    image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
    available: 2,
    pictures: [
      'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
      'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
      'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
      'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    ]
  },
  {
    title: 'Ethereum Fanboy Starter Pack',
    author: 'julianmnst',
    permlink: 'eth-starter654682',
    pending_payout_value: '211.630 SBD',
    price: '110.000 SBD',
    image: 'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg',
    available: 2,
    pictures: [
      'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
      'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
      'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
      'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    ]
  }
];

const Messages = [
  {
    read: false,
    from: 'Mug Store',
    message: 'Your mug will arrive in 2 days!',
    avatar: 'https://picsum.photos/200',
    date: 'today'
  },
  {
    read: true,
    from: 'Mango',
    message: 'Welcome to Mango! Here are some ways to increase your sells',
    avatar: 'https://picsum.photos/200',
    date: '21 aug'
  }
];

const Notifications = [
  {
    read: false,
    from: 'Mug Store',
    item: 'Steem Mug (1)',
    action: 'Winner announcement today!',
    type: 'giveaway',
    avatar: 'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
    date: 'today'
  },
  {
    read: false,
    from:  'Nike',
    item: 'Awesome shoes (1)',
    action: 'Winners announced',
    type: 'giveaway',
    avatar: 'https://www.wpfr.org/images//product_17/awesome-nike-lunarepic-low-flyknit-2-ii-black-white-men-running-shoes-sneaker-863779-041-7631.jpg',
    date: 'today'
  },
  {
    read: true,
    from:  'SteemArt',
    item: 'Original Steemian Piece',
    action: {
      user: 'julianmnst',
      action: 'rose the bid to',
      lastBid: '60 SBD'
    },
    type: 'auction',
    avatar: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project_%28454045%29.jpg',
    date: 'yesterday'
  }
];

const fillPosts = () => {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      Posts.push(Posts[j])
    }
  }
}

const Chat = [
  {
    from: 'Mug Store',
    time: 'yesterday 14:50',
    msg: 'Hi! Please send me your shipping details!'
  },
  {
    from: 'julianmnst',
    time: 'yesterday 14:51',
    msg: 'Hello! This is my address: \r 123th Fake St NY'
  },
  {
    from: 'Mug Store',
    time: 'yesterday 14:51',
    msg: 'Awesome! I will confirm as soon as I send your mug!'
  },
  {
    from: 'julianmnst',
    time: 'yesterday 14:52',
    msg: "Great! I'll wait"
  },
  {
    from: 'Mug Store',
    time: 'yesterday 15:15',
    msg: 'Shipping confirmed! Estimated arrival: 24-48 hours.',
    action: true,
    pendingAction: false,
    actionMessage: 'Confirm package arrival'
  },
  {
    divider: true,
    date: 'today'
  },
  {
    from: 'julianmnst',
    time: '16:06',
    msg: 'Package arrival confirmed',
    action: true,
    pendingAction: false
  }
]

fillPosts();

const Prof = {
  real_name: 'Julian Mansueto',
  bookmarks: Bookmarks,
  reputation: 36,
  description: 'New World Enthusiast - Javascript Developer',
  name: 'julianmnst',
  country: 'Argentina',
  profile_image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/778640/800/600/m1/fpnw/wm0/1raccl-.png?1447525058&s=09c2e1c4c7980006ef5ca3bff3f6bac2'
}

const appState = {
  extended: false,
  loggedIn: true,
  messages: Messages,
  notifications: Notifications,
  cart: CartList,
  profile: Prof,
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
  filters: [
    'Trending',
    'Hot',
    'New',
    'Giveaways',
    'Auctions',
    'Discounts'
  ]
};

storiesOf("CartPopover", module)
  .add("default", () => ({
    components: { CartPopover, VuetifyLayout },
    data() {
      return {
        cart: CartList
      }
    },
    template: `
    <vuetify-layout>
      <cart-popover :cart="cart"></cart-popover>
    </vuetify-layout>`
  }))
  .add("dark", () => ({
    components: { CartPopover, VuetifyLayout },
    data() {
      return {
        cart: CartList
      }
    },
    template: `
    <vuetify-layout>
      <cart-popover :dark="true" :cart="cart"></cart-popover>
    </vuetify-layout>`
  }))

storiesOf("NotificationsPopover", module)
  .add("default", () => ({
    components: { NotificationsPopover, VuetifyLayout },
    data() {
      return {
        notifications: Notifications
      }
    },
    template: `
    <vuetify-layout>
      <notifications-popover :notifications="notifications"></notifications-popover>
    </vuetify-layout>`
  }))
  .add("dark", () => ({
    components: { NotificationsPopover, VuetifyLayout },
    data() {
      return {
        notifications: Notifications
      }
    },
    template: `
    <vuetify-layout>
      <notifications-popover :dark="true" :notifications="notifications"></notifications-popover>
    </vuetify-layout>`
  }))

storiesOf("MessagesPopover", module)
  .add("default", () => ({
    components: { MessagesPopover, VuetifyLayout },
    data() {
      return {
        messages: Messages
      }
    },
    template: `
    <vuetify-layout>
      <messages-popover :messages="messages"></messages-popover>
    </vuetify-layout>`
  }))
  .add("dark", () => ({
    components: { MessagesPopover, VuetifyLayout },
    data() {
      return {
        messages: Messages
      }
    },
    template: `
    <vuetify-layout>
      <messages-popover :dark="true" :messages="messages"></messages-popover>
    </vuetify-layout>`
  }))

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

storiesOf("Messenger", module)
  .add('standalone', () => ({
    components: { Messenger, VuetifyLayout },
    data() {
      return {
        messages: Messages,
        conversation: Chat
      }
    },
    template: `
    <vuetify-layout>
      <messenger :conversation="conversation" :messages="messages" :dark="true"></messenger>
    </vuetify-layout>`
  }))
  .add("in layout", () =>({
    components: {
      Layout,
      Messenger,
      Conversation
    },
    data() {
      return {
        appState: appState,
        style: {
          dark: false,
          color: 'amber lighten-3',
          darkColor: 'blue darken-3',
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
        },
        conversation: Chat
      };
    },
    template: `
    <layout
      :styles="style"
      :appState="appState">
      <conversation :conversation="conversation"></conversation>
      <template slot="messenger">
        <messenger :messages="appState.messages">
        </messenger>
      </template>
    </layout>`
  }))

storiesOf("Cart", module)
  .add('standalone', () => ({
    components: { Cart, VuetifyLayout },
    data() {
      return {
        cart: CartList
      }
    },
    template: `
    <vuetify-layout>
      <cart :cart="cart" :dark="true"></cart>
    </vuetify-layout>`
  }))
  .add("in layout", () =>({
    components: {
      Layout,
      Cart
    },
    data() {
      return {
        appState: appState,
        posts: Posts,
        style: {
          dark: false,
          color: 'amber lighten-3',
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
    <layout
      :styles="style"
      :appState="appState">
      <cart :cart="appState.cart">
      </cart>
    </layout>`
  }))

storiesOf("DStore", module)
  .add('standalone', () => ({
    components: { DStore, VuetifyLayout },
    template: `
    <vuetify-layout>
      <d-store :dark="true"></d-store>
    </vuetify-layout>`
  }))
  .add("in layout", withMarkdownNotes(`
So, we'll do this:

We'll have several predefined components:
  1. *Layouts*, such as:
    - Home
    - Catalog
    - About

  2. *Widgets* specific for each layout, such as:
    - blog posts
    - product
    - collections
    - featured product
    - featured collections
    - slideshow
    - image with text overlay
  `)(() =>({
    components: {
      Layout,
      DStore
    },
    data() {
      return {
        appState: appState,
        posts: Posts,
        style: {
          dark: false,
          color: 'amber lighten-3',
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
    <layout
      :styles="style"
      :appState="appState">
      <d-store :posts="posts">
      </d-store>
    </layout>`
  })))

storiesOf("Product", module)
  .add("standalone", () => ({
  components: {
      VuetifyLayout,
      Product
    },
    data() {
      return {
        appState: appState,
        product: Posts[0],
        posts: Posts,
        style: {
          dark: false,
          color: 'amber lighten-3',
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
      <vuetify-layout>
        <product :product="product"></product>
      </vuetify-layout>
    `
}))

storiesOf("Profile", module)
  .add('standalone', () => ({
    components: { Profile, VuetifyLayout },
    data() {
      return {
        profile: Prof
      }
    },
    template: `
    <vuetify-layout>
      <profile :profile="profile" :dark="true"></profile>
    </vuetify-layout>`
  }))
  .add("in layout", () =>({
    components: {
      Layout,
      Profile
    },
    data() {
      return {
        appState: appState,
        posts: Posts,
        style: {
          dark: false,
          color: 'amber lighten-3',
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
    <layout
      :styles="style"
      :appState="appState">
      <profile :profile="appState.profile">
      </profile>
    </layout>`
  }))

storiesOf("Layout", module)
  .add("default layout", () =>({
    components: {
      Layout,
      PostList
    },
  	data() {
  		return {
  			appState: appState,
        posts: Posts,
        style: {
          dark: false,
          color: 'amber lighten-3',
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
          pending_payout_value: text('pending_payout_value', '211.630 SBD'),
          price: text('price', '22.50 SBD'),
          image: 'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
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
          pending_payout_value: text('pending_payout_value', '15.021 SBD'),
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
          pending_payout_value: text('pending_payout_value', '15.021 SBD'),
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