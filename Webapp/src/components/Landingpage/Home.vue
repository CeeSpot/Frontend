<template>
    <div>
        <b-container fluid style="padding: 0; margin-top: 80px;">
            <carousel></carousel>
        </b-container>
        <b-container fluid class="bg-light pb-5" style="min-height: 400px; padding-top: 80px;">
            <b-row style="padding-bottom: 80px;">
                <b-col md="12">
                    <b-container>
                        <b-row>
                            <b-col md="12">
                                <h1>Our story</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem beatae
                                    dicta harum ipsa minima natus numquam repudiandae. Cumque cupiditate eius impedit
                                    libero provident quas quasi quibusdam, quo sed vel!</p>
                            </b-col>
                        </b-row>
                        <b-row class="mt-5">
                            <b-col md="4">
                                <b-card class="no-scale shadow-sm normal-card bg-white">
                                    Kaart 2
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card class="no-scale shadow-lg big-card">
                                    Kaart 1
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card class="no-scale shadow-sm normal-card">
                                    Kaart 3
                                </b-card>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid style="padding-top: 80px; padding-bottom: 80px;">
            <b-row class="mt-5">
                <b-col md="12">
                    <b-container>
                        <b-row>
                            <b-col md="8">
                                <h1>Meet our community</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur delectus error
                                    fugiat harum laboriosam nobis optio possimus repudiandae? A accusamus aperiam
                                    deleniti esse ex fugit.</p>
                                <p>Laborum nobis porro provident voluptatem. Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit. Accusantium adipisci commodi error eveniet nulla voluptatibus.
                                    Consectetur eligendi, fuga laborum molestiae placeat quasi quod, reiciendis, rerum
                                    saepe similique soluta ut vel.</p>

                            </b-col>
                            <b-col md="4" class="text-right">
                                <b-img src="/static/images/guy.png" rounded class="shadow"></b-img>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid style="background-color: #E60000; color: white; min-height: 250px;" class="shadow">
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
        <b-container fluid style="padding-top: 80px; padding-bottom: 80px;">
            <b-row class="mt-5">
                <b-col md="12">
                    <b-container>
                        <b-row>
                            <b-col md="12">
                                <h1>Meet our partners</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid aut deleniti dolor,
                                    enim facere fugiat in labore libero modi nisi provident quasi recusandae rerum
                                    similique tempore vel veritatis voluptas voluptate.</p>
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
        <b-container fluid id="bookATour">
            <b-row class="mt-5">
                <b-col md="12">
                    <b-container>
                        <b-row>
                            <b-col md="8">
                                <h1>Book a tour</h1>
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt iste maxime
                                    numquam sint tempora. Architecto at, ducimus eius enim in ipsum laboriosam, maiores
                                    natus nostrum officia perspiciatis porro rerum voluptatibus.</p>
                                <b-button variant="outline-danger" href="/contact">
                                    Book a tour!
                                </b-button>
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
    .bg-light {
        background-color: #fcfcfc;
    }

    .card {
        padding-left: 20px;
        background-image: url("/static/images/rectangle.svg");
        background-repeat: no-repeat;
    }

    .big-card {
        /*transform: scale(1.3);*/
        font-size: 1.2em;
        height: 220px;
    }

    .normal-card {
        font-size: 1em;
        height: 140px;
    }

    #bookATour {
        padding-top: 80px;
        background-image: url('/static/images/bart-jan.jpg');
        background-repeat: no-repeat;
        background-color: white;
        background-position: top right;
        padding-bottom: 80px;
        background-size: 30%;
    }

    @media (max-width: 768px) {
        #bookATour {
            background-image: none;
        }
    }


</style>
