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
    currentPost: { voters_list: [], title: "", content: "" },
    browserFeed: []
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
    getBrowserFeed(state, payload) {
      state.browserFeed = [];
      api().get(payload)
        .then(res => {
          state.browserFeed = res.data
        })
        .catch(err => {
          console.log(err)
        })
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
    setWishlist(state, payload) {
      state.wishlistFeed = payload;
    },
    getCart(state) {
      // api().get('/app/product/shopcart')
      //   .then(res => {
      //     state.cart = res.data;
      //     if (res.data.length > 0) {
      //       let product_ids = res.data.map(function(product, i) {
      //         return product.id
      //       })

      //       state.productsFeed.map(function(product, i){
      //         if (product_ids.indexOf(product.id) > -1) {
      //           Vue.set(state.productsFeed[i], 'shopcart', true);
      //         }

      //         return product;
      //       })
      //     }
      //   })
      //   .catch(err => console.log(err));
      // state.cart = [{"date":{"year":{"low":2018,"high":0},"month":{"low":10,"high":0},"day":{"low":27,"high":0},"hour":{"low":2,"high":0},"minute":{"low":19,"high":0},"second":{"low":20,"high":0},"nanosecond":{"low":978000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0},"timeZoneId":null},"likesQuantity":{"low":2,"high":0},"author":"julianmnst","price":"12.91 SBD","name":"You Can Draw in 30 Days: The Fun, Easy Way to Learn to Draw in One Month or Less","description":"Learn to draw in 30 days with Emmy award-winning PBS host Mark Kistler\n\nDrawing is an acquired skill, not a talent--anyone can learn to draw! All you need is a pencil, a piece of paper, and the willingness to tap into your hidden artistic abilities. With Emmy award-winning, longtime PBS host Mark Kistler as your guide, you'll learn the secrets of sophisticated three-dimensional renderings, and have fun along the way--in just 20 minutes a day for a month. Inside you'll find:\nQuick and easy step-by-step instructions for drawing everything from simple spheres to apples, trees, buildings, and the human hand and face\nMore than 500 line drawings, illustrating each step\nTime-tested tips, techniques, and tutorials for drawing in 3-D\nThe 9 Fundamental Laws of Drawing to create the illusion of depth in any drawing\n75 student examples to help gauge your own progress","stock":"10","category":"Books","type":"direct-sell","permlink":"a","pictures":["https://images-na.ssl-images-amazon.com/images/I/51CQss429hL._SX400_BO1,204,203,200_.jpg","https://images-na.ssl-images-amazon.com/images/I/31OP-J2JcbL.jpg",""],"id":73,"wishlist":true},{"date":{"year":{"low":2018,"high":0},"month":{"low":10,"high":0},"day":{"low":27,"high":0},"hour":{"low":2,"high":0},"minute":{"low":27,"high":0},"second":{"low":34,"high":0},"nanosecond":{"low":746000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0},"timeZoneId":null},"likesQuantity":{"low":8,"high":0},"author":"julianmnst","price":"8.99 SBD","name":"River Bodies (Northampton County Book 1)","description":"n this dark, gripping mystery, a brutal murder unearths old secrets that should have stayed buried.\n\nA body just turned up in the small town of Portland, Pennsylvania. The crime is eerily similar to a twenty-year-old cold case: another victim, brutally murdered, found in the Delaware River. Lead detective Parker Reed is intent on connecting the two murders, but the locals are on lockdown, revealing nothing.\n\nThe past meets the present when Becca Kingsley, who returns to Portland to be with her estranged but dying father, runs into Parker, her childhood love. As the daughter of the former police chief, Becca’s quickly drawn into the case. Coming home has brought something ominous to the surface—memories long buried, secrets best kept hidden. Becca starts questioning all her past relationships, including one with a man who’s watched over her for years. For the first time, she wonders if he’s more predator than protector.\n\nIn a small town where darkness hides in plain sight, the truth could change Becca’s life—or end it.","stock":"10","category":"Books","type":"direct-sell","permlink":"a","pictures":["https://images-na.ssl-images-amazon.com/images/I/51L66lixpLL.jpg"],"id":92,"wishlist":false},{"date":{"year":{"low":2018,"high":0},"month":{"low":10,"high":0},"day":{"low":29,"high":0},"hour":{"low":3,"high":0},"minute":{"low":3,"high":0},"second":{"low":1,"high":0},"nanosecond":{"low":43000000,"high":0},"timeZoneOffsetSeconds":{"low":0,"high":0},"timeZoneId":null},"like":true,"author":"julianmnst","shopcart":false,"description":"Test","type":"direct-sell","pictures":["https://images-na.ssl-images-amazon.com/images/I/51CQss429hL._SX400_BO1,204,203,200_.jpg"],"likesQuantity":{"low":1,"high":0},"price":"10 SBD","name":"Test","stock":"10","category":"Baby","permlink":"a","id":165,"wishlist":false}]
      state.cart = []
    },
    setCartProducts(state, payload) {
      state.cart = payload;
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

                state.browserFeed.map(function(product, i){
                  if (product_ids.indexOf(product.id) > -1) {
                    Vue.set(state.browserFeed[i], 'shopcart', true);
                  }
                  else if (product.id === product.id) {
                    Vue.set(state.browserFeed[i], 'shopcart', false);
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
      // api().get("/app/product/categories")
      //   .then(res => {
      //     state.categories = res.data;
      //   })
      //   .catch(err => console.log(err))
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
      return new Promise((resolve, reject) => {
        api().post('/app/product/wishlist/' + payload.id)
          .then(res => {
            resolve(res.data);
            if (payload.source === 'wishlist') {
              api().get('/app/product/wishlist')
                .then(res => {
                  commit('setWishlist', res.data)
                })
                .catch(err => reject(err))
            }
          })
          .catch(err => reject(err))
      });
    },
    addToCart({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        api().post('/app/product/shopcart/' + payload.id)
          .then(res => {
            resolve(res.data)
            api().get('/app/product/shopcart')
              .then(res => {
                commit('setCartProducts', res.data);
              })
              .catch(err => reject(err));
          })
          .catch(err => reject(err))
      });
    },
    likeProduct({ commit, dispatch }, payload) {
      return new Promise((resolve, reject) => {
        api().post('/app/product/like/' + payload.id)
          .then(res => {
            resolve(res.data)
          })
          .catch(err => reject(err))
      });
    },
    deleteFromCart({ commit, dispatch }, payload) {
      commit('deleteProductFromCart', payload)
    },
    toggleFormDialog({ commit }) {
      commit("toggleFormDialog");
    },
    getCategories({ commit }) {
      commit("getCategories")
    },
    getBrowserFeed({ commit }, payload) {
      commit('getBrowserFeed', payload)
    },
  },
  getters,
  modules: {
    newProduct,
    userStore
  }
});

// store.dispatch('getProductsFeed')