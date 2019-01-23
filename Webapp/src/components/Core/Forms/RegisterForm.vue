<template>
    <b-form @submit="onSubmit">
        <b-row>
            <b-col md="10" offset-md="1">
                <b-alert show variant="danger" v-if="registerFailedMessage.length > 0">{{registerFailedMessage}}</b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="4" offset-md="1">
                <b-form-group id="firstNameGroup"
                              label="First name"
                              label-for="firstName">
                    <b-form-input id="firstName"
                                  type="text"
                                  v-model="form.firstname"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="2">
                <b-form-group id="insertionsGroup"
                              label="Insertions"
                              label-for="insertions">
                    <b-form-input id="insertions"
                                  type="text"
                                  v-model="form.insertions">
                    </b-form-input>
                </b-form-group>
            </b-col>
            <b-col md="4">
                <b-form-group id="lastNameGroup"
                              label="Lastname"
                              label-for="lastName">
                    <b-form-input id="lastName"
                                  type="text"
                                  v-model="form.lastname"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-form-group id="emailGroup"
                              label="Email"
                              label-for="email">
                    <b-form-input v-on:keyup.native="checkEmail" id="email"
                                  type="email"
                                  v-bind:style="{borderColor: emailCorrectColor}"
                                  v-model="form.email"
                                  required>
                    </b-form-input>
                    <small id="passwordGroup__BV_description_" class="form-text">
                        <span v-if="!emailCorrect && emailCorrect != null" class="text-danger">Email doesn't have the right format</span>
                    </small>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-form-group id="usernameGroup"
                              label="Username"
                              label-for="userName">
                    <b-form-input id="userName"
                                  type="text"
                                  v-model="form.username"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-form-group id="passwordGroup"
                              label="Password"
                              label-for="password"
                              >
                    <b-form-input v-on:keyup.native="passwordsMatch"  id="password"
                                  type="password"
                                  v-model="form.password"
                                  required>
                    </b-form-input>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-form-group id="passwordGroupRepeat"
                              label="Repeat Password"
                              label-for="passwordRepeat">
                    <b-form-input v-on:keyup.native="passwordsMatch" id="passwordRepeat"
                                  type="password"
                                  v-bind:style="{borderColor: passwordsMatchColor}"
                                  v-model="form.passwordRepeat"
                                  required>
                    </b-form-input>
                    <small id="passwordGroup__BV_description_" class="form-text">
                        <span v-if="passwordMatch" class="text-success">Passwords match</span>
                        <span v-if="!passwordMatch && passwordMatch != null" class="text-danger">Passwords do not match</span>
                    </small>
                </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col md="10" offset-md="1">
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-link class="ml-2" v-on:click="goToLogin()">Already a member?</b-link>
            </b-col>
        </b-row>
    </b-form>
</template>

<script>
import auth from '@/services/api/Authentication.js'
export default {
  name: 'register-form',
  data () {
    return {
      msg: 'Register form',
      form: {
        username: '',
        password: '',
        passwordRepeat: '',
        firstname: '',
        insertions: '',
        lastname: '',
        email: ''
      },
      passwordMatch: null,
      passwordsMatchColor: '#ced4da',

      emailCorrect: null,
      emailCorrectColor: '#ced4da',
      registerFailedMessage: ''
    }
  },
  methods: {
    goToLogin () {
      Emitter.$emit('goToLoginFromRegister')
    },
    onSubmit (evt) {
      evt.preventDefault()
      auth.register(this.form).then((resp) => {
        console.log(resp)
        if (resp.data.success) {
          Emitter.$emit('registerred', resp.data.token)
        } else {
          this.registerFailedMessage = resp.data.data
        }
      }).catch((resp) => {
        console.log(resp)
        this.registerFailedMessage = resp.data.data;
      })
    },
    passwordsMatch: function (event) {
      if (this.form.password === this.form.passwordRepeat) {
        this.passwordsMatchColor = '#28a745'
        this.passwordMatch = true
      } else {
        this.passwordsMatchColor = '#bd2130'
        this.passwordMatch = false
      }
    },
    checkEmail: function (event) {
      if (this.validateEmail(this.form.email)) {
        this.emailCorrectColor = '#ced4da'
        this.emailCorrect = true
      } else {
        this.emailCorrectColor = '#bd2130'
        this.emailCorrect = false
      }
    },
    validateEmail (email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email)
    }
  }
}
</script>

<style>
    .col-form-label{
        font-weight: bold;
    }
</style>
