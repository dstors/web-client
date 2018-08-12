export default {
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