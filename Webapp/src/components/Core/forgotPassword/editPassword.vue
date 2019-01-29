<template>
  <b-container class="mt-12">
    <b-row>
      <b-col md="8" offset-md="2">
        <b-card class="no-scale" tag="article"
                style="background-image: url('/static/images/loginForm.svg');background-position: 80px -80px; background-size: 120% 800px;background-repeat: no-repeat;">
          <b-row class="pt-4">
            <b-col class="text-center" md="6" offset-md="3">
              <b-img src="/static/images/ceecee-logo-black.svg" style="height: 100px;"></b-img>
            </b-col>
          </b-row>
              <b-row>
                <b-col md="10" offset-md="1">
                    <b-form-group id="passwordGroup"
                                label="New password"
                                label-for="password">
                    <b-form-input id="password"
                                    type="password"
                                    v-model="newPassword"
                                    required>
                    </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
            <b-col md="10" offset-md="1">
                <b-button type="submit" variant="primary" v-on:click="saveNewPassword()">Save password</b-button>
            </b-col>
            </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import recoveryApi from '@/services/api/recovery.js'
export default {
  name: 'editForgotPassword',
  data() {
    return {
        newPassword: ''
    }
  },
  created() {
      this.id = this.$route.params.id;
      this.type = this.$route.params.type;
  },
  methods: {
      saveNewPassword() {
          if(this.type == 'user'){
            let data = {
                newPassword: this.newPassword,
                recoverystring: this.id
            }
            recoveryApi.editPasswordUser(data).then(response => {
              if(response.data.success){
                      this.$toasted.show('Successfully changed password!',
                          {
                              position: 'top-center',
                              duration: 3000
                          }
                      )
              } else {
                      this.$toasted.show('Something went wrong try again later!',
                          {
                              position: 'top-center',
                              duration: 3000
                          }
                  )
              }
          });
        } else if (this.type == 'company') {
            let data = {
                newPassword: this.newPassword,
                recoverystring: this.id
            }
            recoveryApi.editPasswordCompany(data).then(response => {
              if(response.data.success){
                      this.$toasted.show('Successfully changed password!',
                          {
                              position: 'top-center',
                              duration: 3000
                          }
                      )
              } else {
                      this.$toasted.show('Something went wrong try again later!',
                          {
                              position: 'top-center',
                              duration: 3000
                          }
                  )
              }
          });
        }
      }
  },
  mounted() {

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
