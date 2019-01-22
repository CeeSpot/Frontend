<template>
    <div>
        <b-container fluid style="padding: 0; margin-top: 80px;">
            <carousel></carousel>
        </b-container>
        <b-container fluid class="bg-white pt-5 pb-5" style="min-height: 400px;">
            <b-row>
                <b-col md="12">
                    <b-container>
                        <b-row>
                            <b-col md="12">
                                <h1>Our story</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem beatae dicta harum ipsa minima natus numquam repudiandae. Cumque cupiditate eius impedit libero provident quas quasi quibusdam, quo sed vel!</p>
                            </b-col>
                        </b-row>
                        <b-row class="mt-5">
                            <b-col md="3">
                                <b-card class="no-scale shadow-sm normal-card">
                                    Kaart 2
                                </b-card>
                            </b-col>
                            <b-col md="6">
                                <b-card class="no-scale shadow-lg big-card">
                                    Kaart 1
                                </b-card>
                            </b-col>
                            <b-col md="3">
                                <b-card class="no-scale shadow-sm normal-card">
                                    Kaart 3
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid>
            <b-row class="mt-5">
                <b-col md="12">
                    <b-container>
                        <b-row>
                            <b-col md="8">
                                <h1>Meet our community.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur delectus error fugiat harum laboriosam nobis optio possimus repudiandae? A accusamus aperiam deleniti esse ex fugit laborum nobis porro provident voluptatem. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium adipisci commodi error eveniet nulla voluptatibus. Consectetur eligendi, fuga laborum molestiae placeat quasi quod, reiciendis, rerum saepe similique soluta ut vel?</p>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet eius et, eum, fugit illum iste laborum natus necessitatibus nobis omnis quo reiciendis repellat sequi tempora ullam unde veritatis vero voluptas.</p>
                            </b-col>
                            <b-col md="4" class="text-right">
                                <b-img src="/static/images/guy.png" class="shadow"></b-img>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid style="background-color: #E60000; color: white; min-height: 250px;">
            <b-row class="mt-5 text-center">
                <b-col md="12">
                    <b-container>
                        <b-row class="pt-5">
                            <b-col md="4">
                                <font-awesome-icon style="font-size: 4.5em;" icon="coffee"/>
                                <h2>Great coffee!</h2>
                                <p>Unlimited coffee available</p>
                            </b-col>
                            <b-col md="4">
                                <font-awesome-icon style="font-size: 4.5em;" icon="coffee"/>
                                <h2>Great coffee!</h2>
                                <p>Unlimited coffee available</p>
                            </b-col>
                            <b-col md="4">
                                <font-awesome-icon style="font-size: 4.5em;" icon="coffee"/>
                                <h2>Great coffee!</h2>
                                <p>Unlimited coffee available</p>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid>
            <b-row class="mt-5">
                <b-col md="12">
                    <b-container>
                        <b-row>
                            <b-col md="12">
                                <h1>Meet our partners.</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut deleniti dolor, enim facere fugiat in labore libero modi nisi provident quasi recusandae rerum similique tempore vel veritatis voluptas voluptate.</p>
                            </b-col>
                        </b-row>
                        <b-row class="text-center">
                            <b-col md="4">
                                <b-card>
                                    <b-img src="/static/images/ceecee-logo-black.svg" fluid></b-img>
                                    <br><br>
                                    <h4>the cee spot</h4>
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card>
                                    <b-img src="/static/images/ceecee-logo-black.svg" fluid></b-img>
                                    <br><br>
                                    <h4>the cee spot</h4>
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card>
                                    <b-img src="/static/images/ceecee-logo-black.svg" fluid></b-img>
                                    <br><br>
                                    <h4>the cee spot</h4>
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import axios from 'axios'
  import Carousel from '@/components/Core/Carousel/Carousel' // Import the navigation into the base app
  export default {
    name: 'Landingpage',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted() {
    },
    components: {
      Carousel
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .big-card {
        /*transform: scale(1.3);*/
        font-size: 1.2em;
        height: 220px;
    }

    .normal-card {
        font-size: 1em;
        height: 140px;
    }
</style>
