import Vue from "vue";
import Router from "vue-router";

import Feed from "@/components/Feed";
import Landing from "@/components/Landing";
import LoginHandler from "@/components/LoginHandler";
import Profile from "@/components/Profile";

import AccountInfo from "@/components/AccountInfo";
import Wallet from "@/components/Wallet";
import Wishlist from "@/components/Wishlist";
import SignIn from "@/components/SignIn";
import Store from "@/components/Store";
import StoreBrowser from "@/components/StoreBrowser";
import Cart from "@/components/Cart";
import Details from "@/components/Details";
import Browser from "@/components/Browser/Browser";

import Random from "@/components/Random";

import { store } from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      name: "Landing",
      component: Landing
    },
    {
      path: "/feed",
      name: "Feed",
      component: Feed
    },
    {
      path: "/s/:username",
      name: "StoreBrowser",
      component: StoreBrowser,
      props: true
    },
    {
      path: "/s/:username/all",
      name: "StoreBrowserAll",
      component: StoreBrowser,
      props: true
    },
    {
      path: "/browse/c/:category",
      name: "Search",
      component: Browser,
      props: true
    },
    {
      path: "/browse/:username/:source",
      name: "ListBrowser",
      component: Browser,
      props: true
    },
    {
      path: "/browse/:source",
      name: "Browser",
      component: Browser,
      props: true
    },
    {
      path: "/random",
      name: "Random",
      component: Random
    },
    {
      path: "/product/details/:product_id",
      name: "Details",
      component: Details,
      props: true
    },
    {
      path: "/store",
      name: "Store",
      component: Store
    },
    {
      path: "/store/all",
      name: "StoreAll",
      component: Store,
      props: true
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
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
      name: "Profile",
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

router.beforeEach((to, from, next) => {
  let guarded = [
    'UserInformation',
    'Wallet',
    'Wishlist'
  ]

  if (guarded.indexOf(to.name) > -1 && !store.state.loggedIn) {
    console.log(to)
    next('/feed')
  }
  else {
    console.log(to)
    console.log('kjasdkhasdk')
    next()
  }
})

export default router;