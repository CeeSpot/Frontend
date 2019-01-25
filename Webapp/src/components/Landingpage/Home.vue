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
                                <h1>{{$t('home.our-story')}}</h1>
                                <div v-html="storytext"></div>
                            </b-col>
                        </b-row>
                        <b-row class="mt-5 text-center">
                            <b-col md="4">
                                <b-card class="no-scale shadow-sm normal-card bg-white">
                                    <h4>{{$t('home.community')}}</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, alias aperiam.</p>
                                    <b-button variant="outline-danger" href="/community">
                                        {{$t('home.community-button')}}
                                    </b-button>
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card class="no-scale shadow-lg big-card te">
                                    <h3>{{$t('home.book-a-tour')}}</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad animi dignissimos ipsa.</p>
                                    <b-button variant="danger" href="/contact">
                                       {{$t('home.book-a-tour-button')}}
                                    </b-button>
                                </b-card>
                            </b-col>
                            <b-col md="4">
                                <b-card class="no-scale shadow-sm normal-card">
                                    <h4>{{$t('home.spaces')}}</h4>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur ducimus.</p>
                                    <b-button variant="outline-danger" href="/spaces">
                                        {{$t('home.spaces-button')}}
                                    </b-button>
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
                                <h1>{{$t('home.meet-our-community')}}</h1>
                                <div v-html="communitytext"></div>
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
                                <h1>{{$t('home.meet-our-partners')}}</h1>
                                <div v-html="partners"></div>
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
                                <h1>{{$t('home.book-a-tour2')}}</h1>
                                <div v-html="booktour"></div>
                                <b-button variant="outline-danger" href="/contact">
                                    {{$t('home.book-a-tour2-button')}}
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
  import websiteApi from '@/services/api/website.js'
  export default {
    name: 'Landingpage',
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        text: [],
        storytext: '',
        communitytext: '',
        partners: '',
        booktour: ''
      }
    },
    mounted() {
    websiteApi.getText().then(response => {
      if(this.language === "en") {
        this.storytext = response.data.data[4].value_en;
        this.communitytext = response.data.data[2].value_en;
        this.partners = response.data.data[5].value_en;
        this.booktour = response.data.data[1].value_en;
      } else {
        this.storytext = response.data.data[4].value_nl;
        this.communitytext = response.data.data[2].value_nl;
        this.partners = response.data.data[5].value_nl;
        this.booktour = response.data.data[1].value_nl;
      }
      console.log(response);
    })
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
        /*padding-left: 20px;*/
        background-image: url("/static/images/rectangle.svg");
        background-repeat: no-repeat;
    }

    .big-card {
        /*transform: scale(1.3);*/
        font-size: 1.2em;
        min-height: 220px;
    }

    .normal-card {
        font-size: 1em;
        min-height: 200px;
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
