import api from '../api';
import Vue from 'vue';
import router from '../router';

export let userStore = {
  namespaced: true,
	state: {
    storeIsEmpty: false,
    name: '',
    description: '',
    listings: [],
    owner: '',
    avatar: '',
    banner: '',
    active: false,
    formDialog: false,
    storeForm: {
      name: '',
      description: '',
      avatar: '',
      banner: '',
      active: true
    },
    allProducts: []
  },
  mutations: {
    getStore(state, payload) {
      state.listings = []
      let URL = (payload.steemUsername !== undefined && payload.steemUsername !== '') ? `/store/get/user?steemUsername=${payload.steemUsername}` : '/store/get/user'
      api().get(URL)
        .then(function(res) {
          if (res.data === "") {
            console.log(res)
            state.storeIsEmpty = true
          }

          else {
            let listings = [];
            for (let i = 0; i < res.data.length; i++) {
              if (Object.keys(res.data[i]).indexOf('properties') > -1) {
                state.name = res.data[i].properties.name
                state.storeForm.name = res.data[i].properties.name
                state.description = res.data[i].properties.description
                state.storeForm.description = res.data[i].properties.description
                state.banner = res.data[i].properties.banner
                state.storeForm.banner = res.data[i].properties.banner
                state.avatar = res.data[i].properties.avatar
                state.storeForm.avatar = res.data[i].properties.avatar
                state.owner = res.data[i].properties.username
                state.active = res.data[i].properties.active
              }
              else {
                if (res.data[i].productListNames !== "null" && res.data[i].productListNames !== null) {
                  listings.push(res.data[i].productListNames)
                }
              }
            }

            console.log(payload)
            if (listings.length < 1 && payload.redirectRoute !== undefined) {
              router.push(payload.redirectRoute)
            }

            state.listings = listings
          }
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
        ? '/app/product/all/user?steemUsername=' + payload.steemUsername
        :'/app/product/all/user'

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