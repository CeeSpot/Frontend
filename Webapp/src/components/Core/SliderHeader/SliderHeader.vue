<template>
    <div id="containerDiv">
        <b-container fluid id="sliderContainer">
            <b-row style="height: inherit;">
                <b-col style="height: inherit;" class="p-0">
                    <swiper ref="mySwiper" style="height: 100%;" :options="swiperOption" @slideChange="slideChanged">
                        <swiper-slide v-for="slide in this.slides" class="swiper-slider"
                                      v-bind:style="{ backgroundImage: 'url(' + slide.eventImg + ')' }"></swiper-slide>
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
                        <menu-list></menu-list>
                    </b-navbar>

                </b-col>
            </b-row>
            <b-row style="color: white;">
                <b-col class="mt-5 pl-5">
                    <h1 style="width: 300px;" class="font-weight-bold">{{ eventTitle | truncate(30, '...')}}</h1>
                    <h2 style="width: 300px;">{{ getDateAsText(eventDate) }}</h2>
                    <b-button id="signUpButton" v-bind:href='getEventRoute(eventId)'>Sign up!</b-button>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import eventApi from '@/services/api/events.js'
  import MenuList from "../Navigation/MenuList";
  import uploadFile from '@/services/api/uploadFile.js'
  import moment from 'moment'
  export default {
    name: "slider-header",
    data() {
      return {
        swiperOption: {
          spaceBetween: 30,
          centeredSlides: true,
          autoplay: {
            delay: 5000
          },
          allowTouchMove: false
        },
        eventTitle: '',
        eventDate: '',
        eventId: '',
        slides: [],
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
      },
      getDateAsText(date) {
        return moment(date).format('DD-MM-YYYY')
      },
      getEventRoute(id) {
        return encodeURI('/event/' + id + '/' + this.eventTitle);
      }
    },
    mounted() {

      eventApi.getUpcoming().then((data) => {
        let amountOfSlides = 3;
        if(data.data.data.length < 3) {
          amountOfSlides = data.data.data.length;
        }

        for(let i = 0; i < amountOfSlides; i++){
          uploadFile.checkIfFileExists(this.imageBaseURL + '/event/' + data.data.data[i].id + '.jpg').then((res) => {
            this.slides.push({
              eventTitle: data.data.data[i].title,
              eventDate: data.data.data[i].start,
              eventImg: this.imageBaseURL + '/event/' + data.data.data[i].id + '.jpg',
              eventId: data.data.data[i].id
            });

            if(i === 0) {
              this.eventTitle = data.data.data[i].title;
              this.eventDate = data.data.data[i].start;
              this.eventId = data.data.data[i].id;
            }
          }).catch((err) => {
            this.slides.push({
              eventTitle: data.data.data[i].title,
              eventDate: data.data.data[i].start,
              eventImg: '/static/images/header.png',
              eventId: data.data.data[i].id
            });

            if(i === 0) {
              this.eventTitle = data.data.data[i].title;
              this.eventDate = data.data.data[i].start;
              this.eventId = data.data.data[i].id;
            }
          });
        }
      });


    },
    components: {
      MenuList,
      swiper,
      swiperSlide
    }
  }
</script>

<style scoped>
    #containerDiv {
        height: 800px;
    }
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