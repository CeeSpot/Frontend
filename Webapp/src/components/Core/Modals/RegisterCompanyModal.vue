<template>
  <!-- Modal Component -->
  <b-modal id="RegisterCompanyModal" ref="RegisterCompanyModal" size="lg">
    <!--:title="selectedEvent.title" -->
    <div slot="modal-header" style="width: 100%;">
      <b-row>
        <b-col xs="6">
          <h3 class="text-white">Create company account</h3>
        </b-col>
        <b-col class="text-right" xs="6">
          <button v-on:click="closeModal"
                  style="border-radius: 20px; width: 40px; height: 40px; border: none; background-color: white; cursor: pointer;">
            <font-awesome-icon icon="times"/>
          </button>
        </b-col>
      </b-row>
    </div>

    <b-form @submit="registerCompanyAccount">

      <b-row>
        <b-col>
          <b-alert show variant="danger" v-if="failedMessage.length > 0">{{failedMessage}}</b-alert>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group id="nameGroup"
                        label="Name"
                        label-for="name">
            <b-form-input id="name"
                          type="email"
                          v-model="form.name"
                          required>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
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
            <span v-if="!emailCorrect && emailCorrect != null"
                  class="text-danger">Email doesn't have the right format</span>
            </small>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
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
        <b-col>
          <b-form-group id="passwordGroup"
                        label="Password"
                        label-for="password">
            <b-form-input v-on:keyup.native="passwordsMatch" id="password"
                          type="password"
                          v-model="form.password"
                          required>
            </b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
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
    </b-form>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
          <b-btn variant="primary" v-on:click="registerCompanyAccount">Register</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import auth from '@/services/api/Authentication.js'
export default {
  name: 'registerCompanyAccount',
  data () {
    return {
      form: {
        username: '',
        password: '',
        passwordRepeat: '',
        email: '',
        name: ''
      },
      passwordMatch: null,
      passwordsMatchColor: '#ced4da',

      emailCorrect: null,
      emailCorrectColor: '#ced4da',
      failedMessage: ''
    }
  },
  methods: {
    registerCompanyAccount() {
      if (this.passwordMatch && this.emailCorrect) {
        auth.registerCompany(this.form).then((resp) => {
          if (resp.data.success) {
            this.$refs.RegisterCompanyModal.hide()
            this.form = {
              username: '',
              password: '',
              passwordRepeat: '',
              email: '',
              name: ''
            }
            this.passwordMatch = null
            this.emailCorrect = null
          } else {
            this.failedMessage = resp.data.data
          }
        }).catch((err) => {
          this.failedMessage = err.data.data
        })
      }
    },
    closeModal() {
      this.$refs.RegisterCompanyModal.hide()
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
    validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
  }
}
</script>

<style scoped>

</style>
