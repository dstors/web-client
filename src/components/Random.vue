<template>
  <div>
    <v-btn @click="getStore">Create Store</v-btn>
    <h1>res.data</h1>
    {{ res.data }}
    <hr>
    <h1>res</h1>
  </div>
</template>

<script>
import api from '../api';
export default {
  name: 'random',
  data() {
    return {
      res: ''
    }
  },
  methods: {
    createStore() {
      console.log('Create Store')
      api().post('/store/add', { name: 'The first Store', description: 'This is the first Store ever on dStors.' })
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    },
    getStore() {
      console.log('Get Store')
      api().get('/store/get/user')
        .then(res => {
          console.log('Response')
          console.log(res)
          this.res = res;
        })
        .catch(err => console.log(err))
    }
  }
}
</script>

<style></style>