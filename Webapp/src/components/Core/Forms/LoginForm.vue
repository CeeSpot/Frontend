<template>
  <b-form @submit="onSubmit">
    <b-row>
      <b-col md="10" offset-md="1">
        <b-alert show variant="danger" v-if="loginFailedMessage.length > 0">{{loginFailedMessage}}</b-alert>
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
    <!--<b-form-group id="exampleInputGroup3"-->
    <!--label="Food:"-->
    <!--label-for="exampleInput3">-->
    <!--<b-form-select id="exampleInput3"-->
    <!--:options="foods"-->
    <!--required-->
    <!--v-model="form.food">-->
    <!--</b-form-select>-->
    <!--</b-form-group>-->
    <!--<b-form-group id="exampleGroup4">-->
    <!--<b-form-checkbox-group v-model="form.checked" id="exampleChecks">-->
    <!--<b-form-checkbox value="me">Check me out</b-form-checkbox>-->
    <!--<b-form-checkbox value="that">Check that out</b-form-checkbox>-->
    <!--</b-form-checkbox-group>-->
    <!--</b-form-group>-->
    <b-row>
      <b-col md="10" offset-md="1">
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-link class="ml-2" v-on:click="goToRegister()">No account?</b-link>
      </b-col>
    </b-row>
  </b-form>
</template>

<script>
  import auth from '@/services/api/Authentication.js'

  export default {
    name: 'login-form',
    data() {
      return {
        msg: 'Register form',
        form: {
          username: '',
          password: '',
        },
        loginFailedMessage: ''
//                token : ''
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.path === '/my-specific-path') {
          vm.show = true;
        } else {
          vm.show = false;
        }
        next()
      });
    }, 
    methods: {
      goToRegister() {
        Emitter.$emit('goToRegisterFromLogin')
      },
      onSubmit(evt) {
        evt.preventDefault();
        this.$store.dispatch('obtainToken', [this.form.username, this.form.password])
          .then((response) => {
            if (response.data.success) {
              this.$store.commit('updateToken', response.data.token);
              location.href = '/';
            }else{
              this.loginFailedMessage = response.data.message;
            }
          })
          .catch((error) => {
            this.loginFailedMessage = error.data.message;
          });
//        auth.login(this.form).then((resp) => {
//          console.log(resp.data);
//          if (resp.data.success) {
//            Emitter.$emit('tokenReceived', resp.data.token);
//          } else {
//            this.loginFailedMessage = resp.data.message;
//          }
//        }).catch((resp) => {
//          this.loginFailedMessage = resp.data.message;
//        });
      }
    }
  }
</script>

<style>
  .col-form-label {
    font-weight: bold;
  }
</style>
