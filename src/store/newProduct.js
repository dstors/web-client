import Vue from 'vue';
import api from '../api';

let initialProduct = {
  name: '',
  id: null,
  author: '',
  permlink: 'a',
  price: ' SBD',
  type: null,
  wishlist: false,
  description: '',
  pictures: [''],
  stock: 1,
  category: null
}

export let newProduct = {
  namespaced: true,
	state: {
    name: '',
    id: null,
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
      console.log(payload)
      state.pictures.splice(payload, 1)
    },
    createProduct(state, payload) {
      if (state.id === null) {
        api().post('/app/product/add', { ...state, author: payload.profile.username })
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
      else {
        console.log('edit')
        api().post('/app/product/edit/' + state.id, { ...state })
          .then(res => console.log(res))
          .catch(err => console.log(err))
      }
    },
    getListingNames(state, payload) {
      api().get('/store/product_list/get/names/' + payload.rootState.profile.id)
        .then(res => {
          state.listingNames = res.data.map(item => item.productListName)
        })
        .catch(err => console.log(err))
    },
    toggleFormDialog(state) {
      if (state.formDialog) {
        Object.keys(initialProduct).map(key => {
          state[key] = initialProduct[key]
        })
      }
      state.formDialog = !state.formDialog;
    },
    editProduct(state, payload) {
      Object.keys(payload.product).map(key => {
        state[key] = payload.product[key]
      })
    },
    reset(state) {
      Object.keys(state).map(key => {
        console.log(key)
      })
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
      commit('createProduct', rootState)
    },
    getListingNames({ commit, rootState }, payload) {
      commit('getListingNames',  { ...payload, rootState })
    },
    toggleFormDialog({ commit }) {
      commit("toggleFormDialog");
    },
    editProduct({ commit }, payload) {
      commit("editProduct", payload)
    },
    reset({ commit }) {
      commit("reset")
    }
  }
}