<template>
  <b-form @submit="onSubmit">
    <b-row>
      <b-col md="10" offset-md="1">
        <b-alert show variant="danger" v-if="loginFailedMessage.length > 0">{{loginFailedMessage}}</b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="10" offset-md="1">
        <b-form-group>
          <b-form-radio-group v-model="selected"
                              :options="options"
                              name="radioInline">
          </b-form-radio-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="10" offset-md="1">
        <b-form-group id="usernameGroup"
                      label="Username"
                      label-for="username">
          <b-form-input id="username"
                        type="username"
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
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required>
          </b-form-input>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="10" offset-md="1">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-link class="ml-2" v-on:click="goToRegister()">No account?</b-link>
        <b-link class="ml-2" v-on:click="gotToForgot()">Forgot password?</b-link>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>

export default {
  name: 'login-form',
  data () {
    return {
      msg: 'Register form',
      form: {
        username: '',
        password: ''
      },
      selected: 1,
      options: [
        { text: 'User', value: 1 },
        { text: 'Company', value: 2 }
      ],
      loginFailedMessage: ''
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (from.path === '/my-specific-path') {
        vm.show = true
      } else {
        vm.show = false
      }
      next()
    })
  },
  methods: {
    goToRegister () {
      Emitter.$emit('goToRegisterFromLogin')
    },
    gotToForgot() {
      window.location.href = '/forgot-password';
    },
    onSubmit(evt) {
      evt.preventDefault()
      this.$store.dispatch('obtainToken', [this.selected, this.form.username, this.form.password])
        .then((response) => {
          console.log(response)
          if (response.data.success) {
            this.$store.commit('updateToken', response.data.token)
            location.href = '/'
          } else {
            this.loginFailedMessage = response.data.data
          }
        })
        .catch((error) => {
          console.log(error)
          this.loginFailedMessage = error
        })
    }
  }
}
</script>

<style>
  .col-form-label {
    font-weight: bold;
  }
</style>
