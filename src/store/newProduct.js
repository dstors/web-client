import api from '../api';

export let newProduct = {
  namespaced: true,
	state: {
    name: '',
    author: '',
    permlink: '',
    price: ' SBD',
    type: null,
    wishlist: false,
    description: '',
    pictures: [''],
    stock: 0,
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
    createProduct(state, payload) {
      console.log(state);
      api().post('/app/product/add', { ...state, author: payload.username })
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
    createProduct({ commit, rootState }) {
      console.log(rootState.profile.username)
      commit('createProduct', rootState)
    }
  }
}