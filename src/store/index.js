import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import {
  getUserProfile,
  isAccessGranted,
  getDiscussions,
  getDiscussionDetails,
  getDiscussionComments,
  getVotersList
} from "../easy-steem";
import { handleProfile } from "../easy-steem/steem-connect";
import { handleDiscussions, renderMd } from "../easy-steem/steemd";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    filter: "trending",
    filters: [
      { value: "trending", label: "Trending" },
      { value: "hot", label: "Hot" },
      { value: "created", label: "New" }
    ],
    tags: [
      { name: 'steem'},
      { name: 'esteem'},
      { name: 'life' }
    ],
    tag: "life",
    alert: false,
    alertMessage: "A error has occured. Please try again later.",
    posts: [],
    loggedIn: isAccessGranted(),
    profile: {},
    postsLimit: 30,
    currentPost: { voters_list: [], title: "", content: "" }
  },
  mutations: {
    toggleDrawer(state) {
      state.drawer = !state.drawer;
    },
    getUserProfile(state) {
      getUserProfile()
        .then(res => {
          state.profile = handleProfile(res);
        })
        .catch(err => {
          console.log("Error while getting user Profile");
          console.log(err);
          state.alert = true;
        });
    },
    getDiscussions(state) {
      const { filter, tag, postsLimit } = state;
      console.log(tag, filter)
      getDiscussions({ filter, query: { tag, limit: postsLimit } })
        .then(res => {
          console.log(res)
          state.posts = handleDiscussions(res);
        })
        .catch(err => {
          console.log("Error while getting discussions");
          console.log(err);
          state.alert = true;
        });
    },
    getDiscussionDetails(state, payload) {
      getDiscussionDetails(payload)
        .then(res => {
          // console.log(Object.keys(res));
          (state.currentPost.title = res.title),
            (state.currentPost.content = renderMd(res.body));
        })
        .catch(err => console.log(err));

      getDiscussionComments(payload)
        .then(res => {
          console.log(res.length)
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
          // console.log(res);
          state.currentPost.voters_list = res;
        })
        .catch(err => console.log(err));
    },
    setTag(state, { newTag }) {
      return state.tag = newTag
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
    }
  },
  getters
});
