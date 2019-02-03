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
                          aria-describedby="nameFeedback"
                          :state="!$v.form.name.$invalid"
                          required>
            </b-form-input>
            <b-form-invalid-feedback id="nameFeedback">
              Name is required
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group id="emailGroup"
                        label="Email"
                        label-for="email">
            <b-form-input id="email"
                          type="email"
                          v-model="form.email"
                          aria-describedby="emailFeedback"
                          :state="!$v.form.email.$invalid"
                          required>
            </b-form-input>
            <b-form-invalid-feedback id="emailFeedback">
              Email is required and must be of valid format
            </b-form-invalid-feedback>
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
                          aria-describedby="usernameFeedback"
                          :state="!$v.form.username.$invalid"
                          required>
            </b-form-input>
            <b-form-invalid-feedback id="usernameFeedback">
              Username is required and must be 5 characters
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group id="passwordGroup"
                        label="Password"
                        label-for="password">
            <b-form-input id="password"
                          type="password"
                          v-model="form.password"
                          :state="!$v.form.password.$invalid"
                          aria-describedby="passwordFeedback"
                          required>
            </b-form-input>
            <b-form-invalid-feedback id="passwordFeedback">
              Password is required and must be atleast 5 characters long
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-form-group id="passwordGroupRepeat"
                        label="Repeat Password"
                        label-for="passwordRepeat">
            <b-form-input id="passwordRepeat"
                          type="password"
                          v-model="form.passwordRepeat"
                          aria-describedby="newPasswordFeedback"
                          :state="!$v.form.passwordRepeat.$invalid"
                          required>
            </b-form-input>
            <b-form-invalid-feedback id="newPasswordFeedback">
              New passwords must match
            </b-form-invalid-feedback>
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
          <b-btn variant="primary" v-on:click="registerCompanyAccount"
                 :disabled="$v.form.$invalid">Register</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import auth from '@/services/api/Authentication.js'
import { validationMixin } from 'vuelidate'
import {required, minLength, sameAs, email} from 'vuelidate/lib/validators'

export default {
  name: 'registerCompanyAccount',
  data () {
    return {
      form: {},
      failedMessage: ''
    }
  },
  mixins: [
    validationMixin
  ],
  validations: {
    form: {
      name: {
        required
      },
      username: {
        required,
        minLength: minLength(5)
      },
      password: {
        required,
        minLength: minLength(5)
      },
      passwordRepeat: {
        sameAsPassword: sameAs('password')
      },
      email: {
        required, email
      }
    }
  },
  methods: {
    registerCompanyAccount() {
      auth.registerCompany(this.form).then((resp) => {
        if (resp.data.success) {
          this.$toasted.show('Successfully registered company!',
            {
              position: 'top-center',
              duration: 3000
            }
          )
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
        this.failedMessage = err
      })

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
