import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import router from './router'
import App from './App.vue'
import { store } from './store/'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
Vue.config.productionTip = false

store.dispatch('init')

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
