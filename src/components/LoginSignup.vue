<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field
      v-model="name"
      :rules="nameRules"
      :counter="10"
      label="Name"
      required
    ></v-text-field>
    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      :rules="passwordRules"
      required
    ></v-text-field>
    <v-text-field
      v-model="confirmPassword"
      label="Confirm password"
      type="password"
      :rules="passwordConfirmationRules"
      required
    ></v-text-field>
    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      @click="register"
    >
      register
    </v-btn>
    <v-btn @click="clear">clear</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginSignup',
  data() {
    return {
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      confirmPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length > 8 || 'Password must contain at least 8 characters'
      ],
      passwordConfirmationRules: [
        v => !!v || 'Password confirmation is required',
        v => v === this.password || 'Password confirmation must be the same than password'
      ],
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
      ],
      checkbox: false
    }
  },
  methods: {
      async register () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          console.log({ name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox })
          try {
            const res = await axios.post('http://localhost:2017/public/register', {
              name: this.name,
              email: this.email,
              password: this.password,
              password2: this.confirmPassword,
              checkbox: this.checkbox
            })

            const {
              data: {
                token,
                user
              }
            } = res

            localStorage.setItem('token', token)
            console.log(token, user)
          } catch (error) {
            console.log(error)
            console.log(error.response.data.msg)
          }

        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
}
</script>