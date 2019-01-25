<template>
    <b-container fluid style="margin-top: 90px;">
        <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
            <b-container>
                <b-row>
                    <b-col md="12" class="text-white">
                        <b-row>
                            <b-col md="12">
                                <h1 class="text-white font-weight-bold">
                                    {{$t('contact.contact-us')}}
                                </h1>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col class="opacity-text-8" md="12">
                               <div v-html="text"></div>
                            </b-col>
                        </b-row>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
        <b-row style="margin-top: -80px;">
            <b-container>
                <b-row>
                    <b-col md="7">
                        <b-card class="no-scale">
                            <form>
                                <b-row>
                                    <b-col md="4">
                                        <label>{{$t('contact.name')}}</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input id="name" v-model="name" name="name" type="text"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label>{{$t('contact.email')}}</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input id="email" v-model="to" name="email" type="text"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label>{{$t('contact.phone')}}</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input id="phone" v-model="phone" name="phone" type="text"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label>{{$t('contact.subject')}}</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input id="subject" v-model="subject" name="subject" type="text"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label>{{$t('contact.message')}}</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-textarea id="message"
                                                         v-model="message"
                                                         name="message"
                                                         rows="3"
                                                         max-rows="6">
                                        </b-form-textarea>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4"></b-col>
                                    <b-col md="8">
                                        <b-button v-on:click="sendMail" variant="danger" block>{{$t('contact.send-message-button')}}</b-button>
                                    </b-col>
                                </b-row>
                            </form>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card class="no-scale">
                            <ul class="list-unstyled">
                                <li><span class="font-weight-bold">the cee spot</span></li>
                                <li>Brouwerijstraat 1</li>
                                <li>7523 XC Enschede</li>
                                <li>The Netherlands</li>
                                <li>&nbsp;</li>
                                <li><a href="mailto:info@ceecee.community">info@ceecee.community</a></li>
                            </ul>
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
    </b-container>
</template>


<script>
  import contact from '@/services/api/contact.js'
  import websiteApi from '@/services/api/website.js'
  export default {
    name: 'Contact',
    data() {
      return {
        name: '',
        to: '',
        phone: '',
        subject: '',
        message: '',
        text: ''
      }
    },
    mounted() {
        websiteApi.getOneText(4).then(response => {
          if(this.language === "en") {
            this.text = response.data.data[0].value_en;
          } else {
            this.text = response.data.data[0].value_nl;
          }

        })
    },
    methods: {
      sendMail() {
        contact.sendMail({
          to: this.to,
          name: this.name,
          phone: this.phone,
          subject: this.subject,
          message: this.message
        });
        this.$router.push({path: '/contact/success'})
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
