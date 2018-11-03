<template>
  <div class="banner" v-bind:style="style">
    <!-- <img :src="src" width="100%"> -->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'banner',
  props: ['src'],
  computed: {
    ...mapState({
      dark: state => state.styles.dark
    }),
    rgb() {
      return '255, 255, 255,';
    },
    style () {
      return {
        background: '-moz-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(' + this.rgb + ' 0.65) 100%), url(' + this.src + ') no-repeat',
        background: '-webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(0, 0, 0, 0)), color-stop(59%, rgba(0, 0, 0, 0)), color-stop(100%, rgba(' + this.rgb + ' 0.65))), url(' + this.src + ') no-repeat',
        background: '-webkit-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(' + this.rgb + ' 0.65) 100%), url(' + this.src + ') no-repeat',
        background: '-o-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(' + this.rgb + ' 0.65) 100%), url(' + this.src + ') no-repeat',
        background: '-ms-linear-gradient(top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(' + this.rgb + ' 0.65) 100%), url(' + this.src + ') no-repeat',
        background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 59%, rgba(' + this.rgb + ' 0.65) 100%), url(' + this.src + ') no-repeat',
        height: '300px',
        'background-size': 'cover' ,
        'background-position': 'center center',
        'background-repeat': 'no-repeat',
      }
    },
    hasImage () {
      return (this.src !== '')
    }
  }
}
</script>

<style>
</style>