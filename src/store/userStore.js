import api from '../api';

export let userStore = {
  namespaced: true,
	state: {
    name: '',
    description: '',
    listings: []
  },
  mutations: {
    getStore(state) {
      api().get('/store/get/user')
        .then(res => {
          for (let i = 0; i < res.data.length; i++) {
            if (Object.keys(res.data[i]).indexOf('properties') > -1) {
              this.name = res.data[i].properties.name
              this.description = res.data[i].properties.description
            }
            else {
              this.listings = [res.data[i].productListNames]
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