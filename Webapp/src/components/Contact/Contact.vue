<template>
    <b-container fluid style="margin-top: 100px;">
        <b-row style="background: linear-gradient(to right, #1d2337 40%,#1d2337);padding-top: 50px;padding-bottom: 150px;">
            <b-container>
                <b-row>
                    <b-col md="2">
                        <b-img rounded="circle" width="200" height="200" class="image-border"
                               src="https://www.theceespot.nl/img/school-of-AI-simply-scaled-640.jpg"></b-img>
                    </b-col>
                    <b-col md="9" class="text-white ml-5">
                        <b-row>
                            <b-col md="12">
                                <h1 class="text-white font-weight-bold">
                                    Contact us!
                                </h1>
                            </b-col>
                        </b-row>
                        <b-row class="mt-3">
                            <b-col class="opacity-text-8" md="12">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam autem consequuntur
                                corporis dolore enim esse, facere fuga fugit harum maxime neque praesentium quam, quos,
                                ratione repellendus repudiandae sequi ut vel.
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
                                        <label :for="name">Name</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input :id="name" :name="name" :type="text"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label :for="name">Email</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input :id="email" :name="email" :type="email"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label :for="phone">Phone</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input :id="phone" :name="phone" :type="phone"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label :for="subject">Subject</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-input :id="subject" :name="subject" :type="text"></b-form-input>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4">
                                        <label :for="message">Message</label>
                                    </b-col>
                                    <b-col md="8">
                                        <b-form-textarea id="message"
                                                         name="message"
                                                         :rows="3"
                                                         :max-rows="6">
                                        </b-form-textarea>
                                    </b-col>
                                </b-row>
                                <b-row class="mt-1">
                                    <b-col md="4"></b-col>
                                    <b-col md="8">
                                        <b-button variant="danger" block>Send message</b-button>
                                    </b-col>
                                </b-row>
                            </form>
                        </b-card>
                    </b-col>
                    <b-col>
                        <b-card class="no-scale">
                            Address
                        </b-card>
                    </b-col>
                </b-row>
            </b-container>
        </b-row>
    </b-container>
</template>


<script>
  export default {
    name: 'Contact',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
