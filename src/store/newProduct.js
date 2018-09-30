import api from '../api';

export let newProduct = {
  namespaced: true,
	state: {
    name: 'Steem Mug',
    author: 'julianmnst',
    permlink: 'steem-mug654682',
    pending_payout_value: '15.021 SBD',
    startingPrice: '5 SBD',
    lastBid: '220.50 SBD',
    timeLeft: '2 days',
    price: ' SBD',
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
    stock: 2
  },
  mutations: {
    setType(state, payload) {
      state.type = payload;
    },
    addPicture(state) {
      state.pictures.push('')
    },
    removePicture(state, payload) {
      state.pictures.splice(payload, 1)
    },
    createProduct(state) {
      console.log(state);
      api().post('/app/product/add', state)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
  },
  actions: {
    setType({ commit }, payload) {
      commit('setType', payload);
    },
    addPicture({ commit }) {
      commit('addPicture')
    },
    removePicture({ commit }, payload) {
      commit('removePicture', payload)
    },
    createProduct({ commit }) {
      commit('createProduct')
    }
  }
}