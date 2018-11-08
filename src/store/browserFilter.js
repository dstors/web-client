import api from '../api';

export let browserFilter = {
  namespaced: true,
  state: {
    priceMin: null,
	  priceMax: null,
    currency: null,
  },
  mutations: {
  	clearPrice(state) {
  		state.priceMin = null
  		state.priceMax = null
  	}
  }
}