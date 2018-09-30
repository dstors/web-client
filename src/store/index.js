import Vue from "vue";
import Vuex from "vuex";

import api from '../api';

import getters from "./getters";
import {
  isAccessGranted,
  getDiscussionDetails,
  getDiscussionComments,
  getVotersList
} from "../easy-steem";
import { handleProfile } from "../easy-steem/steem-connect";
import { renderMd } from "../easy-steem/steemd";
import router from "../router";
import { newProduct } from './newProduct';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    steemAccess: null,
    filter: "trending",
    categories: [
      'Arts, Crafts & Sweings',
      'Automotive Parts & Accesories',
      'Baby',
      'Beauty & Personal Care',
      'Books',
      'CDs & Vinyl',
      'Cell Phones & Accesories',
      'Clothing, Shoes & Jewelry'
    ],
    filters: [
      'Trending',
      'Hot',
      'New',
      'Giveaways',
      'Auctions',
      'Discounts'
    ],
    // newProduct: {
    //   title: 'Ethereum Mug',
    //   author: 'julianmnst',
    //   permlink: 'eth-mug654682',
    //   pending_payout_value: '211.630 SBD',
    //   price: '10.000 SBD',
    //   image: 'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
    //   type: 'direct-sell',
    //   marked: false,
    //   description: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed in erat non ante pellentesque faucibus. Curabitur velit eros, varius et placerat a, porta vitae tortor. Ut quis vehicula est, eu ultricies odio. Etiam non dolor sagittis, consequat ipsum sit amet, sollicitudin libero. Aliquam eu lectus id risus vulputate cursus sed vel quam. Vestibulum scelerisque, nunc blandit efficitur interdum, ipsum lacus semper purus, quis rhoncus dui leo pulvinar nulla. Proin tellus nunc, gravida sed tristique non, efficitur vitae leo. Quisque gravida sed purus sed lobortis. Ut mi elit, condimentum vitae dapibus eu, tristique et dui. Phasellus commodo orci at ornare consequat. Etiam ut diam ut ligula ullamcorper consectetur. Aenean hendrerit volutpat rutrum. Quisque et tempor turpis, eu ultricies lectus. ',
    //   pictures: [
    //     'https://rlv.zcache.com/ethereum_mug-r0703ea79845841799e1cbc587e18dd03_kz9an_540.jpg?rlvnet=1',
    //     'https://steemitimages.com/0x0/http://puu.sh/qj7LB/1bfd81aa0c.jpg',
    //     'https://hoodl.me/wp-content/uploads/2017/12/bitcoin-logo-mug.jpg',
    //     'https://hodlmonkey.com/wp-content/uploads/2017/11/mockup-f11bb83c.jpg'
    //   ],
    //   stock: 1
    // },
    config: false,
    tags: [
      { name: 'steem'},
      { name: 'esteem'},
      { name: 'life' }
    ],
    tag: "life",
    alert: false,
    scLoginUrl: null,
    alertMessage: "A error has occured. Please try again later.",
    productsFeed: [],
    loggedIn: isAccessGranted(),
    profile: {},
    postsLimit: 30,
    styles: {
      dark: false,
      color: 'amber lighten-3',
      darkColor: 'yellow darken-3',
      flat: false,
      clippedLeft: true,
      absolute: false,
      login: {
        flat: true,
        color: 'black',
        outline: false
      },
      nav: {
        outline: false
      }
    },
    currentPost: { voters_list: [], title: "", content: "" }
  },
  mutations: {
    logout(state) {
      api().get('/users/logout')
        .then(res => {
          state.loggedIn = false;
          router.push("/signin");
        })
        .catch(err => console.log(err))

    },
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    toggleDark(state) {
      console.log('toggling dark!')
      state.styles.dark = !state.styles.dark;
    },
    getUserProfile(state) {
      if (!state.loggedIn) return false;

      api().get('/users/accountDetails')
        .then(res => {
          handleProfile(res)
            .then(profile => state.profile = profile);
        })
        .catch(err => {
          console.log("Error while getting user Profile");
          console.log(err);
          state.alert = true;
          state.loggedIn = false;
        });
    },
    getProductsFeed(state) {
      api().get('/app/product/all')
        .then(res => {
          state.productsFeed = res.data;
        })
        .catch(err => console.log(err));
    },
    login(state){
      state.loggedIn = true
    },
    getDiscussionDetails(state, payload) {
      getDiscussionDetails(payload)
        .then(res => {
          (state.currentPost.title = res.title),
            (state.currentPost.content = renderMd(res.body));
        })
        .catch(err => console.log(err));

      getDiscussionComments(payload)
        .then(res => {
          res.map(comment => {
            console.log(Object.keys(comment))
            console.log(comment.author)
            console.log(comment.body)
          })
        })
        .catch(err => console.log(err))
    },
    getVotersList(state, payload) {
      getVotersList(payload)
        .then(res => {
          state.currentPost.voters_list = res;
        })
        .catch(err => console.log(err));
    },
    setTag(state, { newTag }) {
      return state.tag = newTag
    },
    setSCLoginUrl(state) {
      if (state.scLoginUrl) return false;
      api().get('/users/loginUrl')
        .then(res => state.scLoginUrl = res.data)
        .catch((err) => console.log(err));
    }
  },
  actions: {
    init({ commit }) {
      commit("getUserProfile");
      // commit("getDiscussions");
    },
    getDiscussionDetails({ commit }, payload) {
      commit("getDiscussionDetails", payload);
      commit("getVotersList", payload);
    },
    getProductsFeed({ commit }) {
      commit("getProductsFeed")
    },
    initLogin({ commit }) {
      commit("login")
    },
    authenticate({ dispatch }, payload) {
      api().get('/app?access=' + payload.steemAccess).then(res => {
        if (res.data) {
          dispatch("login");
        }
        else {
          console.log('Not logged in')
        }
      })
      .catch(err => console.log(err));
    },
    login({ dispatch, commit }){
      dispatch("initLogin").then(() => {
        commit("getUserProfile")
      })
    },
    refreshDiscussions({ commit }) {
      // commit("getDiscussions")
    },
    setTag({ commit }, payload) {
      commit('setTag', payload)
    },
    changeTag({ commit, dispatch }, payload) {
      dispatch("setTag", payload).then(() => {
        dispatch("refreshDiscussions")
      })
    },
    setSCLoginUrl({ commit }) {
      commit('setSCLoginUrl')
    }
  },
  getters,
  modules: {
    newProduct
  }
});
