import api from '../api';

export let newProduct = {
  namespaced: true,
	state: {
    name: 'Ethereum Mug',
    author: 'julianmnst',
    permlink: 'eth-mug654682',
    pending_payout_value: '211.630 SBD',
    price: '10.000 SBD',
    image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
    type: 'direct-sell',
    wishlist: false,
    description: 'Not too long description',
    pictures: [
      'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
      'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
      'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
      'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    ],
    stock: 1,
    category: null
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