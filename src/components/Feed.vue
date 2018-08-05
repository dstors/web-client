<template>
  <div class="hello">
    <a :href="link">Login</a>
    <input type="text" v-model="username"  v-on:change="getFeed()">
    <h1>{{ username }}</h1>
    <div v-for="post in feed">
      <h2> {{ post.author }} </h2>
      <h1> {{ post.title }} </h1>
    </div>
  </div>
</template>

<script>
const sc2 = require('sc2-sdk');

// init steemconnect
let api = sc2.Initialize({
    app: 'sfmdapp',
    callbackURL: 'http://localhost:8080',
    accessToken: 'access_token',
    scope: ['vote', 'comment'],
});

export default {
  name: 'Feed',
  props: {
    msg: String,
  },
  data: function() {
    return {
      username: 'julianmnst',
      feed: [],
      link: api.getLoginURL()
    }
  },
  methods: {
    // getFeed: function() {
    //   steem.api.getDiscussionsByBlog({tag: this.username, limit: 10},
    //     (err, blog) =>  {
    //       if (err) {
    //         alert(err)
    //       }
    //       else if (blog) {
    //         this.feed = blog
    //       }
    //     }
    //   );
    // }
  },
  // mounted() {
  //   this.getFeed();
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
