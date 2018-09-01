<template>
	<post-list :posts="bookmarks"></post-list>
</template>

<script>
import PostList from './PostList';
export default {
  components: { PostList },
	name: 'bookmarks',
  props: ['bookmarks']
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>