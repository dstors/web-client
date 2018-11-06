import api from '../api';
import Vue from 'vue';
import router from '../router';

export let userStore = {
  namespaced: true,
	state: {
    name: '',
    description: '',
    listings: [],
    owner: '',
    // banner: 'https://www.uncommongoods.com/images/items/22400/22413_1_1200px.jpg',
    // avatar: 'https://www.welovesolo.com/wp-content/uploads/2016/06/mszcccq4qpt.jpg',
    avatar: '',
    banner: '',
    formDialog: false,
    storeForm: {
      name: '',
      description: '',
      avatar: '',
      banner: ''
    },
    allProducts: []
  },
  mutations: {
    getStore(state, payload) {
      state.listings = []
      let URL = (payload !== undefined && payload !== '') ? `/store/get/user?steemUsername=${payload}` : '/store/get/user'
      api().get(URL)
        .then(function(res) {
          let listings = [];
          for (let i = 0; i < res.data.length; i++) {
            if (Object.keys(res.data[i]).indexOf('properties') > -1) {
              state.name = res.data[i].properties.name
              state.description = res.data[i].properties.description
              state.banner = res.data[i].properties.banner
              state.avatar = res.data[i].properties.avatar
              state.owner = res.data[i].properties.username
              state.active = res.data[i].properties.active
              if(!res.data[i].properties.active) {
                router.push('/store/all')
              }
            }
            else {
              if (res.data[i].productListNames !== "null" && res.data[i].productListNames !== null) {
                listings.push(res.data[i].productListNames)
              }
            }
          }

          state.listings = listings
        })
        .catch(err => console.log(err))
    },
    updateStore(state) {
      api().post('/store/edit', { ...state.storeForm })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    getAllProducts(state, payload) {
      let URL = (payload.steemUsername !== undefined && payload.steemUsername !== '')
        ? '/app/product/all?steemUsername=' + payload.steemUsername
        :'/app/product/all'

      api().get(URL)
        .then(res => {
          state.allProducts = res.data;
        })
        .catch(err => console.log(err))
    },
    toggleFormDialog(state) {
      state.formDialog = !state.formDialog;
    },
    deleteShelve(state, payload) {
      api().post('/store/product_list/delete/0?name=' + payload)
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    editShelveName(state, payload) {
      api().post('/store/product_list/name/edit',
        { listName: payload.listName, finalName: payload.newName })
        .then(res => {
          console.log(res)
        })
        .catch(err => console.log(err))
    },
    changeListName(state, payload) {
      state.listings = state.listings.map((list, i) => {
        return i === payload.index ? payload.newName : list
      })
    },
    removeFromShelve(state, payload) {
      api().post(
        '/store/product_list/delete/' + payload.productId + '?name=' + payload.shelveName
      )
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    },
    deleteProduct(state, payload) {
      api().post(
        '/app/product/delete/' + payload.productId
      )
      .then(res => {
        console.log(res)
      })
      .catch(err => console.log(err))
    }
  },
  actions: {
    getStore({ commit }, payload) {
      commit('getStore', payload);
    },
    toggleFormDialog({ commit }) {
      commit("toggleFormDialog");
    },
    deleteShelve({ commit }, payload) {
      commit("deleteShelve", payload)
    },
    editShelveName({ commit }, payload) {
      commit("editShelveName", payload)
    },
    removeFromShelve({ commit }, payload) {
      commit("removeFromShelve", payload)
    },
    deleteProduct({ commit }, payload) {
      commit("deleteProduct", payload)
    },
    getAllProducts({ commit }, payload) {
      commit("getAllProducts", payload)
    },
    updateStore({ commit }) {
      commit("updateStore")
    }
  }
}