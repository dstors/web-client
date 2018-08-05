const categories = ['Art', 'Furniture']
const tags = ['steem', 'steemit', 'crypto']
const countries = ['Argentina', 'United States']
const states = ['California', 'Buenos Aires']
const cities = ['Los Angeles', 'Capital Federal']

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createFeed = (posts_amount) => {
	let feed = []
  for (let i = 0; i < posts_amount; i ++) {
    let category = i % 2 == 0
      ? categories[0]
      : categories[1];

    let entry = {
      post: {
        title: 'Product #' + i,
        content: 'This is product #' + i
      },
      category,
      tags: [tags[getRandomInt(0, 2)]],
      location: {
        country: countries[getRandomInt(0, 1)],
        state: states[getRandomInt(0, 1)],
        city: cities[getRandomInt(0, 1)]
      },
      price: getRandomInt(0, 500)
    };

    feed.push(entry);
  }
  return feed
}

let feed = createFeed(19)

export default feed;