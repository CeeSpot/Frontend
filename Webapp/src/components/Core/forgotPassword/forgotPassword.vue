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
                    <b-form-group id="emailGroup"
                                label="Email"
                                label-for="email">
                    <b-form-input id="email"
                                    type="email"
                                    v-model="email"
                                    required>
                    </b-form-input>
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
            <b-col md="10" offset-md="1">
                <b-button type="submit" variant="primary" v-on:click="sendRecoveryMail()">Send recovery mail</b-button>
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
  name: 'ForgotPassword',
  data() {
    return {
        email: '',
        selected: 1,
        options: [
        { text: 'User', value: 1 },
        { text: 'Company', value: 2 }
        ]
    }
  },
  methods: {
      sendRecoveryMail() {
          if(this.selected == 1){
            let data = {
                email: this.email
            }
            recoveryApi.sendRecoveryMailUser(data).then(response => {
                if(response.data.success){
                        this.email = '';
                        this.$toasted.show('Successfully send recovery mail!',
                            {
                                position: 'top-center',
                                duration: 3000
                            }
                        )
                } else {
                        this.email = '';
                        this.$toasted.show('No company found with this email!',
                            {
                                position: 'top-center',
                                duration: 3000
                            }
                    )
                }
            });
        } else {
            let data = {
                email: this.email
            }
            recoveryApi.sendRecoveryMailCompany(data).then(response => {
                if(response.data.success){
                        this.email = '';
                        this.$toasted.show('Successfully send recovery mail!',
                            {
                                position: 'top-center',
                                duration: 3000
                            }
                        )
                } else {
                        this.email = '';
                        this.$toasted.show('No user found with this email!',
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
