import Vue from 'vue'
import Vuex from 'vuex'
import feed from './data'
import { scApi, simplifyReputation } from './steem-connect'

let scLoginUrl = scApi.getLoginURL();

let access_token = localStorage.getItem('access_token')

let loggedIn = false;

if (access_token) {
  scApi.setAccessToken(access_token)
  let loggedIn = true;
}


Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    access_token,
    loggedIn,
    profile: false,
    scLoginUrl,
    username: '',
    drawer: false,
    feed: feed,
    filters: {
    	location: {
    		on: false,
        country: {
          value: null,
          items: ['Argentina', 'United States']
        },
        state: {
          value: null,
          items: ['Buenos Aires', 'California']
        },
        city: {
          value: null,
          items: ['Capital Federal', 'Los Angeles']
        }
    	},
    	categories: {
    		on: false,
    		items: ['Art', 'Furniture'],
    		value: null,
    		tags: {
          value: null,
          items: ['steem', 'steemit', 'crypto']
        }
    	},
    	price: {
    		on: false,
    		min: null,
    		max: null
    	}
    }
  },
  mutations: {
    toggleDrawer(state) {
    	state.drawer = !state.drawer
    },
    login(state, payload) {
      const { access_token, username } = payload;
      scApi.setAccessToken(access_token)
      state.access_token = access_token
      state.username = username
      localStorage.setItem('access_token', access_token)
    },
    logout(state) {
      scApi.revokeToken(function(err, res) {
        if (res && res.success) {
          state.access_token = null;
          localStorage.removeItem('access_token')
          state.profile = {}
        }
      });
    },
    getProfile(state) {
      scApi.me(function (err, res) {
        if (err) console.log(err)
        const {
          user,
          _id,
          name,
          scope,
          account,
          user_metadata
        } = res

        const {
          balance,
          sbd_balance,
          reputation,
          voting_power
        } = account;

        const {
          profile: {
            about,
            cover_image,
            location,
            name: realName,
            profile_image
          }
        } = JSON.parse(account.json_metadata)

        state.profile = {
          name,
          balance,
          sbd_balance,
          reputation: simplifyReputation(reputation),
          voting_power,
          about,
          cover_image,
          location,
          realName,
          profile_image
        }
      });
    }
  },
  actions: {
    getProfile(context) {
      context.commit('getProfile')
    }
  },
  getters: {
    getFilteredFeed({ filters: { price, categories, location }, feed }) {
      const { min, max } = price;
      if (price.on && (min || max)) {
        feed = feed.filter(item => item.price > min && item.price < max)
      }

      const {country, state, city} = location
      if (location.on && (country || state || city)) {
        if (country.value) {
          feed = feed.filter(item => item.location.country === country.value)
        }

        if (state.value) {
          feed = feed.filter(item => item.location.state === state.value)
        }

        if (city.value) {
          feed = feed.filter(item => item.location.city === city.value)
        }
      }

      const { value, tags } = categories
      if (categories.on && (value || tags.value)) {
        if (value) {
          feed = feed.filter(item => item.category === value)
        }

        if (tags.value) {
          feed = feed.filter(item => {
            for(let i = 0; i < item.tags.length; i++) {
              if (tags.value.indexOf(item.tags[i]) > -1) {
                return item;
              }
            }
          })
        }
      }

      return feed
    }
  }
})