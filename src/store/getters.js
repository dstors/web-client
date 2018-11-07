import Vue from 'vue';

export default {
  getFilteredFeed({ filters: { price, categories, location }, feed }) {
    const { min, max } = price;
    if (price.on && (min || max)) {
      feed = feed.filter(item => item.price > min && item.price < max);
    }

    const { country, state, city } = location;
    if (location.on && (country || state || city)) {
      if (country.value) {
        feed = feed.filter(item => item.location.country === country.value);
      }

      if (state.value) {
        feed = feed.filter(item => item.location.state === state.value);
      }

      if (city.value) {
        feed = feed.filter(item => item.location.city === city.value);
      }
    }

    const { value, tags } = categories;
    if (categories.on && (value || tags.value)) {
      if (value) {
        feed = feed.filter(item => item.category === value);
      }

      if (tags.value) {
        feed = feed.filter(item => {
          for (let i = 0; i < item.tags.length; i++) {
            if (tags.value.indexOf(item.tags[i]) > -1) {
              return item;
            }
          }
        });
      }
    }

    return feed;
  },
  getPaginatedFeed(state) {
    let result = [];

    let limitPerPage;

    switch (Vue.prototype.$vuetify.breakpoint.name) {
      case 'xs':
        limitPerPage = 1;
        break;
      case 'sm':
        limitPerPage = 3;
        break;
      case 'md':
        limitPerPage = 4;
        break;
      case 'lg':
        limitPerPage = 4;
        break;
      case 'xl':
        limitPerPage = 4;
        break;
    }

    let last_page = Math.ceil(state.productsFeed.length/limitPerPage)

    for (var page = 0; page < last_page; page++) {
      let start_index = ((page+1)-1) * limitPerPage;
      result.push(state.productsFeed.slice(start_index, start_index + limitPerPage))
    }

    return result;
  },
  cartTotal(state) {
    if (state.cart.length < 1) return 0;

    let totals = {};

    state.cart.map(product => {
      if (Object.keys(totals).indexOf(product.currency) > -1) {
        totals[product.currency] += parseFloat(product.priceValue, 2) * product.amount
      }
      else {
        totals[product.currency] = parseFloat(product.priceValue, 2) * product.amount
      }
      return product
    });

    return totals;
  },
  pagesCount(state) {
    if (state.pagination.totalProducts < 1) return 0
    if (state.pagination.limit > state.pagination.totalProducts) return 1
    return Math.floor(state.pagination.totalProducts / state.pagination.limit)
  }
};
