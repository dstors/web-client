<template>
	<v-layout row wrap class="pa-5">
		<v-flex xs12 class="my-3">
			<span class="subheading">
				Display Name:
        <v-btn icon flat color="primary" style="float: right;">
          <v-icon>edit</v-icon>
        </v-btn>
      </span>
      <br>
      <span class="title">
        {{ profile.real_name }}
      </span>
		</v-flex>
    <v-flex xs12 class="my-3">
      <span class="subheading">
        Description:
        <v-btn icon flat color="primary" style="float: right;">
          <v-icon>edit</v-icon>
        </v-btn>
      </span>
      <br>
      <span class="title">
        {{ profile.description ? profile.description : 'No description selected.' }}
      </span>
    </v-flex>
    <v-flex xs12 class="my-3">
      <span class="subheading">
        Country:
        <v-btn icon flat color="primary" style="float: right;">
          <v-icon>edit</v-icon>
        </v-btn>
      </span>
      <br>
      <span class="title">
        {{ profile.country ? profile.country : 'No country selected.' }}
      </span>
    </v-flex>
	</v-layout>
</template>

<script>
export default {
	name: 'account-info',
	props: ['profile']
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>