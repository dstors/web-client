<template>
	<v-list three-line subheader>
    <!-- <v-subheader>General</v-subheader> -->
    <v-container>
      <v-layout column>
        <v-flex xs12 class="my-2">
          <span class="headline">Title</span>
          <v-text-field
            solo>
          </v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <v-list-tile avatar>
      <v-list-tile-action>
        <v-radio-group v-model="option" column>
          <v-radio value="select-product"></v-radio>
        </v-radio-group>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>Select product</v-list-tile-title>
        <v-list-tile-sub-title>Pick an existing one</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-slide-y-transition>
      <v-container v-show="option === 'select-product'">
        <v-layout column>
          <v-flex offset-xs1 xs12>
            <v-select
              :items="products"
              label="Pick a product"
              item-text="title"
              return-object
              solo>
            </v-select>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
    <v-list-tile avatar>
      <v-list-tile-action>
        <v-radio-group v-model="option" column>
          <v-radio value="create-product"></v-radio>
        </v-radio-group>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>New product</v-list-tile-title>
        <v-list-tile-sub-title>All fields are required</v-list-tile-sub-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-slide-y-transition>
      <v-container v-show="option === 'create-product'">
        <v-layout column>
          <v-flex offset-xs1 xs12>
            <v-btn v-for="(type, i) in types"
              :color="type.color"
              :flat="newProduct.type !== type.value"
              :key="i"
              :value="type.value"
              @click="setType">
              {{ type.label }}
              <v-icon right>{{ type.icon }}</v-icon>
            </v-btn>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Product Name</span>
            <v-text-field
              solo>
            </v-text-field>
          </v-flex>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Description</span>
            <v-textarea
              name="input-7-1"
              solo>
            </v-textarea>
          </v-flex>
          <template v-if="(newProduct.type && newProduct.type !== 'direct-sell')">
            <v-flex offset-xs1 xs12 class="mb-4">
              <span class="headline">Ends at</span>
              <v-menu
                ref="dateMenu"
                :close-on-content-click="false"
                v-model="dateMenu"
                :nudge-right="40"
                lazy
                transition="scale-transition"
                offset-y
                full-width
                max-width="290px"
                min-width="290px">
                <v-text-field
                  slot="activator"
                  v-model="date"
                  label="Date"
                  hint="MM/DD/YYYY format"
                  persistent-hint
                  solo
                  prepend-icon="event"
                  @blur="date = parseDate(dateFormatted)">
                </v-text-field>
                <v-date-picker v-model="date" no-title @input="dateMenu = false"></v-date-picker>
              </v-menu>
            </v-flex>
            <v-flex offset-xs1 xs12 class="mb-4">
              <v-layout row>
                <v-flex xs4 class="px-1">
                  <v-select
                    clearable
                    :items="ampm"
                    label="AM/PM"
                    solo>
                  </v-select>
                </v-flex>
                <v-flex xs4 class="px-1">
                  <v-select
                    clearable
                    :items="hours"
                    label="Hour"
                    solo>
                  </v-select>
                </v-flex>
                <v-flex xs4 class="px-1">
                  <v-select
                    clearable
                    :items="minutes"
                    label="Minute"
                    solo>
                  </v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </template>
          <template v-if="newProduct.type === 'auction'">
            <v-flex offset-xs1 xs12 class="mb-4">
              <span class="headline">Starting price</span>
              <v-text-field
                solo
                type="number">
              </v-text-field>
            </v-flex>
          </template>
          <template v-if="newProduct.type === 'direct-sell'">
            <v-flex offset-xs1 xs12 class="mb-4">
              <span class="headline">Price</span>
              <v-text-field
                solo
                type="number">
              </v-text-field>
            </v-flex>
            <v-flex offset-xs1 xs12 class="mb-4">
              <span class="headline">Stock</span>
              <v-text-field
                solo
                type="number">
              </v-text-field>
            </v-flex>
          </template>
          <v-flex offset-xs1 xs12 class="mb-4">
            <span class="headline">Images</span>
            <v-text-field
              solo>
              <v-icon slot="append-outer">add_circle</v-icon>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </v-list>
</template>

<script>
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

export default {
  name: 'product-editor',
  props: ['dark', 'content', 'featured', 'title'],
  data() {
    return {
      date: null,
      dateFormatted: null,
      dateMenu: false,
      menu2: false,
      option: null,
      products: Posts,
      types: [
        { value: 'direct-sell', label: 'Direct Sell', icon: 'attach_money', color: 'green' },
        { value: 'auction', label: 'Auction', icon: 'gavel', color: 'red' },
        { value: 'giveaway', label: 'Giveaway', icon: 'card_giftcard', color: 'yellow darken-2' }
      ],
      newProduct: {
        type: null
      },
      minutes: ['00', '15', '30', '45'],
      hours: ['1', '2', '3', '4','5', '6', '7', '8', '9', '10', '11', '12'],
      ampm: ['AM', 'PM']
    }
  },
  methods: {
    setType: function(e) {
      this.newProduct.type = e.target.value
    },
    parseDate (date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>