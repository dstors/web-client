import Vue from "vue";
import Router from "vue-router";

import Feed from "@/components/Feed";
import LoginHandler from "@/components/LoginHandler";
import Profile from "@/components/Profile";

import AccountInfo from "@/components/AccountInfo";
import Wallet from "@/components/Wallet";
import Wishlist from "@/components/Wishlist";
import SignIn from "@/components/SignIn";
import Store from "@/components/Store";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Feed",
      component: Feed
    },
    {
      path: "/store",
      name: "Store",
      component: Store
    },
    {
      path: "/sign-up",
      name: "SignIn",
      component: SignIn
    },
    {
      path: "/login",
      component: LoginHandler,
      name: "LoginHandler"
    },
    {
      path: "/profile",
      component: Profile,
      // name: "Profile",
      children: [
        {
          path: 'details',
          name: 'UserInformation',
          component: AccountInfo
        },
        {
          path: 'wallet',
          name: 'Wallet',
          component: Wallet
        },
        {
          path: 'wishlist',
          name: 'Wishlist',
          component: Wishlist
        },
      ]
    },
  ]
});
