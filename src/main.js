import "@babel/polyfill";
import Vue from "vue";
import "./plugins/vuetify";
import router from "./router";
import App from "./App.vue";
import { store } from "./store/";
import Vuetify from "vuetify";
import VueWebsocket from 'vue-websocket';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faFacebook,
  faGoogle,
  faBitcoin,
  faDiscord,
  faInstagram
} from '@fortawesome/free-brands-svg-icons'
import {
  faMoon,
  faSun,
  faHeart,
  faBookmark,
  faCartPlus,
  faShoppingCart,
  faTrash,
  faUser,
  faWallet,
  faSignOutAlt,
  faTh,
  faThList,
  faStore,
  faLongArrowAltRight,
  faLongArrowAltLeft,
  faWindowClose,
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faDollarSign,
  faGavel,
  faGift,
  faEllipsisV,
  faListUl,
  faTimes,
  faEdit
} from '@fortawesome/free-solid-svg-icons'

import {
  faCheckCircle
} from '@fortawesome/free-regular-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
	faGoogle,
	faFacebook,
	faBitcoin,
	faMoon,
  faSun,
  faHeart,
  faBookmark,
  faCartPlus,
  faShoppingCart,
  faTrash,
  faUser,
  faWallet,
  faSignOutAlt,
  faTh,
  faThList,
  faStore,
  faLongArrowAltLeft,
  faLongArrowAltRight,
  faWindowClose,
  faAngleUp,
  faAngleDown,
  faAngleRight,
  faDollarSign,
  faGavel,
  faGift,
  faEllipsisV,
  faListUl,
  faTimes,
  faEdit,
  faCheckCircle,
  faDiscord,
  faInstagram
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
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
