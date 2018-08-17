import Vue from "vue";
import { storiesOf } from "@storybook/vue";
import { linkTo } from "@storybook/addon-links";

import PostItem from "./PostItem.vue";

storiesOf("PostItem", module).add("as a direct sell", () => ({
  components: { PostItem },
  data() {
    return {
      post: {
        title: 'Ethereum Mug',
        author: 'julianmnst',
        permlink: 'eth-mug654682',
        pending_payout_value: '10 SBD',
        price: '10.360 USD',
        image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
        type: 'direct-sell'
      }
    };
  },
  template: `<post-item :post="post"></post-item>`
})).add("as an auction", () => ({
  components: { PostItem },
  methods: { action: linkTo("Button") },
  data() {
    return {
      post: {
        title: 'Steem Mug',
        author: 'julianmnst',
        permlink: 'steem-mug654682',
        pending_payout_value: '15.021 SBD',
        startingPrice: '5 USD',
        lastBid: '6.50 USD',
        timeLeft: '2 days',
        image: 'https://picsum.photos/200',
        type: 'auction'
      }
    };
  },
  template: `<post-item :post="post"></post-item>`
})).add("as a giveaway", () => ({
  components: { PostItem },
  data() {
    return {
      post: {
        title: 'BCH Mug',
        author: 'julianmnst',
        permlink: 'bch-mug654682',
        pending_payout_value: '15.021 SBD',
        timeLeft: '2 days',
        votes: 2,
        image: 'https://picsum.photos/200',
        type: 'giveaway'
      }
    };
  },
  template: `<post-item :post="post"></post-item>`
}))