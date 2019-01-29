<template>
    <div>
        <b-carousel id="carousel1"
                    style="text-shadow: 1px 1px 2px #333;"
                    controls
                    indicators
                    background="#ababab"
                    :interval="0"
                    v-model="slide"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd">

            <!-- Text slides with image -->
            <b-carousel-slide v-for="slide in slides" :img-src="slide.img" :text="slide.text" :caption="slide.name"></b-carousel-slide>
        <!--<b-carousel-slide caption="Welcome to the cee spot!"-->
                              <!--img-src="/static/images/header.png"-->
            <!--&gt;</b-carousel-slide>-->

            <!--text="Nulla vitae elit libero, a pharetra augue mollis interdum."-->


        </b-carousel>
    </div>
</template>

<script>
  import eventApi from '@/services/api/events.js'
  import uploadFile from '@/services/api/uploadFile'


  export default {
    name: 'Carousel',
    data() {
      return {
        slide: 0,
        sliding: null,
        slides: []
      }
    },
    methods: {
      onSlideStart(slide) {
        this.sliding = true
      },
      onSlideEnd(slide) {
        this.sliding = false
      }
    },
    mounted() {
        eventApi.getUpcoming().then((data) => {
          for(let i = 0; i < 3; i++){
            console.log(data.data.data[i]);
            uploadFile.checkIfFileExists(this.imageBaseURL + '/event/' + data.data.data[i].id + '.jpg').then((res) => {
              this.slides.push({
                name: data.data.data[i].title,
                text: data.data.data[i].small_description,
                img: this.imageBaseURL + '/event/' + data.data.data[i].id+ '.jpg'
              });
            }).catch((err) => {
              this.slides.push({
                name: data.data.data[i].title,
                text: data.data.data[i].small_description,
                img: '/static/images/header.png'
              });
            });
          }
        });
    }
  }
</script>
