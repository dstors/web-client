import Vue from 'vue';
import Router from 'vue-router';

import Browser from '@/components/Browser/Browser';
import Sell from '@/components/Sell';
import Feed from '@/components/Feed';
import LoginHandler from '@/components/LoginHandler';
import Profile from '@/components/Profile';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Feed',
      component: Feed,
    },
    {
      path: '/browse',
      name: 'Browser',
      component: Browser,
    },
    {
      path: '/sell',
      name: 'Sell',
      component: Sell,
    },
    {
      path: '/login',
      component: LoginHandler,
      name: 'LoginHandler'
    },
    {
      path: '/profile',
      component: Profile,
      name: 'Profile'
    }
  ],
});
