import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import router from "./router";
import App from "./App.vue";
import { store } from "./store/";
import Vuetify from "vuetify";
import VueWebsocket from 'vue-websocket';

// var exampleSocket = new WebSocket("ws://127.0.0.1:2222/wsServer");

// exampleSocket.onopen = (event) => {
// 	console.log('Open')
// }

// let production = false;

// Vue.http.options.root = production? 'http://example.com' : 'http://localhost:8080';

Vue.use(Vuetify);
Vue.config.productionTip = false;

store.dispatch("init");

new Vue({
	store,
	router,
	render: h => h(App)
}).$mount("#app");
