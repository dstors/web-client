import api from '../api';

export let newProduct = {
  namespaced: true,
	state: {
    name: '',
    author: '',
    permlink: 'a',
    price: ' SBD',
    type: null,
    wishlist: false,
    description: '',
    pictures: [''],
    stock: 1,
    category: null,
    listing: null,
    listingNames: [],
    formDialog: false
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
      api().post('/app/product/add', { ...state, author: payload.profile.username })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    getListingNames(state, payload) {
      api().get('/store/product_list/get/names/' + payload.rootState.profile.id)
        .then(res => {
          state.listingNames = res.data.map(item => item.productListName)
        })
        .catch(err => console.log(err))
    },
    toggleFormDialog(state) {
      state.formDialog = !state.formDialog;
    },
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
      commit('createProduct', rootState)
    },
    getListingNames({ commit, rootState }, payload) {
      commit('getListingNames',  { ...payload, rootState })
    },
    toggleFormDialog({ commit }) {
      commit("toggleFormDialog");
    },
  }
}