<template>
  <b-container class="mt-12">
    <b-row v-if="registerActive">
      <b-col md="8" offset-md="2">
        <b-card class="no-scale" tag="article"
                style="background-image: url('/static/images/loginForm.svg');background-position: 80px -80px; background-size: 120% 800px;background-repeat: no-repeat;">
          <b-row class="pt-4">
            <b-col class="text-center" md="6" offset-md="3">
              <b-img src="/static/images/ceecee-logo-black.svg" style="height: 100px;"></b-img>
            </b-col>
          </b-row>
          <registerform class="mt-5 pb-4"></registerform>
        </b-card>
      </b-col>
    </b-row>
    <b-row v-if="loginActive">
      <b-col sm="10" offset-sm="1" md="8" offset-md="2">
        <b-card class="no-scale"
                tag="article"
                style="background-image: url('/static/images/loginForm.svg');background-position: top left;background-position: 80px -80px; background-size: 120% 800px;background-repeat: no-repeat;min-height: 400px;">
          <b-row class="pt-4">
            <b-col class="text-center" md="6" offset-md="3">
              <b-img src="/static/images/ceecee-logo-black.svg" style="height: 100px;"></b-img>
            </b-col>
          </b-row>
          <!--<b-row>-->
          <!--<b-col md="10" offset-md="1">-->
          <!--<h4>Login</h4>-->
          <!--</b-col>-->
          <!--</b-row>-->
          <loginform class="mt-5 pb-4"></loginform>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import loginform from '@/components/Core/Forms/LoginForm'
import registerform from '@/components/Core/Forms/RegisterForm'

export default {
  name: 'Register',
  data() {
    return {
      msg: 'Welcome to register',
      registerActive: false,
      loginActive: true,
    }
  },
  methods: {
    switchLoginRegister() {
      this.registerActive = !this.registerActive;
      this.loginActive = !this.loginActive;
    }
  },
  mounted() {
    Emitter.$on('goToRegisterFromLogin', () => this.switchLoginRegister())
    Emitter.$on('goToLoginFromRegister', () => this.switchLoginRegister())
    Emitter.$on('registerred', () => {
      this.switchLoginRegister()
      this.$toasted.show('Successfully created your account',
        {
          position: 'top-center',
          duration: 5000
        }
      )
    })
  },
  components: {
    loginform,
    registerform
  }
}
</script>

<style scoped="">
  .mt-12 {
    margin-top: 120px;
  }

  .np-l-r .card-body {
    padding-left: 0;
    padding-right: 0;
  }

  .card {
    /*margin-top: 80px;*/
  }
</style>
