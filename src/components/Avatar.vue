<template>
  <div class="avatar" v-bind:style="style">
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: ['src', 'size', 'radius'],
  computed: {
    style () {
      return {
        'width': this.size + 'px',
        'height': this.size + 'px',
        'border-radius': this.radius + '%',
        'background-image': this.hasImage ? 'url(' + this.src + ')' : 'none'
      }
    },
    hasImage () {
      return (this.src !== '')
    }
  }
}
</script>

<style>
.avatar {
  display: inline-block;
  background-color: black;
  color: white;
  width: 48px;
  height: 48px;
  font-size: 12px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: none;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, .5);
}
</style>