import api from '../api';

export let browserFilter = {
  namespaced: true,
	state: {
    countries: ['United States', 'South Korea', 'Canada', 'Argentina'],
    price: {
      min: 0,
      max: 10000
    },
    listings: [],
    owner: ''
  },
  mutations: {
    getStore(state, payload) {
      state.listings = []
      let URL = (payload !== undefined) ? `/store/get/user?steemUsername=${payload}` : '/store/get/user'
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
    }
  },
  actions: {
    getStore({ commit }, payload) {
      commit('getStore', payload);
    }
  }
}