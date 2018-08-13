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
    filter: "blog",
    filters: [
      { value: "trending", label: "Trending" },
      { value: "hot", label: "Hot" },
      { value: "new", label: "New" }
    ],
    tags: [],
    alert: false,
    alertMessage: "A error has occured. Please try again later.",
    tag: "reviewme",
    posts: [],
    loggedIn: isAccessGranted(),
    profile: {},
    postsLimit: 10,
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
    }
  },
  getters
});
