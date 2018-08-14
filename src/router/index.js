import Vue from "vue";
import Router from "vue-router";

import Browser from "@/components/Browser/Browser";
import Sell from "@/components/Sell";
import Feed from "@/components/Feed";
import About from "@/components/About";
import PostDetails from "@/components/PostDetails";
import LoginHandler from "@/components/LoginHandler";
import Profile from "@/components/Profile";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Feed",
      component: Feed
    },
    {
      path: "/about",
      name: "About",
      component: About
    },
    {
      path: "/post/:author/:permlink",
      name: "PostDetails",
      component: PostDetails,
      props: true
    },
    {
      path: "/browse",
      name: "Browser",
      component: Browser
    },
    {
      path: "/sell",
      name: "Sell",
      component: Sell
    },
    {
      path: "/login",
      component: LoginHandler,
      name: "LoginHandler"
    },
    {
      path: "/profile",
      component: Profile,
      name: "Profile"
    }
  ]
});
