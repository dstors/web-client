import Vue from "vue";
import Router from "vue-router";

import Feed from "@/components/Feed";
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
