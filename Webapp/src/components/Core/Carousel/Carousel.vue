<template>
    <div>
        <b-carousel id="carousel1"
                    style="text-shadow: 1px 1px 2px #333;"
                    controls
                    indicators
                    background="#ababab"
                    :interval="0"
                    img-width="1024"
                    img-height="480"
                    v-model="slide"
                    @sliding-start="onSlideStart"
                    @sliding-end="onSlideEnd">

            <!-- Text slides with image -->
            <b-carousel-slide caption="Welcome to the cee spot!"
                              text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                              img-src="/static/images/header.jpg"
            ></b-carousel-slide>

        </b-carousel>
    </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>
