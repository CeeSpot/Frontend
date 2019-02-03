<template>
    <div style="margin-top: 150px;">
        <b-container fluid id="sliderContainer">
            <b-row style="height: inherit;">
                <b-col style="height: inherit;" class="p-0">
                <swiper ref="mySwiper" style="height: 100%;" :options="swiperOption" @slideChange="slideChanged">

                    <!-- slides -->
                    <swiper-slide class="swiper-slider" style="background-image: url('/static/images/header.png')" data-title="Event 1" data-date="28-01-2019" data-eventid="1"></swiper-slide>
                    <swiper-slide class="swiper-slider" style="background-image: url('/static/images/header.jpg')" data-title="Event 2" data-date="29-01-2019" data-eventid="2"></swiper-slide>
                    <!-- Optional controls -->
                </swiper>
                </b-col>
            </b-row>
        </b-container>
        <b-container fluid id="headerContainer">
            <b-row>
                <b-col xs="2" class="pt-5 pl-5">
                    <b-img src="/static/images/ceespot_logo.svg" class="mt-4"></b-img>
                </b-col>
                <b-col xs="10" class="pt-5">
                    <b-navbar toggleable="md">

                        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

                        <b-collapse is-nav id="nav_collapse" class="navbar">

                            <!-- Right aligned nav items -->
                            <b-navbar-nav class="ml-auto font-weight-bold">
                                <b-nav-item href="#">Link</b-nav-item>
                                <b-nav-item href="#">Link</b-nav-item>
                                <b-nav-item href="#">Link</b-nav-item>
                                <b-nav-item href="#">Link</b-nav-item>
                            </b-navbar-nav>

                        </b-collapse>
                    </b-navbar>

                </b-col>
            </b-row>
            <b-row style="color: white;">
                <b-col class="mt-5 pl-5">
                    <h1 class="font-weight-bold">{{ eventTitle }}</h1>
                    <h2 style="width: 300px;">{{ eventDate }}</h2>
                    <b-button id="signUpButton" href="#">Sign up!</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import eventApi from '@/services/api/events.js'

export default {
    name: "test",
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 5000
          },
        },
        eventTitle: '',
        eventDate: '',
        eventId: '',
        slides: [
          {
            eventTitle: 'Event 1',
            eventDate : '29-02-2019',
            eventId   : '1'
          },
          {
            eventTitle: 'Event 2',
            eventDate : '05-03-2019',
            eventId   : '2'
          }
        ]
      }
    },
    computed: {
      swiper() {
        return this.$refs.mySwiper.swiper
      }
    },
    methods: {
      slideChanged() {
        let activeSlide = this.slides[this.swiper.activeIndex];
        this.eventTitle = activeSlide.eventTitle;
        this.eventDate  = activeSlide.eventDate;
        this.eventId    = activeSlide.eventId;
      }
    },
    mounted() {

      eventApi.getUpcoming().then((data) => {
        for(let i = 0; i < 3; i++){
          console.log(data.data.data[i]);
          uploadFile.checkIfFileExists(this.imageBaseURL + '/event/' + data.data.data[i].id + '.jpg').then((res) => {
            this.slides.push({
              eventTitle: data.data.data[i].title,
              eventDate: data.data.data[i].date,
              img: this.imageBaseURL + '/event/' + data.data.data[i].id+ '.jpg',
              eventId: data.data.data[i].id
            });
          }).catch((err) => {
            this.slides.push({
              eventTitle: data.data.data[i].title,
              eventDate: data.data.data[i].date,
              img: '/static/images/header.png',
              eventId: data.data.data[i].id

            });
          });
        }
        if(this.slides.length > 0) {
          this.eventTitle = this.slides[0].eventTitle;
          this.eventDate = this.slides[0].eventDate;
          this.eventId = this.slides[0].eventId;
        }
      });


    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
    #headerContainer {
        height: 700px;
        background-image: url("/static/images/rect.svg");
        background-repeat: no-repeat;
        background-size: contain;
        z-index: 1;
        position: absolute;
        text-shadow: #1b1e21;
    }

    #sliderContainer {
        z-index: 0;
        position: absolute;
        height: 800px;
        /*background-image: url("/static/images/header.png");*/
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
    }

    .navbar {
        color: white !important;
    }

    .nav-item > a {
        color: white !important;
    }

    .swiper-slider {
        background-size: cover !important;
        background-position: center center !important;
        background-repeat: no-repeat !important;
    }

    #signUpButton {
        background-color: white;
        color: black;
        border: none;
        box-shadow: 0px 3px 3px #5b5b5b;
    }

    @media (max-width: 576px) {
        #headerContainer {
            background-image: none;
            background: linear-gradient(to bottom, #E60000, rgba(91, 91, 91, 0) 80%);

        }
    }

</style>