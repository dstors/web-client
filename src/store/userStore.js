import api from '../api';

export let userStore = {
  namespaced: true,
	state: {
    name: '',
    description: '',
    listings: [],
    owner: '',
    banner: 'https://www.uncommongoods.com/images/items/22400/22413_1_1200px.jpg',
    avatar: 'https://www.welovesolo.com/wp-content/uploads/2016/06/mszcccq4qpt.jpg',
    formDialog: false
  },
  mutations: {
    getStore(state, payload) {
      state.listings = []
      let URL = (payload !== undefined) ? `/store/get/user?steemUsername=${payload}` : '/store/get/user'
      console.log(URL)
      api().get(URL)
        .then(function(res) {
          let listings = [];
          for (let i = 0; i < res.data.length; i++) {
            if (Object.keys(res.data[i]).indexOf('properties') > -1) {
              console.log(res.data[i])
              state.name = res.data[i].properties.name
              state.description = res.data[i].properties.description
              state.owner = res.data[i].properties.username
            }
            else {
              listings.push(res.data[i].productListNames)
            }
          }

          state.listings = listings
        })
        .catch(err => console.log(err))
    },
    toggleFormDialog(state) {
      state.formDialog = !state.formDialog;
    },
  },
  actions: {
    getStore({ commit }, payload) {
      commit('getStore', payload);
    },
    toggleFormDialog({ commit }) {
      commit("toggleFormDialog");
    },
  }
}