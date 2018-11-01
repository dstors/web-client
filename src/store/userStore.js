import api from '../api';

export let userStore = {
  namespaced: true,
	state: {
    name: '',
    description: '',
    listings: [],
    owner: ''
  },
  mutations: {
    getStore(state) {
      state.listings = []
      api().get('/store/get/user')
        .then(function(res) {
          for (let i = 0; i < res.data.length; i++) {
            if (Object.keys(res.data[i]).indexOf('properties') > -1) {
              console.log(res.data[i])
              state.name = res.data[i].properties.name
              state.description = res.data[i].properties.description
              state.owner = res.data[i].properties.username
            }
            else {
              state.listings.push(res.data[i].productListNames)
            }
          }
        })
        .catch(err => console.log(err))
    }
  },
  actions: {
    getStore({ commit }) {
      commit('getStore');
    }
  }
}