<template>
  <v-container fluid fill-height>
    <v-layout xs12 row d-inline-block>
      <v-card>
        <!-- <v-card-media :src="profile.profile_image" height="200px"></v-card-media> -->
        <v-layout row wrap>
          <v-flex xs12>
            <v-tabs fixed-tabs v-model="tab">
              <v-tabs-slider color="amber"></v-tabs-slider>
              <v-tab v-for="(item, i) in items" :key="i">
                {{ item.label }}
              </v-tab>
            </v-tabs>
          </v-flex>
          <v-flex xs12>
            <v-tabs-items v-model="tab">
              <!-- <v-tab-item v-for="(item, i) in items" :key="i"> -->
                <v-tab-item>
                  <v-card flat>
                    <v-card-title primary-title>
                      <h1 class="font-weight-regular">Welcome back</h1>
                    </v-card-title>
                    <v-layout row justify-center fill-height>
                      <v-flex xs6 class="pa-5 text-xs-center">
                        <h1 class="font-weight-regular">Steem Connect</h1>
                        <v-layout column>
                          <v-flex xs6 offset-xs1>
                            <v-btn block :href="loginUrl" color="blue lighten-3">Steem Connect</v-btn>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                       <v-divider vertical></v-divider>
                      <v-flex xs6 class="pa-5 text-xs-center">
                        <h1 class="font-weight-regular">Guest account</h1>
                        <v-layout column>
                          <v-flex xs6 offset-xs1>
                            <v-btn block color="red lighten-2">Google +</v-btn>
                          </v-flex>
                          <v-flex xs6 offset-xs1>
                            <v-btn block color="blue">Facebook</v-btn>
                          </v-flex>
                          <v-flex xs6 offset-xs1>
                            <v-btn block>Email</v-btn>
                          </v-flex>
                        </v-layout>
                      </v-flex>
                    </v-layout>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                  <v-card-title primary-title>
                    <h1 class="font-weight-regular">New around? Sign up</h1>
                  </v-card-title>
                  <span class="ml-3 mb-3">
                    <v-checkbox label="I have read and agreed to the Terms of Service‌ and Privacy Policy."></v-checkbox>
                  </span>
                  <v-layout row justify-center fill-height>
                    <v-flex xs6 class="pa-5 text-xs-center">
                      <h1 class="font-weight-regular">Steem Connect</h1>
                      <v-layout column>
                        <v-flex xs6 offset-xs1>
                          <v-btn block color="blue lighten-3">Steem Connect</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                     <v-divider vertical></v-divider>
                    <v-flex xs6 class="pa-5 text-xs-center">
                      <h1 class="font-weight-regular">Guest account</h1>
                      <v-layout column>
                        <v-flex xs6 offset-xs1>
                          <v-btn block color="red lighten-2">Google +</v-btn>
                        </v-flex>
                        <v-flex xs6 offset-xs1>
                          <v-btn block color="blue">Facebook</v-btn>
                        </v-flex>
                        <v-flex xs6 offset-xs1>
                          <v-btn block>Email</v-btn>
                        </v-flex>
                      </v-layout>
                    </v-flex>
                  </v-layout>
                </v-card>
                </v-tab-item>
              <!-- </v-tab-item> -->
            </v-tabs-items>
          </v-flex>
          </v-tabs>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'sign-in',
  data() {
    return {
      tab: null,
      items: [
        {
          label:'Login',
          value: 'bookmarks',
          icon: 'bookmark',
          color: 'pink darlen-1'
        },
        {
          label:'Register',
          value: 'account-info',
          icon: 'account_circle',
          color: 'blue'
        }
      ]
    }
  },
  computed: {
    ...mapState({
      loginUrl: state => state.scLoginUrl
    })
  },
  mounted() {
    this.$store.dispatch('setSCLoginUrl');
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:100:300,400,500,700,900|Material+Icons');
</style>