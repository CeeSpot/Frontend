<template>
  <!-- Modal Component -->
  <b-modal id="ChangePasswordModal" ref="ChangePasswordModal" size="lg">
    <!--:title="selectedEvent.title" -->
    <div slot="modal-header" style="width: 100%;">
      <b-row>
        <b-col xs="6">
          <h3 class="text-white">Change password</h3>
        </b-col>
        <b-col class="text-right" xs="6">
          <button v-on:click="closeModal"
                  style="border-radius: 20px; width: 40px; height: 40px; border: none; background-color: white; cursor: pointer;">
            <font-awesome-icon icon="times"/>
          </button>
        </b-col>
      </b-row>
    </div>

    <b-row>
      <b-col>
        <b-alert show variant="danger" v-if="passwordChangedMessage.length > 0">{{passwordChangedMessage}}</b-alert>
      </b-col>
    </b-row>
    <b-form @submit="onSubmit">
      <b-form-group label="Password" label-for="password">
        <b-form-input id="password"
                      type="password"
                      v-model="form.password">
        </b-form-input>
      </b-form-group>
      <b-form-group label="New password" label-for="newPassword">
        <b-form-input v-on:keyup.native="passwordsMatch"
                      id="newPassword"
                      type="password"
                      v-model="form.newPassword">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Repeat new password" label-for="repeatNewPassword">
        <b-form-input v-on:keyup.native="passwordsMatch"
                      id="repeatNewPassword"
                      type="password"
                      v-bind:style="{borderColor: passwordsMatchColor}"
                      v-model="form.repeatNewPassword">
        </b-form-input>
        <small id="passwordGroup__BV_description_" class="form-text">
          <span v-if="passwordMatch" class="text-success">Passwords match</span>
          <span v-if="!passwordMatch && passwordMatch != null" class="text-danger">Passwords do not match</span>
        </small>
      </b-form-group>
    </b-form>

    <footer slot="modal-footer">
      <b-row>
        <b-col>
          <b-btn variant="secondary" v-on:click="closeModal">Cancel</b-btn>
          <b-btn variant="primary" v-on:click="onSubmit">Save</b-btn>
        </b-col>
      </b-row>
    </footer>
  </b-modal>
</template>

<script>
import auth from '@/services/api/Authentication.js'

export default {
  name: 'ChangePasswordModal',
  data () {
    return {
      name: 'ChangePasswordModal',
      url: '',
      form: {
        password: '',
        newPassword: '',
        repeatNewPassword: ''
      },
      passwordChangedMessage: '',
      passwordMatch: null,
      passwordsMatchColor: '#ced4da',
      selected: -1
    }
  },
  methods: {
    closeModal () {
      this.$refs.ChangePasswordModal.hide()
    },
    onSubmit (evt) {
      if (this.passwordMatch) {
        auth.changePassword(this.form, this.type).then((data) => {
          if (data.data.success === true) {
            this.$refs.ChangePasswordModal.hide()
            this.$toasted.show('Successfully changed password!',
                  {
                    position: 'top-center',
                    duration: 3000
                  }
            )
            if (this.type === 1) {
              Emitter.$emit('userPasswordChanged', data.data.token)
            } else if (this.type === 2) {
              Emitter.$emit('companyPasswordChanged', data.data.token)
            }
          } else {
            this.passwordChangedMessage = data.data.data
          }
          this.form.password = ''
          this.form.newPassword = ''
          this.form.repeatNewPassword = ''
          this.passwordsMatchColor = '#ced4da'
          this.passwordMatch = null
        }).catch((err) => {
          alert(JSON.stringify(err))
          this.passwordChangedMessage = err.data
        })
      } else {
        this.passwordChangedMessage = 'New passwords must match'
      }
    },
    passwordsMatch: function (event) {
      if (this.form.newPassword === this.form.repeatNewPassword) {
        this.passwordsMatchColor = '#28a745'
        this.passwordMatch = true
      } else {
        this.passwordsMatchColor = '#bd2130'
        this.passwordMatch = false
      }
    }
  },
  props: ['username', 'userid', 'type']
}
</script>

<style>
  label {
    font-weight: bold;
  }
</style>
