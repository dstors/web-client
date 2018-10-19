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
import { userStore } from './userStore';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    steemAccess: null,
    filter: "trending",
    formDialog: false,
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
    hotFeed: [],
    newFeed: [],
    featuredFeed: [],
    discountsFeed: [],
    cart: [],
    loggedIn: isAccessGranted(),
    profile: {},
    postsLimit: 30,
    styles: {
      dark: false,
      color: 'grey lighten-4',
      darkColor: 'grey darken-2',
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
          state.profile = false;
          state.wishlistFeed = [];
          router.push("/");
        })
        .catch(err => console.log(err))

    },
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    toggleDark(state) {
      state.styles.dark = !state.styles.dark;
    },
    toggleFormDialog(state) {
      state.formDialog = !state.formDialog;
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
          state.hotFeed = res.data;
          state.newFeed = res.data;
          state.featuredFeed = res.data;
          state.discountsFeed = res.data;
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
    addToWishlist(state, { id, index, source }) {
      api().post('/app/product/wishlist/' + id)
        .then(res => {
          state.wishlistFeed.map((product, i) => {
            if (product.id === id) {
              Vue.set(state.wishlistFeed[i], 'wishlist', res.data)
            }
          })

          state.productsFeed.map((product, i) => {
            if (product.id === id) {
              Vue.set(state.productsFeed[i], 'wishlist', res.data)
            }
          })

          if (source === 'wishlist') {
            api().get('/app/product/wishlist')
              .then(res => {
                state.wishlistFeed = res.data
              })
              .catch(err => console.log(err))
          }
        })
        .catch(err => console.log(err))
    },
    getCart(state) {
      api().get('/app/product/shopcart')
        .then(res => {
          state.cart = res.data;
          if (res.data.length > 0) {
            let product_ids = res.data.map(function(product, i) {
              return product.id
            })

            state.productsFeed.map(function(product, i){
              if (product_ids.indexOf(product.id) > -1) {
                Vue.set(state.productsFeed[i], 'shopcart', true);
              }

              return product;
            })
          }
        })
        .catch(err => console.log(err));
    },
    addToCart(state, { id, index, source }) {
      api().post('/app/product/shopcart/' + id)
        .then(res => {
          Vue.set(state[source + 'Feed'][index], 'shopcart', true)
          api().get('/app/product/shopcart')
            .then(res => {
              state.cart = res.data;
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
    },
    deleteProductFromCart(state, { id, index, source }) {
      api().post('/app/product/shopcart/delete/' + id)
        .then(res => {
          api().get('/app/product/shopcart')
            .then(res => {
              state.cart = res.data;
              if (res.data.length > 0) {
                let product_ids = res.data.map(function(product, i) {
                  return product.id
                })

                state.productsFeed.map(function(product, i){
                  if (product_ids.indexOf(product.id) > -1) {
                    Vue.set(state.productsFeed[i], 'shopcart', true);
                  }
                  else if (product.id === product.id) {
                    Vue.set(state.productsFeed[i], 'shopcart', false);
                  }
                  return product;
                })
              }
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err))
    },
    getCategories(state) {
      api().get("/app/product/categories")
        .then(res => {
          state.categories = res.data;
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
    getCart({ commit }) {
      commit("getCart")
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
    },
    addToCart({ commit, dispatch }, payload) {
      commit('addToCart', payload)
    },
    deleteFromCart({ commit, dispatch }, payload) {
      commit('deleteProductFromCart', payload)
    },
    toggleFormDialog({ commit }) {
      commit("toggleFormDialog");
    },
    getCategories({ commit }) {
      commit("getCategories")
    }
  },
  getters,
  modules: {
    newProduct,
    userStore
  }
});

store.dispatch('getProductsFeed')