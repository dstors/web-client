import api from '../api';

export let userStore = {
  namespaced: true,
	state: {
    name: '',
    description: ''
  },
  mutations: {
    getStore(state) {
      api().get('/store/get/user')
        .then(res => {
          state.name = res.data.name;
          state.description = res.data.description;
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