import Vue from "vue";
import Router from "vue-router";

import ProductGrid from "@/components/ProductGrid";
import LoginHandler from "@/components/LoginHandler";
import Profile from "@/components/Profile";

import AccountInfo from "@/components/AccountInfo";
import Wallet from "@/components/Wallet";
import Wishlist from "@/components/Wishlist";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "ProductGrid",
      component: ProductGrid
    },
    {
      path: "/login",
      component: LoginHandler,
      name: "LoginHandler"
    },
    {
      path: "/profile",
      component: Profile,
      name: "Profile",
      children: [
        {
          path: '',
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
