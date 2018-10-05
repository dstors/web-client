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
    wishlistFeed: [],
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
    getWishlistFeed(state) {
      api().get('/app/product/wishlist')
        .then(res => {
          state.wishlistFeed = res.data;
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
    },
    addToWishlist(state, { id, index }) {
      api().post('/app/product/wishlist/' + id)
        .then(res => {
          console.log(res)
          if (res.data) {
            state.productsFeed[index].wishlist = true
          }
        })
        .catch(err => console.log(err))
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
    getWishlistFeed({ commit }) {
      commit("getWishlistFeed")
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
    },
    addToWishlist({ commit }, payload) {
      commit('addToWishlist', payload)
    }
  },
  getters,
  modules: {
    newProduct
  }
});
