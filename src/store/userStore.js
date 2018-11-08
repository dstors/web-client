import api from '../api';
import Vue from 'vue';
import router from '../router';

function serialize(obj) {
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
}

function getUrl(base, query) {
  let separator = base.indexOf('?') > -1 ? '&' : '?'
  return base  + separator + serialize(query)
}


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
    allProducts: [],
    pagination: {
      limit: 20,
      page: 1,
      totalProducts: 0
    }
  },
  mutations: {
    getStore(state, payload) {
      state.listings = []
      if (payload.data === "") {
        state.storeIsEmpty = true
        router.push(payload.redirectRoute)
      }
      else {
        let listings = [];
        for (let i = 0; i < payload.data.length; i++) {
          if (Object.keys(payload.data[i]).indexOf('properties') > -1) {
            state.name = payload.data[i].properties.name
            state.storeForm.name = payload.data[i].properties.name
            state.description = payload.data[i].properties.description
            state.storeForm.description = payload.data[i].properties.description
            state.banner = payload.data[i].properties.banner
            state.storeForm.banner = payload.data[i].properties.banner
            state.avatar = payload.data[i].properties.avatar
            state.storeForm.avatar = payload.data[i].properties.avatar
            state.owner = payload.data[i].properties.username
            state.active = payload.data[i].properties.active
          }
          else {
            if (payload.data[i].productListNames !== "null" && payload.data[i].productListNames !== null) {
              listings.push(payload.data[i].productListNames)
            }
          }
        }

        if (listings.length < 1 && payload.redirectRoute !== undefined) {
          router.push(payload.redirectRoute)
        }

        state.listings = listings
      }
    },
    getAllProducts(state, payload) {
      let URL = (payload.steemUsername !== undefined && payload.steemUsername !== '')
        ? `/app/product/all/user?steemUsername=${payload.steemUsername}`
        :`/app/product/all/user`

      api().get(getUrl(URL, state.pagination))
        .then(res => {
          if (res.data.length > 0) {
            state.pagination.totalProducts = res.data[0].count
          }
          else {
            state.pagination.totalProducts = 0
          }
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
    getStore({ commit, state }, payload) {
      return new Promise((resolve, reject) => {
        let URL = (payload.steemUsername !== undefined && payload.steemUsername !== '')
          ? `/store/get/user?steemUsername=${payload.steemUsername}`
          : `/store/get/user?limit=${state.pagination.limit}&page=${state.pagination.page}`
        api().get(URL)
          .then(function(res) {
            commit('getStore', { data: res.data, redirectRoute: payload.redirectRoute });
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
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
    updateStore({ commit, state }) {
      return new Promise((resolve, reject) => {
        api().post('/store/edit', { ...state.storeForm })
          .then(res => {
            console.log(res)
            resolve(res)
          })
          .catch(err => {
            console.log(err)
            reject(err)
          })
      })
    }
  },

  getters: {
    pagesCount(state) {
      console.log(state)
      if (state.pagination.totalProducts < 1) return 0
      if (state.pagination.limit > state.pagination.totalProducts) return 1
      return Math.floor(state.pagination.totalProducts / state.pagination.limit)
    }
  }
}