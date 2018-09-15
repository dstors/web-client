import Vue from "vue";
import Vuex from "vuex";

import api from '../api';

import getters from "./getters";
import {
  getUserProfile,
  isAccessGranted,
  getDiscussions,
  getDiscussionDetails,
  getDiscussionComments,
  getVotersList,
  logout,
  getLoginUrl
} from "../easy-steem";
import { handleProfile } from "../easy-steem/steem-connect";
import { handleDiscussions, renderMd } from "../easy-steem/steemd";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
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
    posts: [],
    loggedIn: isAccessGranted(),
    profile: {},
    postsLimit: 30,
    currentPost: { voters_list: [], title: "", content: "" }
  },
  mutations: {
    logout(state) {
      state.loggedIn = false;
      localStorage.removeItem('access_token');
      logout();
    },
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    toggleDark(state) {
      console.log('toggling dark!')
      state.dark = !state.dark;
    },
    getUserProfile(state) {
      if (!state.loggedIn) return false;

      api().get('/users/accountDetails')
      // getUserProfile()
        .then(res => {
          handleProfile(res)
            .then(profile => state.profile = profile);
        })
        .catch(err => {
          console.log("Error while getting user Profile");
          console.log(err);
          state.alert = true;
          state.loggedIn = false;
          localStorage.removeItem('access_token');
        });
    },
    getDiscussions(state) {
      const { filter, tag, postsLimit } = state;
      getDiscussions({ filter, query: { tag, limit: postsLimit } })
        .then(res => {
          state.posts = handleDiscussions(res);
        })
        .catch(err => {
          console.log("Error while getting discussions");
          console.log(err);
          state.alert = true;
        });
    },
    login(state){
      // localStorage.setItem('access_token', payload.access_token)
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
        .then(res => {
          console.log(res.data)
          state.scLoginUrl = res.data;
        })
        .catch((err) => console.log(err));
    }
  },
  actions: {
    init({ commit }) {
      commit("getUserProfile");
      commit("getDiscussions");
    },
    getDiscussionDetails({ commit }, payload) {
      commit("getDiscussionDetails", payload);
      commit("getVotersList", payload);
    },
    initLogin({ commit }) {
      commit("login")
    },
    login({ dispatch, commit }){
      dispatch("initLogin").then(() => {
        dispatch("getUserProfile")
      })
    },
    refreshDiscussions({ commit }) {
      commit("getDiscussions")
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
  getters
});
