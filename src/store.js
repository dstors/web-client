import Vue from 'vue'
import Vuex from 'vuex'
import feed from './data'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    count: 0,
    drawer: false,
    check: true,
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
    increment: state => state.count++,
    decrement: state => state.count--,
    toggleDrawer(state) {
    	state.drawer = !state.drawer
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
              console.log(item.tags[i])
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